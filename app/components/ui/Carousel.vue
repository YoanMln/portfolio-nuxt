<script setup>
defineProps({
  slides: { type: Array, default: () => [] },
})
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    loop
    arrows
    dots
    :autoplay="{ delay: 5000 }"
    wheel-gestures
    :items="slides"
    :ui="{
      root: 'h-full',
      viewport: 'h-full',
      container: 'ms-0 h-full items-stretch',
      item: 'basis-full ps-0 h-full',
      prev: 'sm:start-8 carousel__arrow carousel__arrow--prev',
      next: 'sm:end-8 carousel__arrow carousel__arrow--next',
      dots: 'absolute bottom-3 left-1/2 -translate-x-1/2 z-10',
      dot: 'carousel__dot',
    }"
  >
    <img :src="item.src" :alt="item.alt" />
  </UCarousel>
</template>

<style scoped lang="scss">
:deep(.carousel__arrow) {
  border: 1px solid $line;
  border-radius: 5px;
  background-color: rgba($bg-void, 0.7);
  color: $core;

  &:hover {
    border-color: $core;
    box-shadow: 0 0 18px -4px rgba($core, 0.6);
  }
}
:deep(.carousel__dot) {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: rgba($text, 0.25);

  &[aria-selected='true'] {
    background-color: $core;
    box-shadow: 0 0 8px $core;
  }
}
</style>
