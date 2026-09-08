export function useSectionContext(name) {
  const el = ref(null)
  const { context } = useConsole()
  let observer = null

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) context.value = name
        else if (context.value === name) context.value = null
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    if (el.value) observer.observe(el.value)
  })

  onUnmounted(() => observer?.disconnect())
  return el
}
