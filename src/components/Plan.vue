<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useSupabase } from '@y2kfund/core' // Adjust import path as needed

interface KeyPlan {
  id: string
  symbol_root: string
  bullet_text: string
  created_by: string
  created_at: string
  updated_at: string
}

interface Props {
  symbolRoot: string
  userId: string
}

const props = defineProps<Props>()
const supabase = useSupabase()

const plans = ref<KeyPlan[]>([])
const editingId = ref<string | null>(null)
const editText = ref('')
const hoveredPlan = ref<KeyPlan | null>(null)
const isAddingNew = ref(false)
const newPlanText = ref('')

const planPlans = async () => {
  const { data, error } = await supabase
    .schema('hf')
    .from('key_plan_with_users')
    .select('*')
    .eq('symbol_root', props.symbolRoot)
    .order('created_at', { ascending: false })
  
  if (!error && data) {
    plans.value = data
  }
}

const startAddNew = async () => {
  isAddingNew.value = true
  newPlanText.value = ''
  await nextTick()
  const input = document.querySelector('.new-plan-input') as HTMLInputElement
  input?.focus()
}

const addPlan = async () => {
  if (!newPlanText.value.trim()) {
    isAddingNew.value = false
    return
  }
  
  const { data, error } = await supabase
    .schema('hf')
    .from('key_plan')
    .insert({
      symbol_root: props.symbolRoot,
      bullet_text: newPlanText.value.trim(),
      created_by: props.userId
    })
    .select()
  
  if (!error && data) {
    plans.value.unshift(data[0])
    newPlanText.value = ''
    isAddingNew.value = false
  }
}

const cancelAddNew = () => {
  isAddingNew.value = false
  newPlanText.value = ''
}

const startEdit = async (plan: KeyPlan) => {
  editingId.value = plan.id
  editText.value = plan.bullet_text
  await nextTick()
  const input = document.querySelector(`#edit-${plan.id}`) as HTMLInputElement
  input?.focus()
  input?.select()
}

const saveEdit = async (planId: string) => {
  if (!editText.value.trim()) {
    cancelEdit()
    return
  }
  
  const { error } = await supabase
    .schema('hf')
    .from('key_plan')
    .update({
      bullet_text: editText.value.trim(),
      updated_at: new Date().toISOString()
    })
    .eq('id', planId)
  
  if (!error) {
    const plan = plans.value.find(f => f.id === planId)
    if (plan) {
      plan.bullet_text = editText.value.trim()
    }
    editingId.value = null
  }
}

const cancelEdit = () => {
  editingId.value = null
  editText.value = ''
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  planPlans()
})
</script>

<template>
  <div class="key-plans-box">
    <div class="header">
      <h3 class="box-title">Plan</h3>
      <button @click="startAddNew" class="add-icon-button" title="Add new plan">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <ul class="plans-list">
      <!-- New plan input -->
      <li v-if="isAddingNew" class="plan-item new-plan">
        <span class="bullet">•</span>
        <input
          v-model="newPlanText"
          @keyup.enter="addPlan"
          @keyup.esc="cancelAddNew"
          @blur="addPlan"
          type="text"
          placeholder="Type new plan and press Enter..."
          class="new-plan-input"
        />
      </li>

      <!-- Existing plans -->
      <li
        v-for="plan in plans"
        :key="plan.id"
        class="plan-item"
        @mouseenter="hoveredPlan = plan"
        @mouseleave="hoveredPlan = null"
      >
        <span class="bullet">•</span>
        
        <div v-if="editingId === plan.id" class="edit-mode">
          <input
            :id="`edit-${plan.id}`"
            v-model="editText"
            @keyup.enter="saveEdit(plan.id)"
            @keyup.esc="cancelEdit"
            @blur="saveEdit(plan.id)"
            type="text"
            class="edit-input"
          />
        </div>
        
        <div v-else class="view-mode">
          <span class="plan-text" @click="startEdit(plan)">{{ plan.bullet_text }}</span>
        </div>

        <div v-if="hoveredPlan?.id === plan.id && editingId !== plan.id" class="tooltip">
          Added by: {{ plan.user_name }}<br />
          {{ formatDate(plan.created_at) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.key-plans-box {
  background: #fef3e2;
  border-left: 4px solid #ff9800;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.add-icon-button svg {
    width: 16px;
    height: 16px;
}

.box-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.add-icon-button {
  width: 20px;
  height: 20px;
  padding: 0;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.add-icon-button:hover {
  background-color: #f57c00;
  transform: scale(1.1);
}

.add-icon-button:active {
  transform: scale(0.95);
}

.plans-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plan-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  position: relative;
}

.plan-item:last-child {
  border-bottom: none;
}

.new-plan {
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bullet {
  font-size: 20px;
  line-height: 1 rem;
  color: #ff9800;
  flex-shrink: 0;
}

.view-mode {
  flex: 1;
}

.plan-text {
  flex: 1;
  line-height: 1 rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  display: block;
}

.plan-text:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.edit-mode {
  flex: 1;
}

.edit-input,
.new-plan-input {
  width: 100%;
  padding: 6px 10px;
  border: 2px solid #ff9800;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: white;
}

.edit-input:focus,
.new-plan-input:focus {
  border-color: #f57c00;
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
}

.tooltip {
  position: absolute;
  top: 100%;
  left: 24px;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  margin-top: 4px;
  pointer-events: none;
}
</style>