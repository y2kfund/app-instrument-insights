<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
import KeyFactors from '../components/KeyFactors.vue'
import Plan from '../components/Plan.vue'
import ComingSoonBox from '../components/ComingSoonBox.vue'

interface InstrumentInsightProps {
  symbolRoot: string
  userId?: string | null
}

const props = withDefaults(defineProps<InstrumentInsightProps>(), {
  symbolRoot: 'IBIT',
  userId: '4fbec15d-2316-4805-b2a4-5cd2115a5ac8'
})

</script>

<template>
  <div class="instrument-insights-for-single-instrument-view">
    
    <div class="boxes-container">
      <KeyFactors 
        :symbol-root="props.symbolRoot" 
        :user-id="props.userId || ''"
      />
      
      <Plan 
        :symbol-root="props.symbolRoot" 
        :user-id="props.userId || ''"
      />
    </div>
  </div>
</template>

<style>
@import '../styles/styles.css';
</style>

<style scoped>
@import '../styles/scoped-styles.css';

.boxes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.25rem;
}
</style>