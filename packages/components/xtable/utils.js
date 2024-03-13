const { highdict } = StardustJs
const { storage } = StardustBrowser

const { local } = storage

const TYPES = ['index', 'selection', 'expand', 'radio', '_index']

export function props () {
  return {
    table: Object,
    loading: Boolean,
    data: Array,
    columns: Array,
    query: Object,
    total: Number,
    finished: Boolean,
    selection: Array,
    chartHeight: String,
    chartOption: Object,
    tref: Object,
    defaultValue: '',
    slotAll: {
      type: Boolean,
      default: false
    },
    onSelectionChange: Function,
    onSortChange: Function,
    onHeaderDragend: Function,
    onCheckedChange: Function,
    onSearch: Function,
    onAdd: Function,
    onEdit: Function,
    onDelete: Function,
    onRowEdit: Function,
    onCancelEdit: Function,
    onExport: Function,
    onSearchExport: Function,
    onImport: Function,
    onMultiDelete: Function,
    onLoad: Function,

    controller: Object,
    listen: {
      type: String,
      default: '*'
    },

    title: {
      type: String,
      default: '表格'
    },
    useCollapse: {
      type: Boolean,
      default: false
    },
    uid: String
  }
}

export function emits () {
  return [
    'update:tref',
    'search',
    'add',
    'edit',
    'row-edit',
    'cancel-edit',
    'delete',
    'export',
    'search-export',
    'load'
  ]
}

export function _attrs () {
  const platform = this.$.attrs.platform || (window.isMobile ? 'mobile' : 'pc')
  const key = platform + 'TableAttrs'
  const dict = {}
  if (key in this) Object.assign(dict, this[key])
  Object.assign(dict, this.$attrs)
  return dict
}

export function domids () {
  const domids = {}
  const keys = [
    'search',
    'add',
    'multi-delete',
    'export',
    'search-export',
    'import',

    'edit',
    'row-edit',
    'cancel-edit',
    'delete'
  ]
  keys.forEach(key => domids[key] = key)
  return { ...domids, ...this.$attrs.domids }
}

export function elTableAttrs () {
  const keys = Object.keys(this._attrs).filter(key => !key.endsWith('-btn'))
  const attrs = {}
  keys.forEach(key => attrs[key] = this._attrs[key])
  delete attrs.platform
  return {
    border: true,
    stripe: true,
    fit: true,
    'highlight-current-row': true,
    ...attrs,
    data: this._data,
    'cell-class-name': this.cellClassName,
    'cell-style': this.cellStyle
  }
}

export function _loading () {
  const { table, loading } = this.$props
  return loading || table?.loading
}

export function _data () {
  const { table, data } = this.$props
  return data || table?.list || []
}

export function _columns () {
  const { $props, _query } = this
  const { table, columns } = $props
  const cols = columns || table?.columns || []
  return cols.map(col => {
    if (col.type === '_index') {
      return Object.assign({
        width: 60,
        label: '序号',
        index (num) {
          const { page, limit } = _query
          return (table.isInfinite ? 0 : (page - 1) * limit) + num + 1
        }
      }, col, { type: 'index' })
    } else if (col.type === 'radio') {
      return Object.assign({ width: 60, label: '单选' }, col)
    }
    return Object.assign({}, col, col.tableAttrs)
  })
}

export function _query () {
  const { table, query } = this.$props
  return query || table?.query
}

export function _total () {
  const { table, total } = this.$props
  return total || table?.total
}

export function _finished () {
  const { table, finished } = this.$props
  return finished ?? table?.finished
}

export function _selection () {
  const { table, selection } = this.$props
  return selection || table?.selection
}

export function _chartHeight () {
  const { table, chartHeight } = this.$props
  return chartHeight || table?.chartHeight || '360px'
}

export function _chartOption () {
  const { table, chartOption } = this.$props
  return chartOption || table?.chartOption || []
}

