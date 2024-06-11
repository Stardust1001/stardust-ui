export const TYPES = ['index', 'selection', 'expand', 'radio', '_index']

export const FORMATTERS = {
  '原样': v => v,
  '年份': v => format(v, 'YYYY年'),
  '月份': v => format(v, 'MM月'),
  '年月': v => format(v, 'YYYY-MM'),
  '年月日': v => format(v, 'YYYY-MM-DD'),
  '时分': v => format(v, 'HH:mm'),
  '时分秒': v => format(v, 'HH:mm:ss'),
}

export const SORTS = [
  { text: '原样', value: '' },
  { text: '升序', value: 'asc' },
  { text: '降序', value: 'desc' },
]
