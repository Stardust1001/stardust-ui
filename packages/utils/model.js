
export const baseForm = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: true
})

export const baseTable = (query = {}) => ({
  loading: false,
  query: {
    page: 1,
    limit: 10,
    order: [],
    ...query
  },
  total: 0,
  list: [],
  columns: [],
  tableRef: null,
  selection: [],
  checked: null,
  _isBaseTable: true
})

export const baseDialog = () => ({
  ...baseForm(),
  visible: false,
  isEditing: false,
  editingIndex: '',
  editingRow: {},
  _isBaseDialog: true
})

export const baseModel = () => ({
  table: baseTable(),
  dialog: baseDialog()
})

export default {
  baseForm,
  baseTable,
  baseDialog,
  baseModel
}
