export function useConsoleTyping(lines) {
  const typeSpeed = 25
  const endPause = 1500
  const bootPause = 400
  const maxHistory = 2
  const displayed = ref('')
  const history = ref([])
  const lineIndex = ref(0)
  const { mode, context } = useConsole()
  const reduced = ref(false)
  const list = computed(() => {
    if (mode.value === 'boot') return lines.boot
    return context.value && lines[context.value]?.length ? lines[context.value] : lines.idle
  })
  const target = computed(() => list.value[lineIndex.value % list.value.length] ?? '')
  let timer
  let current = ''
  let id = 0
  const archive = (text) => {
    if (history.value.at(-1)?.text === text) return
    history.value.push({ id: id++, text })
    if (history.value.length > maxHistory) {
      history.value.shift()
    }
  }
  const step = () => {
    timer = null
    const goal = target.value
    if (goal !== current) {
      if (current && displayed.value === current) archive(current)
      current = goal
      displayed.value = ''
      timer = setTimeout(step, typeSpeed)
      return
    }
    if (displayed.value.length < goal.length) {
      displayed.value = goal.slice(0, displayed.value.length + 1)
      timer = setTimeout(step, typeSpeed)
      return
    }
    const isBoot = mode.value === 'boot'
    const hasNext = lineIndex.value + 1 < list.value.length
    if (!hasNext && isBoot) {
      mode.value = 'idle'
      return step()
    }
    if (hasNext) {
      timer = setTimeout(
        () => {
          lineIndex.value++
          step()
        },
        isBoot ? bootPause : endPause,
      )
    }
  }
  watch(list, () => {
    lineIndex.value = 0
  })
  watch(target, (goal) => {
    if (reduced.value) {
      current = goal
      displayed.value = goal
    } else if (!timer) {
      step()
    }
  })
  onMounted(() => {
    reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.value) {
      mode.value = 'idle'
      current = target.value
      displayed.value = target.value
      return
    }
    step()
  })
  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })
  return { displayed, history }
}

//--------------------------------------------------//

export function useConsole() {
  const mode = useState('console-mode', () => 'boot')
  const context = useState('console-context', () => null)
  const status = useState('console-status', () => 'idle')

  return { mode, context, status }
}
