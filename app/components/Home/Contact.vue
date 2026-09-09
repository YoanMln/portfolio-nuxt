<script setup>
const state = reactive({ name: '', email: '', message: '' })
const botField = ref('')
const isSubmitted = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const config = useRuntimeConfig()
const section = useSectionContext('contact')
const { status } = useConsole()
const colorState = computed(() => {
  if (isLoading.value) return 'busy'
  if (isSubmitted.value) return 'ok'
  if (errorMessage.value) return 'error'
  return 'idle'
})
watch(colorState, (value) => {
  status.value = value
})

function validate(state) {
  const errors = []
  if (!state.name) errors.push({ name: 'name', message: 'Le nom est requis.' })
  if (!state.email) {
    errors.push({ name: 'email', message: "L'email est requis." })
  } else if (!EMAIL_RE.test(state.email)) {
    errors.push({ name: 'email', message: "Le format de l'email est invalide." })
  }
  if (!state.message) errors.push({ name: 'message', message: 'Le message est requis.' })
  return errors
}

async function onSubmit(event) {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await $fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'contact',
        'bot-field': botField.value,
        ...event.data,
      }).toString(),
    })

    isSubmitted.value = true
    Object.assign(state, { name: '', email: '', message: '' })
    setTimeout(() => {
      isSubmitted.value = false
    }, 3000)
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error)
    errorMessage.value = config.public.email
      ? `L'envoi a échoué. Vous pouvez m'écrire directement à ${config.public.email}`
      : "L'envoi a échoué. Merci de réessayer plus tard."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section ref="section" class="section contact">
    <div class="section-head">
      <div class="eyebrow">Contact</div>
      <h2 class="section-title">Établir la connexion</h2>
    </div>
    <div class="contact__grid">
      <div class="contact__panel">
        <UForm
          v-if="!isSubmitted"
          :validate="validate"
          :state="state"
          class="contact__form"
          @submit="onSubmit"
        >
          <input
            v-model="botField"
            type="text"
            name="bot-field"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
            class="contact__honeypot"
          />
          <UFormField label="Nom" name="name" required>
            <UInput v-model="state.name" />
          </UFormField>
          <UFormField label="Email" name="email" required>
            <UInput v-model="state.email" type="email" />
          </UFormField>
          <UFormField label="Message" name="message" required>
            <UTextarea v-model="state.message" placeholder="Votre message" />
          </UFormField>
          <UButton type="submit" label="Envoyer" :loading="isLoading" />
        </UForm>
        <p v-else class="contact__success">Merci pour votre message !</p>
        <p v-if="errorMessage" class="contact__error">{{ errorMessage }}</p>
      </div>
      <div class="contact__links">
        <NuxtLink
          v-if="config.public.linkedin"
          class="contact__link"
          target="_blank"
          rel="noopener noreferrer"
          :to="config.public.linkedin"
        >
          LinkedIn
        </NuxtLink>
        <NuxtLink
          v-if="config.public.github"
          class="contact__link"
          target="_blank"
          rel="noopener noreferrer"
          :to="config.public.github"
        >
          GitHub
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact {
  &__grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 32px;
    align-items: start;
    @include mq-mobile {
      grid-template-columns: 1fr;
    }
  }
  &__panel {
    position: relative;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    :deep([data-slot='root']) {
      width: 100%;
    }
    :deep(label[data-slot='label']) {
      display: block;
      margin-bottom: 6px;
      font-family: $font-mono;
      font-size: 10.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: $muted;
    }

    :deep(input[data-slot='base']),
    :deep(textarea[data-slot='base']) {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid $line;
      border-radius: 0;
      background: rgba($core, 0.03);
      font-family: $font-body;
      font-size: 14px;
      color: $text;

      &:focus {
        outline: none;
        border-color: $core;
        box-shadow: 0 0 0 3px rgba($core, 0.15);
      }
    }
    :deep(textarea[data-slot='base']) {
      min-height: 110px;
      resize: vertical;
    }
    :deep([data-slot='error']) {
      font-family: $font-mono;
      font-size: 12px;
      letter-spacing: 0.04em;
      color: $red;
    }
    :deep(button[data-slot='base']) {
      align-self: flex-start;
      padding: 12px 24px;
      border: none;
      border-radius: 0;
      background: $core;
      font-family: $font-mono;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: $bg-void;
      transition: box-shadow 0.2s ease;

      &:hover {
        box-shadow: 0 0 22px rgba($core, 0.6);
      }
    }
  }
  &__honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  &__success {
    font-family: $font-mono;
    font-size: 12px;
    letter-spacing: 0.04em;
    color: $core;
  }

  &__error {
    margin-top: 14px;
    font-family: $font-mono;
    font-size: 12px;
    letter-spacing: 0.04em;
    color: $red;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 17px;
    border: 1px solid $line;
    font-family: $font-mono;
    font-size: 12.5px;
    letter-spacing: 0.04em;
    color: $text;
    text-decoration: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      border-color: $core;
      box-shadow: 0 0 22px -8px rgba($core, 0.5);
    }
  }
}
</style>
