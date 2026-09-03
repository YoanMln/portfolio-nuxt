<script setup>
import information from '~/data/hero/hero-informations.json'
</script>

<template>
  <section class="hero">
    <UiCore />
    <h1 class="hero__name">{{ information.name }}</h1>
    <p class="hero__status">
      {{ information.job }}
      <span>// statut : {{ information.statut }}</span>
    </p>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 82vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background:
    radial-gradient(50% 40% at 88% 12%, rgba(200, 149, 47, 0.1), transparent 70%),
    radial-gradient(120% 100% at 50% 100%, rgba(143, 232, 255, 0.06), transparent 60%);
}
.hero__name {
  font-family: $font-display;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: clamp(2.6rem, 8vw, 5.2rem);
  margin: 0;
  color: #fff;
  text-shadow: 0 0 30px rgba(143, 232, 255, 0.4);
  opacity: 0;
  animation: boot-in 0.7s ease-out forwards;
  animation-delay: 0.5s;
}
.hero__status {
  font-family: $font-mono;
  font-size: 13px;
  color: $core;
  margin: 1rem 0 0;
  letter-spacing: 0.04em;
  opacity: 0;
  animation: boot-in 0.7s ease-out forwards;
  animation-delay: 0.85s;
}
.hero__status span {
  color: $muted;
}
@keyframes boot-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
    filter: blur(2px);
  }
  60% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
</style>
