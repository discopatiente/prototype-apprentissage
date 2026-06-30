<template>
  <div class="badge">
    <div class="badge-group">
      <div class="diamond"></div>
      <span class="badge-score">{{ store.scoreGlobal }}</span>
    </div>
    <div class="badge-group">
      <div class="balloon-icon">
        <div class="balloon-body"></div>
        <div class="balloon-thread"></div>
      </div>
      <span class="badge-balloons">{{ store.balloons }}</span>
    </div>
  </div>
</template>

<script setup>
import { useProgressStore } from '../stores/progressStore'
const store = useProgressStore()
</script>

<style scoped>
.badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #FFFDFB;
  padding: 8px 15px;
  border-radius: 18px;
  box-shadow: 0 8px 18px -14px rgba(74, 53, 43, 0.3);
}

.badge-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.diamond {
  width: 11px;
  height: 11px;
  background: #D9A85F;
  transform: rotate(45deg);
  border-radius: 2px;
}

.badge-score {
  font-size: 14px;
  font-weight: 800;
  color: #9A6E2E;
}

.balloon-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.balloon-body {
  width: 12px;
  height: 15px;
  background: #DD8A78;
  border-radius: 50% 50% 50% 50% / 55% 55% 45% 45%;
}

.balloon-thread {
  width: 1px;
  height: 6px;
  background: #DD8A78;
  opacity: 0.6;
  border-radius: 1px;
}

.badge-balloons {
  font-size: 14px;
  font-weight: 800;
  color: #C25E47;
}
</style>
