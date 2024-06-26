
export const baseForm = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: true,
  viewonly: false
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
  moreLoading: false,
  finished: false,
  isInfinite: false,
  list: [],
  columns: [],
  tableRef: null,
  selection: [],
  checked: null,
  searchFields: [],
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

export const baseModel = ({
  table = {},
  dialog = {},
  columns = [
    { fixed: 'left', type: 'selection' },
    { type: '_index' }
  ],
  query = {},
  form = {}
} = {}) => ({
  table: {
    ...baseTable(query),
    ...table,
    columns
  },
  dialog: {
    ...baseDialog(),
    ...dialog,
    form
  }
})

export default {
  baseForm,
  baseTable,
  baseDialog,
  baseModel
}
