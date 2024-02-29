import { watch, nextTick } from 'vue'
import BaseController from './BaseController.js'
import { Message, Confirm } from '../utils/message.js'
const { funcs, highdict, dates } = StardustJs
const { file, excel } = StardustBrowser

class CrudController extends BaseController {
  constructor (props) {
    super(props)

    const { model, table, dialog, dbModelName = '', idField = 'id', listProp = 'data' } = props

    this.table = table || model?.table
    this.dialog = dialog || model?.dialog
    this.dbModelName = dbModelName
    this.idField = idField
    this.listProp = listProp

    // 是否在提交中
    this._isSubmitting = false
    // 是否导出中
    this._isExporting = false
    // 上次查询条件，json 字符串
    this._lastSearchParams = null

    this._dbTable = null

    this._unwatchs = []

    nextTick(() => {
      this.router.afterEach(() => {
        this._unwatchs.forEach(un => un())
      })
    })
  }

  get dbTable () {
    if (!this._dbTable) {
      let [database, table] = this.dbModelName.split('.')
      if (!table) {
        database = ''
        table = database
      }
      this._dbTable = new this.service.Table(database, table)
    }
    return this._dbTable
  }

  get form () {
    if (this.model?.form && this.dialog?.form) throw 'conflict of model.form and dialog.form'
    return this.model?.form || this.dialog?.form
  }

  _getMethods () {
    return [
      ...super._getMethods(),
      'handleSearch',
      'handleAdd',
      'handleEdit',
      'handleDelete',
      'handleRowEdit',
      'handleExport',
      'handleSearchExport',
      'handleImport',
      'handleMultiDelete',
      'handleSave',
      'handleSubmit',
      'handleCancel',
      'handleSortChange',
      'handleLoad',

      'onSearch',
      'onAdd',
      'onEdit',
      'onDelete',
      'onSubmit',
      'onCancel',
      'onRowEdit',
      'onCancelEdit',
      'onExport',
      'onSearchExport',
      'onImport',
      'onMultiDelete',

      'search',
      'add',
      'update',
      'remove',

      'getSearchParams',
      'getAddParams',
      'getUpdateParams',
      'getDeleteParams',
      'getSearchExportParams',

      'beforeSearch',
      'beforeAdd',
      'beforeEdit',
      'beforeDelete',
      'afterSearch',
      'afterAdd',
      'afterEdit',
      'afterDelete',
      'afterSubmit',

      'updatePartials',

      '_defaultFormatList',
      '_fillRelatedField',
      'formatList',
      'processExportingColumns',
      'processExportingData',
      'processExporting',
      'processImportingData',
      '_resetForm',
      '_clearValidate',
      '_trimForm',
      '_validateForm',
      '_checkAllNone',
      '_showError'
    ]
  }

  onInit () {
    this.table && this.handleSearch()
  }

  async handleSearch (params, { isInfinite = false } = {}) {
    this.table.isInfinite = isInfinite
    if (!await this.beforeSearch(params)) return
    params = this.getSearchParams(params)
    this.table.loading = true
    const data = await this.search(params)
    let list = highdict.get(data, this.listProp)
    list = this.formatList(this._defaultFormatList(list, data), data)
    Object.assign(this.table, {
      list,
      total: data.total,
      loading: false
    })
    this.afterSearch(list, params, data)
    return data
  }

  async handleAdd () {
    if (!await this.beforeAdd()) return
    this._resetForm()
    Object.assign(this.dialog, {
      visible: true,
      isEditing: false
    })
    await nextTick()
    await funcs.sleep(50)
    this._clearValidate()
    this.afterAdd()
  }

  async handleEdit ({ $index, row }) {
    if (!await this.beforeEdit({ $index, row })) return
    if (this.table.isRowEdit) {
      row.originData = JSON.stringify(row)
      row.isEditing = true
    } else {
      this._resetForm()
      Object.assign(this.dialog, {
        visible: true,
        isEditing: true,
        editingIndex: $index,
        editingRow: row,
        form: {
          ...this.dialog.form,
          ...row
        }
      })
      await nextTick()
      this.dialog.formRef?.validate().catch(Function())
    }
    this.afterEdit({ $index, row })
  }

