const { ElInfiniteScroll } = window.ElementPlus || {}

const elTableScrollWrapperClass = '.el-scrollbar__wrap'

const syncOptions = (sourceElem, targetElem) => {
  syncAttrs(sourceElem, targetElem, [
    'infinite-scroll-disabled',
    'infinite-scroll-delay',
    'infinite-scroll-immediate',
    'infinite-scroll-distance',
  ])
  const name = 'infinite-scroll-distance'
  const value = +(sourceElem.getAttribute(name) || 0)
  targetElem.setAttribute(name, (value < 1 ? 1 : value) + '')
}

const syncAttrs = (sourceElem, targetElem, attrsKeys) => {
  let value
  attrsKeys.forEach((name) => {
    value = sourceElem.getAttribute(name)
    if (value !== null) {
      targetElem.setAttribute(name, value)
    } else {
      targetElem.removeAttribute(name)
    }
  })
}

const ElTableInfiniteScroll = {
  name: 'el-table-infinite-scroll',
  mounted(el, binding, VNode, oldVNode) {
    const scrollElem = el.querySelector(elTableScrollWrapperClass)
    if (!scrollElem) {
      throw new Error(`${elTableScrollWrapperClass} element not found.`)
    }
    scrollElem.style.overflowY = 'auto'
    setTimeout(() => {
      if (!el.style.height && !el.style.maxHeight) {
        scrollElem.style.height = '400px'
        console.warn('el-table height required, otherwise will set scrollbar default height: 400px')
      }
      syncOptions(el, scrollElem)
      ElInfiniteScroll.mounted(scrollElem, binding, VNode, oldVNode)
    }, 0)
  },
  updated(el) {
    syncOptions(el, el.querySelector(elTableScrollWrapperClass))
  },
  unmounted(el, ...args) {
    const scrollElem = el.querySelector(elTableScrollWrapperClass)
    ElInfiniteScroll.unmounted(scrollElem, ...args)
  }
}

export default ElTableInfiniteScroll
