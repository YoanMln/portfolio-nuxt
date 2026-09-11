<script setup>
import sideprojects from '~/data/projects/side-projects.json'
const section = useSectionContext('side-projects')
</script>

<template>
  <section ref="section" class="section side-projects">
    <div class="section-head">
      <div class="eyebrow">Unités secondaires</div>
      <h2 class="section-title">Autres projets</h2>
    </div>
    <div class="side-projects-container">
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
    </div>
  </section>
</template>

<style scoped lang="scss">
.side-projects-container {
  display: flex;
  gap: 1.5rem;
}
</style>