  async handleDelete ({ $index, row }) {
    if (!await this.beforeDelete({ $index, row })) return
    const ok = await Confirm.w({ message: '确定要删除吗？', title: '警告' })
    if (ok) {
      const params = this.getDeleteParams(row)
      const data = await this.remove(params, row)
      if (!data.err) {
        this.afterDelete(data)
        this.handleSearch()
      }
    }
  }

  async handleRowEdit ({ row }) {
    if (row._loading) return
    row._loading = true
    const params = this.getUpdateParams(row)
    if (!(await this._checkAllNone(params))) {
      row._loading = false
      return
    }
    try {
      await this.update(params, row[this.idField])
    } catch (err) {
      this._showError(err.data.err)
      row._loading = false
      return
    }
    delete row.originData
    row.isEditing = false
    row._loading = false
  }

  async handleCancelEdit ({ row }) {
    Object.assign(row, JSON.parse(row.originData))
    delete row.originData
    row.isEditing = false
  }

  async handleExport (type = this.exportType, filename = '导出数据') {
    if (this._isExporting) return
    type = type || this.config.exportType || 'csv'
    if (!['csv', 'excel'].includes(type)) {
      Message('不支持的导出类型')
      return
    }
    this._isExporting = true
    const { list, selection, ref } = this.table
    let data = selection.length > 0 ? selection : list
    data = funcs.deepCopy(data)
    data = this.processExportingData(data)
    const cols = this.processExportingColumns(ref._visibleColumns, 'current')
    const props = cols.map(col => col.prop)
    const header = cols.map(col => col.label)
    data = data.map(row => props.map(prop => row[prop]))
    let func = null
    if (type === 'csv') {
      func = excel.export2Csv
    } else {
      func = excel.export2Excel
    }
    let options = { header, data, filename }
    options = await this.processExporting(options)
    func(options)
    this._isExporting = false
  }

  async handleSearchExport (type = this.exportType, filename = '查询导出数据') {
    if (this._isExporting) return
    type = type || this.config.exportType || 'csv'
    if (!['csv', 'excel'].includes(type)) {
      Message('不支持的导出类型')
      return
    }
    this._isExporting = true
    const res = await this.dbTable.search(this.getSearchExportParams())
    let data = res.data
    data = this.formatList(data, res)
    data = this.processExportingData(data, 'search')
    const cols = this.processExportingColumns(this.table.ref._visibleColumns, 'search')
    const props = cols.map(col => col.prop)
    const header = cols.map(col => col.label)
    data = data.map(row => props.map(prop => row[prop]))
    let func = null
    if (type === 'csv') {
      func = excel.export2Csv
    } else {
      func = excel.export2Excel
    }
    let options = { header, data, filename }
    options = await this.processExporting(options)
    func(options)
    this._isExporting = false
  }

  async handleImport () {
    const f = await file.select('.xlsx,.csv')
    const isCsv = f.name.toLowerCase().endsWith('.csv')
    const content = await file.toType(f, isCsv ? 'text' : 'arraybuffer')
    let data = []
    if (isCsv) {
      await window.DynamicLibs?.use('Papa')
      data = window.Papa.parse(content, { header: true }).data
    } else {
      await window.DynamicLibs?.use('XLSX')
      const workbook = window.XLSX.read(content, {})
      const sheets = Object.values(workbook.Sheets)
      data = XLSX.utils.sheet_to_json(sheets[0])
    }
    if (data.length > 0) {
      const labelPropDict = {}
      this.table.columns.forEach(col => labelPropDict[col.label] = col.prop)
      const labels = Object.keys(data[0])
      data = data.map(row => {
        const ele = {}
        labels.forEach(label => ele[labelPropDict[label]] = row[label])
        return ele
      })
    }
    data = this.processImportingData(data)
    await this.dbTable.func(['bulkCreate', data])
    Message.s('导入成功')
    this.handleSearch()
  }

