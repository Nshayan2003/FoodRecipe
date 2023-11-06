export const debounce = (func, time = 150) => {
  let timer

  return function (...args) {
    const context = this
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      timer = null
      func.apply(context, args)
    }, time)
  }
}
