<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
//import { useCurrentPositionQuery } from '@y2kfund/core/currentPositionsForSingleInstrument'

interface InstrumentInsightProps {
  symbolRoot: string
  userId?: string | null
}

const props = withDefaults(defineProps<InstrumentInsightProps>(), {
  symbolRoot: 'META',
  userId: '67e578fd-2cf7-48a4-b028-a11a3f89bb9b'
})

</script>

<template>
  <div class="instrument-insights-for-single-instrument-view">
    <h2>Instrument Insight for {{ props.symbolRoot }}</h2>
    <!-- Add your component UI here -->
  </div>
</template>

<style>
@import '../styles/styles.css';
</style>

<style scoped>
@import '../styles/scoped-styles.css';
</style>