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
    <span class="readout readout--bottom-right">
      {{ tags.slice(0, 2).join(' / ').toLowerCase() }}
    </span>
    <div class="project-card__media">
      <slot />
    </div>
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

<style scoped lang="scss">
.project-card {
  position: relative;
  padding: 10px 10px 34px;
  border: 1px solid $line;
  background-color: $bg-panel;

  &__media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background-color: $bg-panel-2;
  }
  &__media :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid $line;
  }
  &__title {
    margin: 0 0 6px;
    font-family: $font-display;
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: $white;
  }
  &__ref {
    font-family: $font-mono;
    font-size: 10.5px;
    color: $muted;
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}

.readout {
  position: absolute;
  font-family: $font-mono;
  font-size: 9.5px;
  letter-spacing: 0.06em;
  color: $core;
  opacity: 0.75;
  z-index: 3;
  pointer-events: none;
}
.readout--top-left {
  top: 10px;
  left: 14px;
}
.readout--top-right {
  top: 10px;
  right: 14px;
  text-align: right;
}
.readout--bottom-left {
  bottom: 10px;
  left: 14px;
  color: $muted;
}
.readout--bottom-right {
  bottom: 10px;
  right: 14px;
  color: $muted;
  text-align: right;
}
</style>
