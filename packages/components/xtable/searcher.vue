<script>
import render, { OPS, COMPONENT_OPS } from './searcher.jsx'
import { Message } from '../../utils/index.js'

const { storage } = StardustBrowser
const { deepCopy } = StardustJs.funcs

export default {
  name: 'Searcher',
  props: {
    uid: String,
    columns: Array,
    config: Object
  },
  emits: ['search'],
  data () {
    return {
      visible: false,
      conditionNo: 1,
      conditions: [],
      expression: ''
    }
  },
  computed: {
    key () {
      return `Searcher[${this.uid}]`
    }
  },
  created () {
    this.init()
  },
  render,
  methods: {
    init () {
      const config = this.uid && storage.local.getJson(this.key, this.config) || this.config
      this.initConfig(deepCopy(config))
    },
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    saveCache () {
      storage.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map(con => {
          const { item, ops, component, ...others } = con
          return others
        }),
        expression: this.expression
      })
    },
    initConfig (config) {
      config.conditions?.forEach(con => {
        const { prop, op, value, universal } = con
        con.item = this.columns.find(col => col.prop === prop)
        this.handleSelectField(con, prop)
        this.handleSelectOp(con, op)
        con.value = value
        con.ops = COMPONENT_OPS[universal ? 'universal' : con.component].map(key => OPS[key])
      })
      if (!config.conditionNo && config.conditions?.length) {
        config.conditionNo = Math.max.apply(null, config.conditions.map(con => con.no)) + 1
      }
      Object.assign(this, config)
    },
    handleSearch () {
      let params = null
      try {
        params = this.calcParams()
      } catch (err) {
        Message.w(err.toString())
        return
      }
      this.uid && params && this.saveCache()
      params = params || { where: {} }
      params.page = 1
      this.$emit('search', params)
      this.visible = false
    },
    handleReset () {
      storage.local.remove(this.key)
      Object.assign(this, {
        conditionNo: 1,
        conditions: [],
        expression: ''
      })
      this.init()
    },
    calcParams () {
      const tree = this.calcTree()
      if (!tree) return
      const parse = (tree, where) => {
        const branch = []
        const type = '[Op.' + tree.type + ']'
        where[type] = branch
        for (let item of tree.items) {
          if (typeof item === 'string') {
            const condition = this.conditions.find(con => con.no === item * 1)
            if (!condition) {
              throw '条件不存在: ' + item
            } else {
              if (!this.checkFilled(condition)) {
                if (this.config.traditional || this.config.ignoreUnfilled) continue
                throw '条件不完整: ' + item
              }
            }
            branch.push(this.parseCondition(condition))
          } else {
            const sub = {}
            branch.push(sub)
            parse(item, sub)
          }
        }
        if (!branch.length) delete where[type]
      }
      const where = {}
      parse(tree, where)
      return { where }
    },
    calcTree () {
      const expression = this.expression.trim().replaceAll('&&', 'and').replaceAll('||', 'or')
      if (!expression) return null
      const symbols = expression.split(/(\(|\)|\s)/).filter(p => p.trim())

      const calc = (tree, symbols) => {
        while (symbols.length) {
          const ele = symbols.shift()
          if (['and', 'or'].includes(ele)) {
            if (tree.type && tree.type !== ele) {
              throw '串联不同逻辑表达式请使用小括号区分'
            }
            tree.type = ele
          } else if (ele === '(') {
            const item = { type: '', items: [] }
            tree.items.push(item)
            item._parent = tree
            calc(item, symbols)
            break
          } else if (ele === ')') {
            calc(tree._parent, symbols)
            delete tree._parent
          } else {
            tree.items.push(ele)
          } 
        }
      }
      const tree = { type: '', items: [] }
      calc(tree, symbols)
      tree.type = tree.type || 'and'

      return tree
    },
    parseCondition (condition) {
      let { item, component, prop, op, value } = condition
      const where = {}
      if (op === 'special') {
        const isNot = value.startsWith('NOT_')
        const isNe = value.startsWith('NE_')
        if (value.includes('NULL')) {
          value = null
        } else if (value.includes('BLANK')) {
          value = ''
        }
        if (isNot) {
          value = { '[Op.not]': value }
        } else if (isNe) {
          value = { '[Op.ne]': value }
        }
        where[prop] = value
        return where
      }
      if (op === 'like' || op === 'notLike') {
        value = '%' + value + '%'
      }
      if (op === 'in' || op === 'notIn') {
        if (!item.options) {
          value = value.split(',')
          if (component === 'ElInputNumber' || component === 'el-input-number' || condition.type === 'number') {
            value = value.map(Number)
          }
        }
      }
      where[prop] = { [`[Op.${op}]`]: value }
      return where
    },
    checkFilled (condition) {
      if (!condition.prop || !condition.op) {
        return false
      }
      const value = Array.isArray(condition.value) ? condition.value : [condition.value]
      return value.length && value.every(ele => {
        return typeof ele !== 'string' || ele.length
      })
    },
    handleAdd () {
      this.conditions.push({
        no: this.conditionNo ++,
        prop: '',
        op: '',
        value: '',
        component: 'ElInput',
        ops: [],
        item: {}
      })
    },
    handleDelete (index) {
      this.conditions.splice(index, 1)
    },
    handleSelectField (condition, value) {
      condition.value = ''
      condition.prop = value
      condition.item = this.columns.find(col => col.prop === condition.prop)
      const { options, type, formAttrs = {} } = condition.item
      const config = { ...condition.item, ...formAttrs }
      const {
        comp, universal,
        visible, canAdd, canEdit, required, slot, span,
        tableAttrs, formAttrs: fa, tagTypes, tagValues, width, minWidth,
        disabled, readonly,
        ...others
      } = config
      others.clearable ??= true
      condition.config = others
      condition.component = comp ||
        options && 'XSelect' ||
        type === 'number' && 'ElInputNumber' ||
        'ElInput'
      condition.ops = COMPONENT_OPS[universal ? 'universal' : condition.component].map(key => OPS[key])
      condition.op = condition.ops[0].value
      if (condition.component === 'ElDatePicker') {
        condition.component = 'ElInput'
        others.type = 'date'
      }
      if (others.type === 'textarea') delete others.type
    },
    handleSelectOp (condition, value) {
      condition.op = value
      if (value === 'between') {
        condition.value = ['', '']
      } else if (['in', 'notIn'].includes(value)) {
        condition.value = []
      }
      if (
        value === 'special'
        || !['between', 'in', 'notIn'].includes(value) && Array.isArray(value)
      ) {
        condition.value = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.searcher {
  .conditions {
    margin: 10px 0;
    max-height: 60vh;
    overflow-y: auto;
    border-top: 1px solid #d0dddd;
  }
  .condition {
    border: 1px solid #d0dddd;
    border-top: 0;
    padding: 7px;
  }
  .el-tag {
    cursor: pointer;
    flex: 1;
  }
  .title {
    margin: 0 10px;
    flex: 1;
  }
  .expression {
    flex: 30;
    display: grid;
    grid-template-columns: 27% 19% 50%;
    column-gap: 10px;
    & > * {
      width: 100%;
    }
    :deep(.value-container) > * {
      width: 100%;
    }
  }
  .col-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    position: relative;
    &::after {
      content: '-';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
:deep(.col-2) > * {
  width: 100% !important;
}
.mobile-x-dialog .expression {
  display: block;
  & > * {
    margin: 3px 0;
  }
}
</style>
