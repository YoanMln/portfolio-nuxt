<script setup>
import sideprojects from '~/data/projects/side-projects.json'
</script>

<template>
  <section class="side-projects">
    <div class="section-head">
      <div class="eyebrow">Unités secondaires</div>
      <h2 class="section-title">Autres projets</h2>
    </div>
    <ProjectCard
      v-for="project in sideprojects"
      :key="project.reference"
      :title="project.title"
      :reference="project.reference"
      :module-label="project.moduleLabel"
      :tags="project.tags"
    >
      <img :src="project.image" :alt="project.alt" />
    </ProjectCard>
  </section>
</template>