  async handleMultiDelete () {
    const { selection } = this.table
    if (!selection.length) {
      Message.w('尚未选择要删除的数据')
      return
    }
    const ok = await Confirm.w({ title: '警告', message: `确定删除选中的 ${selection.length} 条数据吗？` })
    if (!ok) return
    const ids = selection.map(ele => ele[this.idField])
    await this.dbTable.func(['destroy', {
      where: {
        [this.idField]: {
          '[Op.in]': ids
        }
      }
    }])
    this.handleSearch()
  }

  async handleSave (form) {
    form = form instanceof Event ? this.form : form
    if (this._isSubmitting) return
    const formRef = this.model.formRef || this.dialog.formRef
    if (!(await this._validateForm(formRef))) return
    this._isSubmitting = true
    const params = this.getAddParams(form)
    if (!(await this._checkAllNone(params))) {
      this._isSubmitting = false
      return
    }
    let data = null
    try {
      if (form[this.idField]) {
        data = await this.update(params, form[this.idField])
      } else {
        data = await this.add(params)
      }
    } catch (err) {
      this._showError(err.data.err)
      this._isSubmitting = false
      return
    }
    this._isSubmitting = false
    if (!data.err) Message.s('保存成功')
    this.router.go(-1)
    return data
  }

  async handleSubmit (params) {
    params = params instanceof Event ? null : params
    if (this._isSubmitting || !this.dialog.visible) return false
    this._isSubmitting = true
    const form = params || this.form
    if (!params) {
      const shouldTrim = this.dialog.shouldTrim || true
      if (shouldTrim) {
        this._trimForm()
      }
      if (!(await this._validateForm())) {
        this._isSubmitting = false
        return false
      }
    }
    let data = null
    try {
      if (this.dialog.isEditing) {
        const params = this.getUpdateParams(form)
        if (!(await this._checkAllNone(params))) {
          this._isSubmitting = false
          return false
        }
        data = await this.update(params, this.dialog.editingRow[this.idField])
      } else {
        const params = this.getAddParams(form)
        if (!(await this._checkAllNone(params))) {
          this._isSubmitting = false
          return false
        }
        data = await this.add(params)
      }
    } catch (err) {
      this._showError(err.data.err)
      this._isSubmitting = false
      return false
    }
    this.dialog.visible = false
    this._isSubmitting = false

    if (!data.err) {
      this.handleSearch()
    }
    this.afterSubmit(data)
    return data
  }

  handleCancel () {
    this.dialog.visible = false
  }

  handleSortChange (params) {
    if (!params) {
      this.table.query.order = []
    } else if (Array.isArray(params)) {
      this.table.query.order = params
    } else {
      const { prop, order } = params
      this.table.query.order = (!prop || !order) ? [] : [
        [prop, order.slice(0, -6)]
      ]
    }
    this.handleSearch()
  }

  async handleLoad () {
    const { query } = this.table
    if (!this.table.list.length) {
      await this.handleSearch()
      if (query.page * query.limit >= this.table.total) {
        this.table.finished = true
      }
      return this.table.moreLoading = false
    }
    const { loading, total } = this.table
    if (loading || !total || this.table.finished) {
      return this.table.moreLoading = false
    }
    if (query.page * query.limit >= total) {
      this.table.moreLoading = false
      return this.table.finished = true
    }
    this.table.isInfinite = true
    this.table.loading = true
    query.page ++
    const list = this.table.list.slice()
    await this.handleSearch({}, { isInfinite: true })
    this.table.loading = true
    await this.$sleep(50)
    this.table.list = list.concat(this.table.list)
    this.table.loading = false
    this.table.moreLoading = false
  }

  get (id) {
    return this.dbTable.get(id)
  }

  search (params) {
    this._lastSearchParams = JSON.stringify(params)
    return this.dbTable.search(params)
  }

  add (params) {
    return this.dbTable.add(params)
  }

  update (params, id) {
    return this.dbTable.update(id, params)
  }

  remove (params, row) {
    return this.dbTable.remove(params[this.idField])
  }

  getSearchParams (params) {
    if (params?.page) this.table.query.page = params.page
    if (params?.limit) this.table.query.limit = params.limit
    return Object.assign({}, JSON.parse(this._lastSearchParams), this.table.query, params)
  }

