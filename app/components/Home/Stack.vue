<script setup>
import stack from '~/data/stack/stack.json'
</script>

<template>
  <section class="stack">
    <div class="section-head">
      <div class="eyebrow">Stack technique</div>
      <h2 class="section-title">Outils & langages</h2>
    </div>
    <div v-for="tech in stack" :key="tech.name" class="stack-card">
      <UiHudCorners />
      <p class="stack-card__name">{{ tech.name }}</p>
      <p class="stack-card__category">{{ tech.category }}</p>
    </div>
  </section>
</template>