export function _onSearch () {
  if (this.hideSearcher) {
    return (this.onSearch || this._listen['search']) ? () => this._emit('search') : null
  }
  if (this.onSearch || this._listen['search']) {
    return (params) => {
      if (params) {
        this._emit('search')
      } else {
        this.$refs.searcher.open()
      }
    }
  }
  return null
}

export function _onAdd () {
  return (this.onAdd || this._listen['add']) ? () => this._emit('add') : null
}

export function _onExport () {
  return (this.onExport || this._listen['export']) ? () => this._emit('export') : null
}

export function _onSearchExport () {
  return (this.onSearchExport || this._listen['search-export']) ? () => this._emit('search-export') : null
}

export function _onImport () {
  return (this.onImport || this._listen['import']) ? () => this._emit('import') : null
}

export function _onMultiDelete () {
  return (this.onMultiDelete || this._listen['multi-delete']) ? () => this._emit('multi-delete') : null
}

export function _onLoad () {
  return this.onLoad || this._listen['load'] ? () => this._emit('load') : () => {}
}

export function _listen () {
  if (!this.controller || !this.listen?.length) return {}
  let events = this.listen.split(',')
  if (events.includes('*')) {
    events = [...new Set([
      ...events, 'search', 'add', 'multi-delete', 'export', 'search-export', 'import',
      'edit', 'row-edit', 'cancel-edit', 'delete'
    ])]
  }
  const dict = {}
  events.forEach(e => {
    const funcName = 'handle' + e.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('')
    dict[e] = this.controller[funcName]
  })
  return dict
}

export function _visibleColumns () {
  const left = this._columns.filter(col => col.type && TYPES.includes(col.type) || col.fixed === 'left')
  const right = this.settings.columns.filter(col => !col.hide && col.fixed !== 'left').map(col => {
    const column = this._columns.find(c => c.prop === col.prop)
    return {
      sortable: 'custom',
      ...column,
      width: col.width || column.width
    }
  })
  return left.concat(right)
}

export function _uid () {
  const { table, uid } = this.$props
  return uid || table?.uid || ''
}

export function plain () {
  const { plain } = this._attrs
  return plain || plain === ''
}

export function hideHeader () {
  const { 'hide-header': hideHeader } = this._attrs
  return hideHeader || hideHeader === ''
}

export function hideTools () {
  const { 'hide-tools': hideTools } = this._attrs
  return this.plain ? hideTools !== false : (hideTools || hideTools === '')
}

export function hideSearcher () {
  const { 'hide-searcher': hideSearcher } = this._attrs
  return this.plain ? hideSearcher !== false : (hideSearcher || hideSearcher === '')
}

export function hideChart () {
  const { 'hide-chart': hideChart } = this._attrs
  return this.plain ? hideChart !== false : (hideChart || hideChart === '')
}

export function hideSettings () {
  const { 'hide-settings': hideSettings } = this._attrs
  return this.plain ? hideSettings !== false : (hideSettings || hideSettings === '')
}

export function hideOperates () {
  const { 'hide-operates': hideOperates } = this._attrs
  return this.plain ? hideOperates !== false : (hideOperates || hideOperates === '')
}

export function hidePagination () {
  const { 'hide-pagination': hidePagination } = this._attrs
  return this.plain ? hidePagination !== false : (hidePagination || hidePagination === '')
}

export function operatesWidth () {
  return this._attrs['operates-width'] ?? 150
}

export function operatesDropdown () {
  return this._attrs['operates-dropdown']
}

export function searcherColumns () {
  return this._columns.filter(col => !col.virtual && (!col.type || !TYPES.includes(col.type)))
}

export function searcherConfig () {
  return this.table.searcherConfig ?? this._attrs['searcher-config'] ?? {}
}

export function initSettings () {
  const settings = this._uid && local.getJson(`Settings[${this._uid}]`, {}) || {}
  if (!settings.columns) {
    settings.columns = this._columns.filter(col => {
      return col.label && col.prop && !(col.type && TYPES.includes(col.type))
    }).map(col => {
      const { prop, label, show, hide, width, virtual, fixed } = col
      return { prop, label, show, hide, width, virtual, fixed }
    })
  }
  this.settings = settings
}

