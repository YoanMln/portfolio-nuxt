<script setup>
import information from '~/data/hero/hero-informations.json'

const section = useSectionContext('hero')
</script>

<template>
  <section ref="section" class="hero">
    <UiHeroRig>
      <div class="hero__core-slot">
        <UiCore :name="information.name" :job="information.job" :statut="information.statut" />
      </div>

      <div class="hero__cta">
        <NuxtLink to="#projects" class="cta">Mes projets</NuxtLink>
        <NuxtLink to="#contact" class="cta">Me contacter</NuxtLink>
      </div>
    </UiHeroRig>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding: 0 2rem 2rem;
  @include mq-mobile {
    justify-content: center;
    padding: 2rem;
  }
}

.hero__core-slot {
  position: absolute;
  top: var(--core-top);
  left: 50%;
  z-index: 2;
  width: fit-content;
  transform: translateX(-50%);

  @include mq-mobile {
    position: static;
    top: auto;
    left: auto;
    width: auto;
    transform: none;
    margin: 0 auto 1.6rem;
  }
}

.hero__cta {
  position: absolute;
  left: 50%;
  bottom: 0;
  z-index: 2;
  width: var(--cta-span);
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;

  @include mq-mobile {
    position: static;
    width: auto;
    transform: none;
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--cta-w);
  height: var(--cta-h);
  padding: 0 15px;
  border: 1px solid $line;
  background: rgba($core, 0.03);
  font-family: $font-mono;
  font-size: 15px;
  text-decoration: none;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: $core;
  }

  @include mq-mobile {
    width: auto;
    min-width: 180px;
  }
}
</style>
