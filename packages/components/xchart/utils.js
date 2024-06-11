const { funcs } = StardustBrowser

export const props = {
  height: {
    type: String,
    default: '150px'
  },
  option: {
    type: Object,
    default: () => ({})
  },
  updator: Object,
  datasource: Object
}

export const formItems = [
  {
    label: '分类', prop: 'categories', comp: 'x-select', multiple: true, 'collapse-tags': true, clearable: false,
    text: 'label', value: 'prop',
    options: []
  },
  {
    label: '系列', prop: 'series', comp: 'x-select', clearable: false, required: true,
    text: 'label', value: 'prop',
    options: [], slot: 'selects-formatters', formatters: []
  },
  {
    label: '值', prop: 'attr', comp: 'x-select', clearable: false, required: true,
    text: 'label', value: 'prop',
    options: [], slot: 'selects-formatters', formatters: []
  },
  {
    label: '汇总方式', prop: 'summary', comp: 'x-select', clearable: false, required: true,
    options: [
      { text: '求和', value: 'sum' },
      { text: '平均', value: 'average' },
      { text: '首个', value: 'first' },
      { text: '最后一个', value: 'last' },
      { text: '最大值', value: 'max' },
      { text: '最小值', value: 'min' },
      { text: '个数', value: 'count' },
    ]
  },
  {
    label: '图表类型', prop: 'type', comp: 'x-select', clearable: false, required: true,
    options: [
      { text: '柱状图', value: 'bar' },
      { text: '折线图', value: 'line' }
    ]
  },
  { label: '边距', slot: 'grid' },
  { label: '数据筛选', slot: 'filter' },
  { label: '字体大小', slot: 'font-sizes' }
]

export const form = {
  sort: '',
  categories: [],
  series: '',
  attr: '',
  summary: 'count',
  type: 'bar',
  grid: {
    left: 30,
    top: 40,
    right: 20,
    bottom: 30
  },
  filter: {
    categories: { isLimit: false, limit: 10, mergeOthers: false },
    series: { isLimit: false, limit: 10, mergeOthers: false }
  },
  fontSizes: [12, 12, 12]
}

export function zoomedHeight () {
  return funcs.calcPixel(this.height) * this.zoom + 'px'
}

export function sidebarCollapse () {
  return this.$store.app.sidebarCollapse
}

export function grid () {
  return this.dialog.form.grid
}

export function categories () {
  return this.dialog.form.filter.categories
}

export function series () {
  return this.dialog.form.filter.series
}

export function fontSizes () {
  return this.dialog.form.fontSizes
}

export default {
  props,
  formItems,
  form,
  computed: {
    zoomedHeight,
    sidebarCollapse,
    grid,
    categories,
    series,
    fontSizes
  }
}
