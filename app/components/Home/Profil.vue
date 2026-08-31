<script setup>
import profil from '~/data/introduction/profil.json'
</script>

<template>
  <section class="intro">
    <div class="section-head">
      <div class="eyebrow">Profil</div>
      <h3 class="section-title">Qui suis-je</h3>
    </div>
    <p class="intro__text">{{ profil.profil }}</p>
    <div class="intro__tags">
      <span v-for="tag in profil.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </section>
</template>