export function saveSettings (value) {
  local.setJson(`Settings[${this._uid}]`, value)
}

export function calcValue (row, column) {
  const { prop } = column
  const value = row[prop]
  let { format, formatter } = column.tableAttrs || column
  if (formatter) return formatter(value, row)
  format = Array.isArray(column.options) ? format !== false : format
  if (format) {
    const formatProp = `_formatted_${prop}`
    if (formatProp in row) {
      return row[formatProp]
    }
  }
  if (value === undefined) {
    if (prop.includes('.') || prop.includes('[')) {
      return highdict.get(row, prop)
    }
    return this.defaultValue
  }
  if (value === '') {
    return this.defaultValue
  }
  return value
}

export function calcLink (scope, column) {
  if (column.link) return column.link(scope)
  return highdict.get(scope.row, column.linkProp || column.prop)
}

export function calcOverflowTooltip (column) {
  if (['index', 'selection', 'expand'].includes(column.type)) {
    return false
  }
  const { showOverflowTooltip } = column.tableAttrs || column
  return showOverflowTooltip !== false
}

export function handleSearch (params) {
  this.params = params
  this._emit('search', params)
}

export function handleResetSettings (value) {
  this.saveSettings(value)
  this.initSettings()
}

export function handleHeaderDragend (newWidth, oldWidth, column, event) {
  const col = this.settings.columns.find(col => col.prop === column.property)
  if (col) {
    col.width = newWidth
    this.saveSettings(this.settings)
  }
  if (this.onHeaderDragend) {
    this.onHeaderDragend(newWidth, oldWidth, column, event)
  }
}

export function handleSelectionChange (rows) {
  if (this._selection) {
    this._selection.splice(0)
    this._selection.push(...rows)
  }
  if (this.onSelectionChange) {
    this.onSelectionChange(rows)
  }
}

export function handleSortChange (params) {
  if (this.onSortChange) {
    this.onSortChange(params)
  } else {
    if (Array.isArray(params)) {
      this.controller?.handleSortChange?.(params)
    } else if (params.column.sortable === 'custom') {
      this.controller?.handleSortChange?.(params)
    }
  }
}

export function handleCheckedChange (e) {
  this.checked = e.target.value * 1
  const row = this._data[this.checked]
  if (this.table) {
    this.table.checked = row
  }
  if (this.onCheckedChange) {
    this.onCheckedChange(row)
  }
}

export function handleCollapseChange (activeNames) {
  if (activeNames.length) {
    this.isMinus = false
    if (!this.useCollapse) {
      this._useCollapse = false
    }
  }
}

export function handleMinus () {
  this.isMinus = !this.isMinus
  if (this.isMinus) {
    this._useCollapse = true
    this.activeNames = []
  } else {
    this._useCollapse = this.useCollapse
    this.activeNames = ['name']
  }
}

export function handleToggleFullscreen () {
  this.isFullscreen = !this.isFullscreen
  if (this.isFullscreen) {
    this.zoom = document.documentElement.style.zoom
    document.documentElement.style.zoom = 1
  } else {
    document.documentElement.style.zoom = this.zoom
  }
}

export function cellClassName (props) {
  let classNames = this._attrs['cell-class-name'] ? this._attrs['cell-class-name'](props) : ''
  const col = this._visibleColumns[props.columnIndex]
  if (col?.tableAttrs?.class) {
    const klass = col.tableAttrs.class
    if (typeof klass === 'function') {
      classNames += ' ' + klass(props)
    } else if (typeof klass === 'string') {
      classNames += ' ' + klass
    }
  }
  return !classNames ? '' : [...new Set(classNames.split(' '))].join(' ')
}

