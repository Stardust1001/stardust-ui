import { h, resolveComponent } from 'vue'

export const OPS = {
  eq: { text: '等于', value: 'eq' },
  ne: { text: '不等于', value: 'ne' },
  gt: { text: '大于', value: 'gt' },
  gte: { text: '大于等于', value: 'gte' },
  lt: { text: '小于', value: 'lt' },
  lte: { text: '小于等于', value: 'lte' },
  'in': { text: '包含', value: 'in' },
  like: { text: '模糊匹配', value: 'like' },
  notIn: { text: '不包含', value: 'notIn' },
  notLike: { text: '模糊不匹配', value: 'notLike' },
  between: { text: '介于', value: 'between' },
  special: { text: '特殊值', value: 'special' }
}

export const SPECIAL_OPTIONS = [
  { text: 'NULL', value: 'NULL' },
  { text: '空文本', value: 'BLANK' },
  { text: '非NULL', value: 'NOT_NULL' },
  { text: '非空文本', value: 'NOT_BLANK' },
]

export const COMPONENT_OPS = {
  'XSelect': ['eq', 'ne', 'in', 'notIn', 'special'],
  'ElDatePicker': ['eq', 'gt', 'gte', 'lt', 'lte', 'between', 'special'],
  'ElInputNumber': ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'between', 'special'],
  'ElInput': ['eq', 'ne', 'like', 'notLike', 'between', 'special']
}
COMPONENT_OPS['x-select'] = COMPONENT_OPS['XSelect']
COMPONENT_OPS['el-date-picker'] = COMPONENT_OPS['ElDatePicker']
COMPONENT_OPS['el-input-number'] = COMPONENT_OPS['ElInputNumber']
COMPONENT_OPS['el-input'] = COMPONENT_OPS['ElInput']

export default function () {
  const {
    columns, visible, conditions, expression,
    handleSearch, handleReset, handleAdd, handleDelete, handleSelectField, handleSelectOp
  } = this
  return (
    <pc-x-dialog
      append-to-body
      drawer
      width="700px"
      title="自定义查询"
      class="searcher"
      cancel-text="重置"
      submit-text="查询"
      {...{
        modelValue: visible,
        'onUpdate:modelValue': value => this.visible = value,
        onCancel: handleReset,
        onSubmit: handleSearch
      }}
    >
      <el-button type="primary" icon="plus" onClick={handleAdd}>新增条件</el-button>
      <div class="conditions">
        {
          conditions.map((condition, index) => {
            return (
              <div class="condition flex-center" key={condition.no}>
                <el-button
                  type="danger"
                  size="small"
                  plain
                  onClick={() => handleDelete(index)}
                >
                  X
                </el-button>
                <span class="title">{condition.no}</span>
                <div class="expression">
                  <pc-x-select
                    modelValue={condition.prop}
                    onChange={value => handleSelectField(condition, value)}
                    options={columns}
                    text="label"
                    value="prop"
                  ></pc-x-select>
                  <pc-x-select
                    modelValue={condition.op}
                    onChange={value => handleSelectOp(condition, value)}
                    options={condition.ops}
                  />
                  <div class="value-container">
                    {calcConditionValueComponent(this, condition)}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <el-input
        type="textarea"
        autosize={{ minRows: 3, maxRows: 10 }}
        placeholder="分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
        {...{
          modelValue: expression,
          'onUpdate:modelValue': value => this.expression = value
        }}
      ></el-input>
    </pc-x-dialog>
  )
}

function calcConditionValueComponent (vm, condition) {
  const component = (options) => {
    return h(
      resolveComponent(options?.component || condition.component),
      Object.assign(
        {},
        condition.config,
        {
          modelValue: condition.value,
          'onUpdate:modelValue': (value) => condition.value = value
        },
        options
      )
    )
  }
  const options = { multiple: false, 'collapse-tags': true }
  if (condition.op === 'between') {
    return <div class="col-2">
      {
        component({
          ...options,
          modelValue: condition.value[0],
          'onUpdate:modelValue': (value) => condition.value[0] = value
        })
      }
      {
        component({
          ...options,
          modelValue: condition.value[1],
          'onUpdate:modelValue': (value) => condition.value[1] = value
        })
      }
    </div>
  } else if (['in', 'notIn'].includes(condition.op)) {
    options.multiple = true
    return component(options)
  } else if (condition.op === 'special') {
    return component({
      ...options,
      component: 'x-select',
      placeholder: '请选择特殊值',
      options: SPECIAL_OPTIONS
    })
  }
  return component()
}
