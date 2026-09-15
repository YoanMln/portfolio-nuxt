<script setup>
defineProps({
  name: { type: String, required: true },
  job: { type: String, required: true },
  statut: { type: String, required: true },
})
</script>

<template>
  <div class="core boot">
    <div class="core__ring core__ring--outer" />
    <div class="core__ring core__ring--mid" />

    <div class="core__info">
      <h1 class="hero__name">{{ name }}</h1>
      <p class="hero__status">
        {{ job }}
        <span>// statut : {{ statut }}</span>
      </p>
    </div>

    <div class="core__glow">
      <svg class="core__hub" viewBox="0 0 100 100" aria-hidden="true">
        <polygon class="core__hub-halo" points="50,88 17.1,31 82.9,31" />
        <polygon class="core__hub-filament" points="50,88 17.1,31 82.9,31" />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero__name {
  font-family: $font-display;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: clamp(4.6rem, 8vw, 5.2rem);
  margin: 0;
  color: #fff;
  text-shadow: 0 0 30px rgba(143, 232, 255, 0.4);
  opacity: 0;
  animation: boot-in 0.7s ease-out forwards;
  animation-delay: 0.5s;
}

.hero__status {
  font-family: $font-mono;
  font-size: 14px;
  color: $core;
  margin: 1rem 0 0;
  letter-spacing: 0.04em;
  opacity: 0;
  animation: boot-in 0.7s ease-out forwards;
  animation-delay: 0.85s;
}

.hero__status span {
  display: block;
  color: $muted;
}

.core {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(400px, calc(100vw - 4rem));
  height: min(400px, calc(100vw - 4rem));
  margin-bottom: 1.6rem;
  animation-delay: 0.1s;
}

.core__ring {
  position: absolute;
  border: 2px solid $line;
  border-radius: 50%;
  background: $bg-ring;
}

.core__ring--outer {
  inset: 0;
}

.core__ring--mid {
  inset: 20px;
  border-color: rgba($gold, 0.5);
  animation: spin-rev 12s linear infinite;
  background: $bg-ring-mid;
}

.core__glow {
  position: relative;
  margin-top: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, $core-bright, $core 55%, transparent 75%);
  animation:
    boot-flicker 1.2s steps(1, end) 1 both,
    reactor-hum 2.3s ease-in-out 1.2s infinite;

  &::after {
    content: '';
    position: absolute;
    inset: -40%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba($core, 0.5), transparent 70%);
    animation: reactor-halo 3.7s ease-in-out 1.2s infinite;
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    opacity: 0.4;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 300px 300px;
    animation: reactor-grain 0.6s steps(6, end) infinite;
    pointer-events: none;
  }
}

.core__hub {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 34px;
  height: 34px;
  margin: auto;
  filter: drop-shadow(0 0 5px $core-bright) drop-shadow(0 0 14px rgba($core, 0.7));

  polygon {
    fill: none;
    stroke-linejoin: round;
  }
}

.core__hub-halo {
  stroke: $core;
  stroke-width: 13;
  opacity: 0.55;
}

.core__hub-filament {
  stroke: $core-bright;
  stroke-width: 6;
}

.boot {
  opacity: 0;
  animation: boot-in 0.7s ease-out forwards;
}

@keyframes boot-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
    filter: blur(2px);
  }
  60% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes boot-flicker {
  0%,
  12%,
  26%,
  43% {
    opacity: 0.15;
  }
  8%,
  20%,
  35%,
  60% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes spin-rev {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes reactor-hum {
  0% {
    filter: brightness(1);
  }
  17% {
    filter: brightness(1.04);
  }
  31% {
    filter: brightness(0.98);
  }
  48% {
    filter: brightness(1.02);
  }
  63% {
    filter: brightness(0.99);
  }
  79% {
    filter: brightness(1.03);
  }
  100% {
    filter: brightness(1);
  }
}

@keyframes reactor-halo {
  0% {
    opacity: 0.85;
    transform: scale(1);
  }
  40% {
    opacity: 1;
    transform: scale(1.03);
  }
  70% {
    opacity: 0.9;
    transform: scale(0.99);
  }
  100% {
    opacity: 0.85;
    transform: scale(1);
  }
}

@keyframes reactor-grain {
  0% {
    background-position: 0 0;
  }
  20% {
    background-position: -18px 6px;
  }
  40% {
    background-position: 12px -14px;
  }
  60% {
    background-position: -8px 16px;
  }
  80% {
    background-position: 16px 4px;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