export function cellStyle (props) {
  const style = this._attrs['cell-style'] ? this._attrs['cell-style'](props) : {}
  const col = this._visibleColumns[props.columnIndex]
  if (col?.tableAttrs?.style) {
    const sty = col.tableAttrs.style
    if (typeof sty === 'function') {
      Object.assign(style, sty(props))
    } else if (typeof sty === 'object') {
      Object.assign(style, sty)
    }
  }
  return Object.keys(style) ? style : null
}

export function calcTagType (scope, column) {
  const { tagTypes, prop, options } = column
  const value = scope.row[prop]
  if (tagTypes) {
    if (typeof tagTypes === 'function') {
      return tagTypes(value, scope, column)
    } else if (typeof tagTypes === 'object') {
      return tagTypes[value]
    }
  } else if (options) {
    const op = options.find(o => o[column.value || 'value'] === value)
    if (op?.tagType) return op.tagType
  }
  return value ? 'success' : 'danger'
}

export function calcTagValue (scope, column) {
  const { tagValues, prop, options } = column
  const value = scope.row[prop]
  if (tagValues) {
    if (typeof tagValues === 'function') {
      return tagValues(value, scope, column)
    } else if (typeof tagValues === 'object') {
      return tagValues[value]
    }
  } else if (options) {
    const op = options.find(o => o[column.value || 'value'] === value)
    if (op) return op[column.text || 'text']
  }
  return value
}

export function canEdit (row) {
  return !!(this.onEdit || this._listen['edit']) && (row.editable !== false) && !row.isEditing
}

export function canSave (row) {
  return !!(this.onRowEdit || this._listen['row-edit']) && this.table.isRowEdit && row.isEditing
}

export function canRowEdit (row) {
  return !!(this.onRowEdit || this._listen['row-edit']) && this.table.isRowEdit && row.isEditing
}

export function canCancelEdit (row) {
  return !!(this.onCancelEdit || this._listen['cancel-edit']) && this.table.isRowEdit && row.isEditing
}

export function canDelete (row) {
  return !!(this.onDelete || this._listen['delete']) && row.deletable !== false
}

export function _imageSrc (scope, column) {
  const value = scope.row[column.prop]
  return Array.isArray(value) ? value[0] : value
}

export function _imagePreviewSrcList (scope, column) {
  const value = scope.row[column.prop]
  if (Array.isArray(value)) return value
  return column.previewSrcList?.() || [value]
}

export function _emit (event, payload) {
  const funcName = 'on' + event.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('')
  if (this[funcName]) {
    this[funcName](payload)
  } else if (this._listen[event]) {
    this._listen[event](payload)
  } else {
    this.$emit(event, payload)
  }
}

export function $route () {
  if (this.zoom !== 1) {
    document.documentElement.style.zoom = this.zoom
  }
}

export default {
  props,
  emits,
  computed: {
    _attrs,
    domids,
    elTableAttrs,
    _loading,
    _data,
    _columns,
    _query,
    _total,
    _finished,
    _selection,
    _chartHeight,
    _chartOption,
    _onSearch,
    _onAdd,
    _onExport,
    _onSearchExport,
    _onImport,
    _onMultiDelete,
    _onLoad,
    _listen,
    _visibleColumns,
    _uid,
    plain,
    hideHeader,
    hideTools,
    hideSearcher,
    hideChart,
    hideSettings,
    hideOperates,
    hidePagination,
    operatesWidth,
    operatesDropdown,
    searcherColumns,
    searcherConfig
  },
  watch: {
    $route
  },
  methods: {
    initSettings,
    saveSettings,
    calcValue,
    calcLink,
    calcOverflowTooltip,
    handleSearch,
    handleResetSettings,
    handleHeaderDragend,
    handleSelectionChange,
    handleSortChange,
    handleCheckedChange,
    handleCollapseChange,
    handleMinus,
    handleToggleFullscreen,
    cellClassName,
    cellStyle,
    calcTagType,
    calcTagValue,
    canEdit,
    canSave,
    canRowEdit,
    canCancelEdit,
    canDelete,
    _imageSrc,
    _imagePreviewSrcList,
    _emit
  }
}
