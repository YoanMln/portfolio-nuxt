<script setup lang="ts">
import Projects from '~/components/Home/Projects.vue'
import SideProjects from '~/components/Home/SideProjects.vue'
import Stack from '~/components/Home/Stack.vue'
import Contact from '~/components/Home/Contact.vue'

useSeoMeta({
  title: 'Yoan — Développeur web junior | Portfolio',
  description:
    'Développeur web junior issu de l’horlogerie, je combine précision, sens du détail et développement pour créer des expériences web soignées.',
  ogTitle: 'Yoan — Développeur web junior | Portfolio',
  ogDescription:
    'Développeur web junior issu de l’horlogerie, je combine précision, sens du détail et développement pour créer des expériences web soignées.',
  ogImage: 'https://yoanmln.netlify.app/images/og-cover.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeProfil />
    <Projects />
    <SideProjects />
    <Stack />
    <Contact />
    <UiConsole />
  </div>
</template>
