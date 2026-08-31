<script setup>
defineProps({
  title: { type: String, required: true },
  reference: { type: String, required: true },
  moduleLabel: { type: String, required: true },
  tags: { type: Array, default: () => [] },
})
</script>

<template>
  <article class="project-card">
    <UiHudCorners />

    <span class="readout readout--top-left">{{ reference }}</span>
    <span class="readout readout--top-right">scan ...</span>
    <span class="readout readout--bottom-left">statut : ok</span>
    <span class="readout readout--bottom-right" />
    <slot />
    <div class="project-card__info">
      <div class="project-card__heading">
        <h3 class="project-card__title">{{ title }}</h3>
        <p class="project-card__ref">{{ moduleLabel }}</p>
      </div>
      <div class="project-card__tags">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>