  getAddParams (params) {
    const fields = Object.keys(this.dialog.initialForm)
    const data = {}
    if (!fields.length) {
      Object.assign(data, params)
    } else {
      fields.forEach(field => data[field] = params[field])
    }
    this.dialog.formItems.forEach(item => {
      let value = data[item.model || item.prop]
      if (item.type === 'number') {
        value = this.uiUtils.formatPrecision(value, item.precision || 3) * 1
      } else if (item.comp === 'ElDatePicker') {
        if (item.type === 'datetime') {
          value = dates.format(value)
        } else if (!item.type || item.type === 'date') {
          value = dates.format(value, '', false)
        }
      }
      data[item.model || item.prop] = value
    })
    return data
  }

  getUpdateParams (params) {
    return this.getAddParams(params)
  }

  getDeleteParams (row) {
    return {
      [this.idField]: row[this.idField]
    }
  }

  getSearchExportParams () {
    return Object.assign({}, this.getSearchParams(), {
      page: 1,
      limit: - 1,
      attributes: this.processExportingColumns(this.table.ref._visibleColumns, 'search').map(col => col.prop)
    })
  }

  beforeSearch (params) { return true }

  beforeAdd () { return true }

  beforeEdit ({ $index, row }) { return true }

  beforeDelete ({ $index, row }) { return true }

  afterSearch (list, params, data) {
    const stringify = JSON.stringify(params)
    if (this.table.query.count === false && this.table.needCount) {
      if (stringify !== this._lastSearchParams) {
        const { page, limit, order, count, ...others } = params
        this.dbTable.func(['count', others]).then(data => this.table.total = data.data)
      }
    }
    return list
  }

  afterAdd () { }

  afterEdit ({ $index, row }) { }

  afterDelete (data) { }

  afterSubmit (data) { }

  async updatePartials ({ row }, fields = []) {
    if (!fields.length) return
    this.table.loading = true
    const partials = {}
    fields.forEach(f => partials[f] = row[f])
    await this.update(partials, row[this.idField])
    this.table.loading = false
  }

  _defaultFormatList (list, res) {
    const { columns, query } = this.table
    const { page, limit } = query
    list.forEach((ele, index) => {
      ele._idx = index + 1
      ele._index = (page - 1) * limit + index + 1
    })
    columns.forEach(col => {
      let { prop, options } = col
      const { format, formatter, autoFill } = col.tableAttrs || {}
      const { modelName } = col.formAttrs || {}
      if (modelName && autoFill) {
        list.forEach(ele => ele[`_formatted_${prop}`] = '')
        this._fillRelatedField(list, col)
      } else {
        if (Array.isArray(options) && format !== false) {
          const update = (newVal, oldVal) => {
            const rows = oldVal ? this.table.list : list
            const kvMap = makeOptionsKvMap(col)
            rows.forEach((ele, index) => {
              const value = ele[prop]
              ele[`_formatted_${prop}`] = kvMap[value] || formatter?.(value, ele, index) || value
            })
          }
          const un = watch(() => col.options, update, { immediate: true, deep: true })
          this._unwatchs.push(un)
        }
      }
    })
    return list
  }

  async _fillRelatedField (list, column) {
    const ids = [...new Set(list.map(ele => ele[column.prop]))]
    if (!ids.length) return
    const { modelName, text, value } = column.formAttrs
    const data = await this.service.restful.search(modelName, {
      limit: -1,
      attributes: [text, value],
      where: {
        [value]: {
          '[Op.in]': ids
        }
      }
    })
    if (!data.data.length) return
    const dict = highdict.mapField(data.data, value, text)
    this.table.list.forEach(ele => {
      ele[`_formatted_${column.prop}`] = dict[ele[column.prop]]
    })
  }

  formatList (list, res) {
    return list
  }

  processExportingColumns (columns, mode = 'current') {
    return columns.filter(col => {
      return !['index', 'selection', 'expand', 'radio', '_index'].includes(col.type)
    }).filter(col => !col.virtual)
  }

