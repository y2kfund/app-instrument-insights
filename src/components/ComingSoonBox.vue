<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <div class="coming-soon-box">
    <h3 class="box-title">{{ title }}</h3>
    <div class="coming-soon-content">
      <p class="coming-soon-text">Coming soon</p>
    </div>
  </div>
</template>

<style scoped>
.coming-soon-box {
  background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
  border: 2px solid #4caf50;
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

.coming-soon-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.coming-soon-text {
  font-size: 32px;
  font-weight: 700;
  color: #2196f3;
  margin: 0;
}
</style>