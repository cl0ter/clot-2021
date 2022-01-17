import _debounce from 'lodash.debounce'

const treshold = 400
const timeout = 200

let change: number = 0
let blocked: boolean = false

let call: ((direction: number) => void) | null = null

const reset = () => {
  if (blocked) {
    // fn was already called manually
    return
  }
  console.log('done! total change: %o', change)
  blocked = true
  change = 0

  setTimeout(() => {
    blocked = false
  }, 1000)
}

const debounced = _debounce(
  reset,
  timeout,
)

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

const add = (
  rootEl: HTMLDivElement,
  triggerFn: (direction: number) => void,
): void => {
  console.log('adding events to %o', rootEl)
  call = triggerFn
  if (typeof call !== 'function') {
    throw new Error('Trigger fn required')
  }

  rootEl.addEventListener('wheel', handleWheel)
}

const remove = (
  rootEl: HTMLDivElement,
): void => {
  rootEl.removeEventListener('wheel', handleWheel)
}

export {
  add,
  remove,
}
