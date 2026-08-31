<script setup>
import watchmakersguide from '~/data/projects/watchmakersguide.json'
</script>

<template>
  <section class="projects">
    <div class="section-head">
      <div class="eyebrow">Module principal</div>
      <h2 class="section-title">Projets</h2>
    </div>
    <ProjectCard
      :title="watchmakersguide.title"
      :reference="watchmakersguide.reference"
      :module-label="watchmakersguide.moduleLabel"
      :tags="watchmakersguide.tags"
      :slides="watchmakersguide.slides"
    />
  </section>
</template>
