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
  { text: '非空文本', value: 'NE_BLANK' },
]

export const COMPONENT_OPS = {
  'XSelect': ['eq', 'ne', 'in', 'notIn', 'special'],
  'XRadios': ['eq', 'ne', 'special'],
  'XCheckboxs': ['eq', 'ne', 'in', 'notIn', 'special'],
  'ElDatePicker': ['eq', 'gt', 'gte', 'lt', 'lte', 'between', 'in', 'notIn', 'special'],
  'ElInputNumber': ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'between', 'in', 'notIn', 'special'],
  'ElInput': ['eq', 'ne', 'like', 'notLike', 'between', 'in', 'notIn', 'special'],
  'universal': ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'like', 'notIn', 'notLike', 'between', 'special']
}
COMPONENT_OPS['x-select'] = COMPONENT_OPS['XSelect']
COMPONENT_OPS['XSelectV2'] = COMPONENT_OPS['XSelect']
COMPONENT_OPS['x-select-v2'] = COMPONENT_OPS['XSelect']
COMPONENT_OPS['x-radios'] = COMPONENT_OPS['XRadios']
COMPONENT_OPS['x-checkboxs'] = COMPONENT_OPS['XCheckboxs']
COMPONENT_OPS['el-date-picker'] = COMPONENT_OPS['ElDatePicker']
COMPONENT_OPS['el-input-number'] = COMPONENT_OPS['ElInputNumber']
COMPONENT_OPS['el-input'] = COMPONENT_OPS['ElInput']

export default function () {
  const size = window.isMobile ? 'small' : ''
  const {
    $attrs, config, columns, visible, conditions, expression,
    handleSearch, handleReset, handleAdd, handleDelete, handleSelectField, handleSelectOp
  } = this
  return (
    <x-dialog
      append-to-body
      drawer
      width="700px"
      title={$attrs.title || '自定义查询'}
      class="searcher"
      cancel-text="重置"
      submit-text={$attrs['submit-text'] || '查询'}
      {...{
        modelValue: visible,
        'onUpdate:modelValue': value => this.visible = value,
        onCancel: handleReset,
        onSubmit: handleSearch
      }}
    >
      {
        config.traditional
        ? null
        : <x-button type="primary" size={size} icon="plus" onClick={handleAdd}>新增条件</x-button>
      }
      <div class="conditions">
        {
          conditions.map((condition, index) => {
            return (
              <div class="condition flex-center" key={condition.no}>
                {
                  config.traditional
                  ? null
                  : <el-button
                    type="danger"
                    size={size}
                    plain
                    onClick={() => handleDelete(index)}
                  >
                    X
                  </el-button>
                }
                {
                  config.traditional
                  ? null
                  : <span class="title">{condition.no}</span>
                }
                <div class="expression">
                  {
                    config.traditional
                    ? <el-input modelValue={condition.item.label} readonly />
                    : <pc-x-select
                      modelValue={condition.prop}
                      onChange={value => handleSelectField(condition, value)}
                      options={columns}
                      text="label"
                      value="prop"
                    ></pc-x-select>
                  }
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
      {
        config.traditional ? null : <el-input
          type="textarea"
          autosize={{ minRows: 3, maxRows: 10 }}
          placeholder="分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
          {...{
            modelValue: expression,
            'onUpdate:modelValue': value => this.expression = value
          }}
        ></el-input>
      }
    </x-dialog>
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
          'onUpdate:modelValue': (value) => condition.value = value,
          onKeyup: e => {
            if (e.key === 'Enter') vm.handleSearch()
          }
        },
        options
      )
    )
  }
  const options = { multiple: false }
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
    if (!condition.item.options) {
      options.placeholder = '可以填写多项，用英文逗号分割'
    }
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
