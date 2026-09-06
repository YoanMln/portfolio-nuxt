<script setup>
import stack from '~/data/stack/stack.json'
</script>

<template>
  <section class="section stack">
    <div class="section-head">
      <div class="eyebrow">Stack technique</div>
      <h2 class="section-title">Outils & langages</h2>
    </div>
    <div class="stack__grid">
      <div v-for="tech in stack" :key="tech.name" class="stack-card">
        <UiHudCorners />
        <p class="stack-card__name">{{ tech.name }}</p>
        <p class="stack-card__category">{{ tech.category }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stack__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 14px;
}

.stack-card {
  position: relative;
  padding: 18px 14px;
  border: 1px solid $line;
  background-color: $bg-panel;
  text-align: center;

  &__name {
    margin: 0 0 4px;
    font-family: $font-display;
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: uppercase;
    color: $white;
  }

  &__category {
    margin: 0;
    font-family: $font-mono;
    font-size: 9.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $muted;
  }
}
</style>
