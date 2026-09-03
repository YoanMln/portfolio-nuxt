<template>
  <div class="core boot">
    <div class="core__ring core__ring--outer" />
    <div class="core__ring core__ring--mid" />
    <div class="core__orbit" />
    <div class="core__glow" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/abstracts' as *;

.core {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  margin-bottom: 1.6rem;
  animation-delay: 0.1s;
}

.core__ring {
  position: absolute;
  border: 1px solid $line;
  border-radius: 50%;
}

.core__ring--outer {
  inset: 0;
  border-style: dashed;
  animation: spin 18s linear infinite;
}

.core__ring--mid {
  inset: 20px;
  border-color: rgba($gold, 0.5);
  animation: spin-rev 12s linear infinite;
}

.core__orbit {
  position: absolute;
  inset: 0;
  animation: spin 5s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 50%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: $core-bright;
    box-shadow: 0 0 10px 3px rgba($core, 0.8);
    transform: translateX(-50%);
  }
}

.core__glow {
  position: relative;
  width: 54px;
  height: 54px;
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

@keyframes spin {
  to {
    transform: rotate(360deg);
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
