<script setup>
import watchmakersguide from '~/data/projects/watchmakersguide.json'
const section = useSectionContext('projects')
</script>

<template>
  <section ref="section" class="section projects">
    <div class="section-head">
      <div class="eyebrow">Module principal</div>
      <h2 class="section-title">Projets</h2>
    </div>
    <ProjectCard
      :title="watchmakersguide.title"
      :reference="watchmakersguide.reference"
      :module-label="watchmakersguide.moduleLabel"
      :tags="watchmakersguide.tags"
    >
      <UiCarousel :slides="watchmakersguide.slides" />
    </ProjectCard>
  </section>
</template>
