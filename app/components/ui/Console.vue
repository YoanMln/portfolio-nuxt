<script setup>
import lines from '~/data/console/lines.json'
const { displayed, history } = useConsoleTyping(lines)
</script>

<template>
  <div class="ai-console" aria-hidden="true">
    <span class="ai-console__dot" />
    <div class="ai-console__lines">
      <span v-for="line in history" :key="line.id" class="ai-console__text">{{ line.text }}</span>
      <span class="ai-console__text">{{ displayed }}<span class="ai-console__cursor">_</span></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ai-console {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 40;
  display: flex;
  align-items: flex-end;
  pointer-events: none;
  gap: 9px;
  font-family: $font-mono;
  font-size: 11px;
  line-height: 1.5;
  color: $core;
  background: rgba($bg-void, 0.7);
  border: 1px solid $line;
  padding: 9px 13px;
  max-width: 260px;
  backdrop-filter: blur(6px);

  &__dot {
    width: 6px;
    height: 6px;
    margin-bottom: 5px;
    border-radius: 50%;
    background: $red;
    box-shadow: 0 0 8px $red;
    flex: none;
    animation: console-pulse 1.8s ease-in-out infinite;
  }
  &__lines {
    display: flex;
    flex-direction: column;
  }
  &__text {
    transition: opacity 0.4s ease;

    &:nth-last-child(2) {
      opacity: 0.45;
    }
    &:nth-last-child(3) {
      opacity: 0.2;
    }
  }
  &__cursor {
    animation: blink 1s step-end infinite;
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
@keyframes console-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.7;
  }
}
</style>
