<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
const newFactorText = ref('')
const editingId = ref<string | null>(null)
const editText = ref('')
const hoveredFactor = ref<KeyFactor | null>(null)

const fetchFactors = async () => {
  const { data, error } = await supabase
    .schema('hf')
    .from('key_factors')
    .select('*')
    .eq('symbol_root', props.symbolRoot)
    .order('created_at', { ascending: false })
  
  if (!error && data) {
    factors.value = data
  }
}

const addFactor = async () => {
  if (!newFactorText.value.trim()) return
  
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
  }
}

const startEdit = (factor: KeyFactor) => {
  editingId.value = factor.id
  editText.value = factor.bullet_text
}

const saveEdit = async (factorId: string) => {
  if (!editText.value.trim()) return
  
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
    <h3 class="box-title">Key Factors</h3>
    
    <div class="add-factor">
      <input
        v-model="newFactorText"
        @keyup.enter="addFactor"
        type="text"
        placeholder="Add a new key factor..."
        class="factor-input"
      />
      <button @click="addFactor" class="add-button">Add</button>
    </div>

    <ul class="factors-list">
      <li
        v-for="factor in factors"
        :key="factor.id"
        class="factor-item"
        @mouseenter="hoveredFactor = factor"
        @mouseleave="hoveredFactor = null"
      >
        <span class="bullet">•</span>
        
        <div v-if="editingId === factor.id" class="edit-mode">
          <input
            v-model="editText"
            @keyup.enter="saveEdit(factor.id)"
            @keyup.esc="cancelEdit"
            type="text"
            class="edit-input"
          />
          <button @click="saveEdit(factor.id)" class="save-button">Save</button>
          <button @click="cancelEdit" class="cancel-button">Cancel</button>
        </div>
        
        <div v-else class="view-mode">
          <span class="factor-text">{{ factor.bullet_text }}</span>
          <button @click="startEdit(factor)" class="edit-button">Edit</button>
        </div>

        <div v-if="hoveredFactor?.id === factor.id" class="tooltip">
          Added by: {{ factor.created_by }}<br />
          {{ formatDate(factor.created_at) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.key-factors-box {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 2px solid #2196f3;
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
}

.box-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
}

.add-factor {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.factor-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.add-button {
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.add-button:hover {
  background-color: #1976d2;
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
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
}

.factor-item:last-child {
  border-bottom: none;
}

.bullet {
  font-size: 20px;
  line-height: 1.2;
  color: #2196f3;
}

.view-mode {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.factor-text {
  flex: 1;
  line-height: 1.5;
}

.edit-button,
.save-button,
.cancel-button {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
}

.edit-button {
  background-color: #fff;
  color: #2196f3;
  border: 1px solid #2196f3;
}

.edit-button:hover {
  background-color: #e3f2fd;
}

.edit-mode {
  flex: 1;
  display: flex;
  gap: 8px;
}

.edit-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.save-button {
  background-color: #4caf50;
  color: white;
}

.save-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #da190b;
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
}
</style>