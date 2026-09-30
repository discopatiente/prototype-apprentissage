<template>
  <div class="image-row">
    <img
      v-for="(image, index) in images"
      :key="index"
      :src="'/images/' + image.src"
      :alt="image.alt"
      class="image"
    />
  </div>
</template>

<script setup>
defineProps({
  images: { type: Array, required: true },
})
</script>

<style scoped>
.image-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.image {
  height: 72px;
  width: auto;
  max-width: 100%;
}
</style>
