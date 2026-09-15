<script setup>
const CORE = 400
const CTA = { w: 150, h: 50 }
const TOP = 120 // hauteur de tuyau visible au-dessus du core
const DROP = 75 // verticale entre le coude bas et le CTA
const COLLAR = 60 // position du connecteur sur les tuyaux verticaux

// Angles d'accroche sur le cercle. Les deux du haut fixent aussi le x des verticales.
const ANGLES = { topLeft: 235, topRight: 305, botLeft: 120, botRight: 60 }

const RIG_W = 720
const r = CORE / 2
const cx = RIG_W / 2
const cy = TOP + r

const rad = (deg) => (deg * Math.PI) / 180
const n = (v) => Math.round(v * 10) / 10

// Point sur le bord du cercle (0° = droite, angles horaires car y descend).
const edge = (deg) => ({ x: cx + r * Math.cos(rad(deg)), y: cy + r * Math.sin(rad(deg)) })

// Point situé à `len` px du bord, dans l'axe du rayon : le coude reste radial.
const out = (deg, len) => ({
  x: cx + (r + len) * Math.cos(rad(deg)),
  y: cy + (r + len) * Math.sin(rad(deg)),
})

const anchors = {
  topLeft: { edge: edge(ANGLES.topLeft) },
  topRight: { edge: edge(ANGLES.topRight) },
  botLeft: { edge: edge(ANGLES.botLeft), elbow: out(ANGLES.botLeft, 60) },
  botRight: { edge: edge(ANGLES.botRight), elbow: out(ANGLES.botRight, 60) },
}

const ctaTop = n(anchors.botLeft.elbow.y + DROP)
const RIG_H = n(ctaTop + CTA.h)

// Tracés visibles : verticaux depuis le bord haut, arrêtés sur le cercle.
const tubes = {
  topLeft: `M ${n(anchors.topLeft.edge.x)},0 V ${n(anchors.topLeft.edge.y)}`,
  topRight: `M ${n(anchors.topRight.edge.x)},0 V ${n(anchors.topRight.edge.y)}`,
  botLeft: `M ${n(anchors.botLeft.edge.x)},${n(anchors.botLeft.edge.y)} L ${n(anchors.botLeft.elbow.x)},${n(anchors.botLeft.elbow.y)} V ${ctaTop}`,
  botRight: `M ${n(anchors.botRight.edge.x)},${n(anchors.botRight.edge.y)} L ${n(anchors.botRight.elbow.x)},${n(anchors.botRight.elbow.y)} V ${ctaTop}`,
}

// Arc de rayon r entre deux points du bord : le dot longe le cercle.
// Le sens est déduit du chemin le plus court, donc chaque côté part vers l'extérieur.
const along = (inDeg, outDeg) => {
  const delta = (((outDeg - inDeg) % 360) + 360) % 360
  const sweep = delta <= 180 ? 1 : 0
  const span = sweep ? delta : 360 - delta
  const q = edge(outDeg)
  return `A ${r} ${r} 0 ${span > 180 ? 1 : 0} ${sweep} ${n(q.x)},${n(q.y)}`
}

// Trajectoires invisibles suivies par les dots : descente + contour + sortie.
const routes = {
  left: `${tubes.topLeft} ${along(ANGLES.topLeft, ANGLES.botLeft)} L ${n(anchors.botLeft.elbow.x)},${n(anchors.botLeft.elbow.y)} V ${ctaTop}`,
  right: `${tubes.topRight} ${along(ANGLES.topRight, ANGLES.botRight)} L ${n(anchors.botRight.elbow.x)},${n(anchors.botRight.elbow.y)} V ${ctaTop}`,
}

const STAGGER = 0.1 // décalage entre gauche et droite d'une même série
const SERIES_GAP = 5 // délai avant le départ de la deuxième série

const dots = [
  { key: 'left-1', d: routes.left, delay: 0 },
  { key: 'right-1', d: routes.right, delay: STAGGER },
  { key: 'left-2', d: routes.left, delay: SERIES_GAP },
  { key: 'right-2', d: routes.right, delay: SERIES_GAP + STAGGER },
]

const nodes = [
  { x: n(anchors.topLeft.edge.x - 7), y: COLLAR },
  { x: n(anchors.topRight.edge.x - 7), y: COLLAR },
  { x: n(anchors.botLeft.elbow.x - 7), y: n(anchors.botLeft.elbow.y - 7) },
  { x: n(anchors.botRight.elbow.x - 7), y: n(anchors.botRight.elbow.y - 7) },
]

const rigStyle = {
  '--rig-w': `${RIG_W}px`,
  '--rig-h': `${RIG_H}px`,
  '--core-top': `${TOP}px`,
  '--cta-w': `${CTA.w}px`,
  '--cta-h': `${CTA.h}px`,
  '--cta-span': `${n(anchors.botRight.elbow.x - anchors.botLeft.elbow.x + CTA.w)}px`,
}

const followPath = (d, delay = 0) => ({
  offsetPath: `path("${d}")`,
  animationDelay: `${delay}s`,
})
</script>

<template>
  <div class="hero__rig" :style="rigStyle">
    <svg
      class="hero__tubes"
      :viewBox="`0 0 ${RIG_W} ${RIG_H}`"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path v-for="(d, key) in tubes" :key="`casing-${key}`" class="tube-casing" :d="d" />
      <path v-for="(d, key) in tubes" :key="`line-${key}`" class="tube-line" :d="d" />
      <rect
        v-for="(node, i) in nodes"
        :key="`node-${i}`"
        class="tube-node"
        :x="node.x"
        :y="node.y"
        width="14"
        height="14"
        rx="2"
      />
    </svg>

    <span
      v-for="dot in dots"
      :key="dot.key"
      class="tube-dot"
      :style="followPath(dot.d, dot.delay)"
      aria-hidden="true"
    />

    <slot />
  </div>
</template>

<style scoped lang="scss">
.hero__rig {
  position: relative;
  isolation: isolate;
  width: var(--rig-w);
  max-width: 100%;
  height: var(--rig-h);

  @include mq-mobile {
    width: auto;
    height: auto;
  }
}

.hero__tubes {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .tube-casing {
    fill: none;
    stroke: $tube-casing;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .tube-line {
    fill: none;
    stroke: $line;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .tube-node {
    fill: $brass;
    opacity: 0.75;
  }

  @include mq-mobile {
    display: none;
  }
}

.tube-dot {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $core-bright;
  box-shadow: 0 0 8px 2px rgba($core, 0.8);
  offset-rotate: 0deg;
  pointer-events: none;
  animation: tube-travel 11.4s linear infinite;

  @include mq-mobile {
    display: none;
  }
}

@keyframes tube-travel {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  1.8% {
    opacity: 1;
  }
  52.6% {
    offset-distance: 100%;
    opacity: 1;
  }
  54.4% {
    opacity: 0;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tube-dot {
    animation: none;
    opacity: 0;
  }
}
</style>
