// src/index.ts
import InstrumentInsight from './views/InstrumentInsight.vue'

// Named export
export { InstrumentInsight }

// Default export (optional)
export default InstrumentInsight

// Props interface
export interface InstrumentInsightProps {
  symbolRoot: string    // Root symbol of the instrument
  userId?: string | null    // Current user ID for access control
}
