<script setup>
defineProps({
  title: { type: String },
  reference: { type: String },
  moduleLabel: { type: String },
  tags: { type: Array },
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
