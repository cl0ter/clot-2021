import _debounce from 'lodash.debounce'

const treshold = 400
const timeout = 200

let change: number = 0
let blocked: boolean = false

let call: ((direction: number) => void) | null = null

const innerState = {
  attached: false
}

const reset = () => {
  if (blocked) {
    // fn was already called manually
    return
  }
  // console.log('done! total change: %o', change)
  blocked = true
  change = 0

  setTimeout(() => {
    blocked = false
  }, 1000)
}

const debounced = _debounce(reset, timeout)

const handleWheel = (ev: WheelEvent) => {
  if (blocked) {
    return
  }
  change += ev.deltaY

  if (change > treshold) {
    reset()
    call!(1)
  } else if (change < -treshold) {
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

const add = (
  rootEl: HTMLDivElement,
  triggerFn: (direction: number) => void
): void => {
  if (typeof triggerFn !== 'function') {
    throw new Error('Trigger fn required')
  }

  rootEl.addEventListener('wheel', handleWheel)
  rootEl.addEventListener('swiped', handleSwipe)
  call = triggerFn
  innerState.attached = true
}

const remove = (rootEl: HTMLDivElement): void => {
  rootEl.removeEventListener('wheel', handleWheel)
  rootEl.removeEventListener('swiped', handleSwipe)
  innerState.attached = false
}

const state = innerState

export { add, remove, state }
