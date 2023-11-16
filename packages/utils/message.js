const { ElMessage, ElNotification, ElMessageBox } = window.ElementPlus || {}
const { showToast, showNotify, showConfirmDialog } = window.vant || {}

export const Message = options => {
  let opts = typeof options !== 'string' ? options : { message: options }
  opts = {
    type: 'error',
    duration: 3000,
    ...opts
  }
  const { isMobile = window.isMobile, type } = opts
  if (isMobile) {
    if (type === 'error' || type === 'warning') opts.type = 'fail'
    showToast(opts)
  } else {
    ElMessage({
      showClose: true,
      grouping: true,
      ...opts
    })
  }
}

export const Notify = options => {
  let opts = typeof options !== 'string' ? options : { message: options }
  opts = {
    type: 'error',
    duration: 3000,
    ...opts
  }
  const { isMobile = window.isMobile, type } = opts
  if (isMobile) {
    if (type === 'error') opts.type = 'danger'
    showNotify(opts)
  } else {
    ElNotification({
      showClose: true,
      ...opts
    })
  }
}

export const Confirm = options => {
  let promise = null
  const { isMobile = window.isMobile } = options
  if (isMobile) {
    promise = showConfirmDialog(options)
  } else {
    promise = ElMessageBox.confirm(
      options.message || '',
      options.title || '',
      {
        draggable: true,
        ...options,
        type: options.type || 'info',
        confirmButtonText: options.confirmButtonText || '确定',
        cancelButtonText: options.cancelButtonText || '取消',
      }
    )
  }
  return promise.then(() => {
    return options.distinguishCancelAndClose ? 'confirm' : true
  }).catch(action => {
    return options.distinguishCancelAndClose ? action : false
  })
}

for (let type of ['success', 'warning', 'info', 'error', 'primary', 'loading', 'fail', 'html']) {
  Message[type] = Message[type[0]] = options => {
    const opts = typeof options !== 'string' ? options : { message: options }
    return Message({ type, ...opts })
  }
  Notify[type] = Notify[type[0]] = options => {
    const opts = typeof options !== 'string' ? options : { message: options }
    return Notify({ type, ...opts })
  }
  Confirm[type] = Confirm[type[0]] = options => Confirm({ type, ...options })
}

export default {
  Message,
  Notify,
  Confirm
}
