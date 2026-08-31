<script setup>
import profil from '~/data/introduction/profil.json'
</script>

<template>
  <section class="intro">
    <h1 class="intro__title">Profil : {{ profil.profil }}</h1>
    <div class="info__tags">
      <span v-for="tag in profil.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </section>
</template>
