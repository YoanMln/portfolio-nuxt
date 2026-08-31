<script setup>
import information from '~/data/hero/hero-informations.json'
</script>

<template>
  <section class="hero">
    <h1 class="hero__name">{{ information.name }}</h1>
    <p class="hero__status">
      {{ information.job }}
      <span>// statut : {{ information.statut }}</span>
    </p>
  </section>
</template>