  processExportingData (data, mode = 'current') {
    if (!data.length) return data
    const dict = {}
    this.table.ref._visibleColumns.forEach(it => {
      let { formatter = it.formatter, tagValues = it.tagValues } = it.tableAttrs || {}
      if (!formatter && typeof tagValues === 'function') formatter = tagValues
      dict[it.prop] = { formatter, tagValues }
    })
    const keys = Object.keys(data[0])
    data.forEach(ele => {
      keys.forEach(key => {
        const value = ele[key]
        if (ele.hasOwnProperty('_formatted_' + key)) return ele[key] = ele['_formatted_' + key]
        if (dict[key]?.formatter) return ele[key] = dict[key].formatter(value)
        if (dict[key]?.tagValues) return ele[key] = dict[key].tagValues[value]
        if (typeof value === 'boolean') {
          ele[key] = value && 1 || 0
        } else if (value instanceof Date) {
          ele[key] = dates.format(value)
          if (ele[key].endsWith(' 00:00:00')) {
            ele[key] = ele[key].slice(0, -9)
          }
        } else if (typeof value === 'object') {
          ele[key] = JSON.stringify(value)
        }
      })
    })
    return data
  }

  processExporting (options) { return options }

  processImportingData (data) {
    data.forEach(ele => {
      delete ele[this.idField]
      delete ele._index
    })
    return data
  }

  _resetForm (host = this.dialog) {
    host.form = JSON.parse(JSON.stringify(host.initialForm))
  }

  _trimForm () {
    const { form } = this.dialog
    const trimed = {}
    Object.keys(form).forEach(key => {
      if (form[key] == null) {
        trimed[key] = ''
      } else if (form[key].trim) {
        trimed[key] = form[key].trim()
      }
    })
    Object.assign(form, trimed)
  }

  _validateForm (formRef) {
    const ref = formRef || this.dialog.formRef
    if (ref) {
      return new Promise(resolve => {
        if (this._isMobile) {
          ref.validate().then(() => resolve(true)).catch(() => resolve(false))
        } else {
          ref.validate((ok) => resolve(ok)).catch(() => resolve(false))
        }
      })
    }
    return true
  }

  _clearValidate (ref = this.dialog.formRef) {
    if (ref) {
      this._isMobile ? ref.resetValidation() : ref.clearValidate()
    }
  }

  async _checkAllNone (data) {
    const nones = [null, undefined, '']
    const hasValid = Object.values(data).some(v => !nones.includes(v))
    if (hasValid) return true
    return Confirm.w({ message: '表单所有数据都是空，确定要继续提交吗？', title: '警告' })
  }

  _showError (err) {
    Message(typeof err === 'object' ? (err.message || err.err || err.toString()) : err)
  }

  get _isMobile () {
    const ref = this.table?.formRef || this.dialog?.formRef
    if (ref) {
      return ref.$.attrs.class.indexOf('mobile') >= 0
    }
    return window.isMobile
  }

  onSearch (...props) { return this.handleSearch(...props) }
  onAdd (...props) { return this.handleAdd(...props) }
  onEdit (...props) { return this.handleEdit(...props) }
  onDelete (...props) { return this.handleDelete(...props) }
  onSubmit (...props) { return this.handleSubmit(...props) }
  onCancel (...props) { return this.handleCancel(...props) }
  onRowEdit (...props) { return this.handleRowEdit(...props) }
  onCancelEdit (...props) { return this.handleCancelEdit(...props) }
  onExport (...props) { return this.handleExport(...props) }
  onSearchExport (...props) { return this.handleSearchExport(...props) }
  onImport (...props) { return this.handleImport(...props) }
  onMultiDelete (...props) { return this.handleMultiDelete(...props) }
}

const makeOptionsKvMap = (field) => {
  const { options, formAttrs = {} } = field
  const { text = 'text', value = 'value' } = formAttrs
  const kvMap = {}
  if (options && typeof options === 'object' && typeof options[0] === 'object') {
    options.forEach(op => {
      kvMap[op[value]] = op[text]
    })
  }
  return kvMap
}

export default CrudController
