<script setup>
defineProps({
  slides: { type: Array },
})
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    loop
    arrows
    :autoplay="{ delay: 2000 }"
    wheel-gestures
    :prev="{ variant: 'solid' }"
    :next="{ variant: 'solid' }"
    :items="slides"
    :ui="{
      item: 'basis-full ps-0',
      prev: 'sm:start-8',
      next: 'sm:end-8',
      container: 'ms-0',
    }"
  >
    <img :src="item.src" :alt="item.alt" width="320" height="320" />
  </UCarousel>
</template>
