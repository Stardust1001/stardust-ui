
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
        confirmButtonText: options.confirmButtonText || '确定',
        cancelButtonText: options.cancelButtonText || '取消',
        type: options.type || 'info'
      }
    )
  }
  return promise.then(() => true).catch(() => false)
}

export default {
  Message,
  Notify,
  Confirm
}
