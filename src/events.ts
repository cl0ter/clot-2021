import _debounce from 'lodash.debounce'

const threshold = 400
const timeout = 200
const blockTimeout = 600

let change: number = 0
let blocked: boolean = false

let call: ((direction: number) => void) | null = null

const elements: {
  root: HTMLDivElement | null
  front: HTMLDivElement | null
  back: HTMLDivElement | null
} = {
  root: null,
  front: null,
  back: null
}

const innerState = {
  attached: false
}

const reset = () => {
  if (blocked) {
    // fn was already called manually
    return
  }
  blocked = true
  change = 0

  setTimeout(() => {
    blocked = false
  }, blockTimeout)
}

const debounced = _debounce(reset, timeout)

const handleWheel = (ev: WheelEvent) => {
  if (blocked) {
    return
  }
  change += ev.deltaY

  if (change > threshold) {
    reset()
    call!(1)
  } else if (change < -threshold) {
    reset()
    call!(-1)
  }

  debounced()
}

const handleSwipe = (ev: any) => {
  if (ev.detail.dir === 'up') {
    call!(1)
  } else if (ev.detail.dir === 'down') {
    call!(-1)
  }
}

const add = ({
  rootEl,
  backEl,
  frontEl,
  triggerFn
}: {
  rootEl: HTMLDivElement
  backEl: HTMLDivElement
  frontEl: HTMLDivElement
  triggerFn: (direction: number) => void
}): void => {
  elements.root = rootEl
  elements.back = backEl
  elements.front = frontEl
  call = triggerFn

  if (!elements.root || !elements.front || !elements.back || !call) {
    throw new TypeError('Bad element root or fn provided')
  }

  elements.root.addEventListener('wheel', handleWheel)
  elements.front.addEventListener('swiped', handleSwipe)
  elements.back.addEventListener('swiped', handleSwipe)
  innerState.attached = true
}

const remove = (): void => {
  elements.root?.removeEventListener('wheel', handleWheel)
  elements.front?.removeEventListener('swiped', handleSwipe)
  elements.back?.removeEventListener('swiped', handleSwipe)
  innerState.attached = false
}

const state = innerState

export { add, remove, state }
