
export const createWatermark = ({
  text,
  gap,
  fontSize,
  color,
  width = window.innerWidth,
  height = window.innerHeight,
  drawMode = 'fill'
}) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  ctx.font = `${fontSize}px Arial`
  ctx[drawMode + 'Style'] = color

  const textWidth = ctx.measureText(text).width
  const perWidth = textWidth + gap
  const perHeight = fontSize + gap
  for (let y = gap / 2; y < height; y += perHeight) {
    for (let x = gap / 2; x < width; x += perWidth) {
      ctx[drawMode + 'Text'](text, x, y)
    }
  }

  return canvas
}

export default {
  createWatermark
}
