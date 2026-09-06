<template>
  <span class="corner corner--top-left" aria-hiden="true" />
  <span class="corner corner--top-right" aria-hiden="true" />
  <span class="corner corner--bottom-left" aria-hiden="true" />
  <span class="corner corner--bottom-right" aria-hiden="true" />
</template>

<style scoped lang="scss">
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: $gold;
  border-style: solid;
  border-width: 0;
  pointer-events: none;
}
.corner--top-left {
  top: -1px;
  left: -1px;
  border-top-width: 2px;
  border-left-width: 2px;
}

.corner--top-right {
  top: -1px;
  right: -1px;
  border-top-width: 2px;
  border-right-width: 2px;
}

.corner--bottom-left {
  bottom: -1px;
  left: -1px;
  border-bottom-width: 2px;
  border-left-width: 2px;
}

.corner--bottom-right {
  bottom: -1px;
  right: -1px;
  border-bottom-width: 2px;
  border-right-width: 2px;
}
</style>
