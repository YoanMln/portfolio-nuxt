<script setup>
import profil from '~/data/introduction/profil.json'
const section = useSectionContext('profil')
</script>

<template>
  <section ref="section" class="section intro">
    <div class="section-head">
      <div class="eyebrow">Profil</div>
      <h2 class="section-title">Qui suis-je</h2>
    </div>
    <p class="intro__text">{{ profil.profil }}</p>
    <div class="intro__tags">
      <span v-for="tag in profil.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.intro__text {
  max-width: 62ch;
  font-size: 20px;
  margin: 0 auto;
}
.intro__tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}
</style>
