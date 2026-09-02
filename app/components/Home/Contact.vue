<script setup>
const state = reactive({ name: '', email: '', message: '' })
const botField = ref('')
const isSubmitted = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const config = useRuntimeConfig()

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
  <section class="contact">
    <div class="section-head">
      <div class="eyebrow">Contact</div>
      <h2 class="section-title">Établir la connexion</h2>
    </div>
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
  </section>
</template>
