<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useSupabase } from '@y2kfund/core' // Adjust import path as needed

interface KeyFactor {
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

const factors = ref<KeyFactor[]>([])
const editingId = ref<string | null>(null)
const editText = ref('')
const hoveredFactor = ref<KeyFactor | null>(null)
const isAddingNew = ref(false)
const newFactorText = ref('')

const fetchFactors = async () => {
  const { data, error } = await supabase
    .schema('hf')
    .from('key_factors_with_users')
    .select('*')
    .eq('symbol_root', props.symbolRoot)
    .order('created_at', { ascending: false })
  
  if (!error && data) {
    factors.value = data
  }
}

const startAddNew = async () => {
  isAddingNew.value = true
  newFactorText.value = ''
  await nextTick()
  const input = document.querySelector('.new-factor-input') as HTMLInputElement
  input?.focus()
}

const addFactor = async () => {
  if (!newFactorText.value.trim()) {
    isAddingNew.value = false
    return
  }
  
  const { data, error } = await supabase
    .schema('hf')
    .from('key_factors')
    .insert({
      symbol_root: props.symbolRoot,
      bullet_text: newFactorText.value.trim(),
      created_by: props.userId
    })
    .select()
  
  if (!error && data) {
    factors.value.unshift(data[0])
    newFactorText.value = ''
    isAddingNew.value = false
  }
}

const cancelAddNew = () => {
  isAddingNew.value = false
  newFactorText.value = ''
}

const startEdit = async (factor: KeyFactor) => {
  editingId.value = factor.id
  editText.value = factor.bullet_text
  await nextTick()
  const input = document.querySelector(`#edit-${factor.id}`) as HTMLInputElement
  input?.focus()
  input?.select()
}

const saveEdit = async (factorId: string) => {
  if (!editText.value.trim()) {
    cancelEdit()
    return
  }
  
  const { error } = await supabase
    .schema('hf')
    .from('key_factors')
    .update({
      bullet_text: editText.value.trim(),
      updated_at: new Date().toISOString()
    })
    .eq('id', factorId)
  
  if (!error) {
    const factor = factors.value.find(f => f.id === factorId)
    if (factor) {
      factor.bullet_text = editText.value.trim()
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
  fetchFactors()
})
</script>

<template>
  <div class="key-factors-box">
    <div class="header">
      <h3 class="box-title">Key Factors</h3>
      <button @click="startAddNew" class="add-icon-button" title="Add new factor">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <ul class="factors-list">
      <!-- New factor input -->
      <li v-if="isAddingNew" class="factor-item new-factor">
        <span class="bullet">•</span>
        <input
          v-model="newFactorText"
          @keyup.enter="addFactor"
          @keyup.esc="cancelAddNew"
          @blur="addFactor"
          type="text"
          placeholder="Type new factor and press Enter..."
          class="new-factor-input"
        />
      </li>

      <li v-if="!isAddingNew && factors.length === 0" class="empty-state">
        No factors yet. Click the + button to add your first factor.
      </li>
    
      <!-- Existing factors -->
      <li
        v-for="factor in [...factors].sort((a, b) => a.bullet_text.localeCompare(b.bullet_text))"
        :key="factor.id"
        class="factor-item"
        @mouseenter="hoveredFactor = factor"
        @mouseleave="hoveredFactor = null"
      >
        <span class="bullet">•</span>
        
        <div v-if="editingId === factor.id" class="edit-mode">
          <input
            :id="`edit-${factor.id}`"
            v-model="editText"
            @keyup.enter="saveEdit(factor.id)"
            @keyup.esc="cancelEdit"
            @blur="saveEdit(factor.id)"
            type="text"
            class="edit-input"
          />
        </div>
        
        <div v-else class="view-mode">
          <span class="factor-text" @click="startEdit(factor)">{{ factor.bullet_text }}</span>
        </div>

        <div v-if="hoveredFactor?.id === factor.id && editingId !== factor.id" class="tooltip">
          Added by: {{ factor.user_name }}<br />
          {{ formatDate(factor.created_at) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.key-factors-box {
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
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
  background-color: #4caf50;
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
  background-color: #388e3c;
  transform: scale(1.1);
}

.add-icon-button:active {
  transform: scale(0.95);
}

.factors-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.factor-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  position: relative;
}

.factor-item:last-child {
  border-bottom: none;
}

.new-factor {
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
  color: #4caf50;
  flex-shrink: 0;
}

.view-mode {
  flex: 1;
}

.factor-text {
  flex: 1;
  line-height: 1 rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  display: block;
}

.factor-text:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.edit-mode {
  flex: 1;
}

.edit-input,
.new-factor-input {
  width: 100%;
  padding: 6px 10px;
  border: 2px solid #4caf50;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: white;
}

.edit-input:focus,
.new-factor-input:focus {
  border-color: #388e3c;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
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
.empty-state {
  color: #666;
  font-style: italic;
  font-size: 14px;
}
</style>