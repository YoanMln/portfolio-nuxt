<script setup>
defineProps({
  title: { type: String, required: true },
  reference: { type: String, required: true },
  moduleLabel: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  links: { type: Object, default: () => ({}) },
  stackedInfo: { type: Boolean, default: false },
})

const media = ref(null)
const hasScanned = ref(false)
let observer = null

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    hasScanned.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hasScanned.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.3 },
  )
  observer.observe(media.value)
})
onUnmounted(() => observer?.disconnect())
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
    <div ref="media" class="project-card__media" :class="{ 'is-scanned': hasScanned }">
      <slot />
    </div>
    <div :class="{ 'project-card__info--stacked': stackedInfo }" class="project-card__info">
      <div class="project-card__heading">
        <h3 class="project-card__title">{{ title }}</h3>
        <p class="project-card__ref">{{ moduleLabel }}</p>
      </div>
      <div class="project-card__tags">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
    <div class="project-card__links">
      <NuxtLink
        v-if="links.demo"
        class="project-card__link"
        :to="links.demo"
        target="_blank"
        rel="noopener noreferrer"
      >
        Accéder au site</NuxtLink
      >
      <NuxtLink
        v-if="links.github"
        class="project-card__link"
        :to="links.github"
        target="_blank"
        rel="noopener noreferrer"
      >
        Repo GitHub</NuxtLink
      >
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
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0;
      background: linear-gradient(90deg, transparent, $core, transparent) no-repeat;
      background-size: 100% 2px;
      background-position: 0 0;
      filter: drop-shadow(0 0 12px $core);
      animation: scan 3.6s ease-in-out 1 forwards;
      animation-play-state: paused;
      pointer-events: none;
    }

    &.is-scanned::after {
      animation-play-state: running;
    }
    :deep(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
    &--stacked {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
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
  &__links {
    display: flex;
    gap: 1rem;
    margin-top: 10px;
    position: relative;
  }

  &__link {
    padding: 5px 5px;
    border: 1px solid $line;
    background: rgba($core, 0.03);
    font-family: $font-mono;
    font-size: 12px;
    text-decoration: none;
    transition: border-color 0.2s ease;
    &:hover {
      border-color: $core;
    }
  }
}
.readout {
  position: absolute;
  z-index: 3;
  font-family: $font-mono;
  font-size: 9.5px;
  letter-spacing: 0.06em;
  color: $core;
  opacity: 0.75;
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

@keyframes scan {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  50% {
    transform: translateY(calc(100% - 2px));
    opacity: 0.9;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}
</style>
