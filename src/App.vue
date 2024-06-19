<script setup>
import { reactive } from 'vue'

import { baseTable, baseForm } from '../packages/utils/model.js'

const table = {
  ...baseTable(),
  columns: [
    { label: '水果', prop: 'fruit' },
    { label: '年份', prop: 'year' },
    { label: '价格', prop: 'price' }
  ],
  list: [
    { fruit: '苹果', year: 2015, price: 43.3 },
    { fruit: '苹果', year: 2016, price: 85.8 },
    { fruit: '苹果', year: 2017, price: 93.7 },
    { fruit: '葡萄', year: 2015, price: 83.1 },
    { fruit: '葡萄', year: 2016, price: 73.4 },
    { fruit: '葡萄', year: 2017, price: 55.1 },
    { fruit: '西瓜', year: 2015, price: 86.4 },
    { fruit: '西瓜', year: 2016, price: 65.2 },
    { fruit: '西瓜', year: 2017, price: 82.5 },
    { fruit: '香蕉', year: 2015, price: 72.4 },
    { fruit: '香蕉', year: 2016, price: 53.9 },
    { fruit: '香蕉', year: 2017, price: 39.1 },
  ]
}

const model = reactive({
  richtext: '',
  form: {
    ...baseForm(),
    formItems: [
      { label: '姓名', prop: 'name', required: true, directives: { domid: 'name' }, viewonly: false },
      { label: '年龄', prop: 'age', comp: 'ElInputNumber', min: 1, required: true },
      {
        label: '教育经历', prop: 'educations', comp: 'x-array', required: true,
        items: [
          { label: '学校', prop: 'school' },
          { label: '开始时间', prop: 'start', comp: 'ElDatePicker', type: 'month', 'value-format': 'YYYY-MM' },
          { label: '结束时间', prop: 'end', comp: 'ElDatePicker', type: 'month', 'value-format': 'YYYY-MM' },
        ].map(ele => ({ ...ele, required: true }))
      },
      {
        label: '其他', prop: 'others', comp: 'x-dict',
        items: [
          { label: '座右铭', prop: 'motto' },
          { label: '备注', prop: 'remark' },
        ]
      }
    ].map(ele => {
      const { span = 12, xs = 24 } = ele
      return Object.assign(ele, { span, xs })
    }),
    form: {
      name: 'Stardust',
      educations: [
        { school: '11', start: '2024-05', end: '2024-06' },
        { school: '22', start: '2024-06', end: '2024-07' }
      ]
    }
  }
})

const controller = {
  handleSubmit () {
    model.form.formRef.validate()
  }
}
window.model = model
</script>

<template>
  <div style="padding: 10px;">
    <x-form :form="model.form" :gutter="10" label-width="100px"></x-form>
    <el-button type="primary" @click="controller.handleSubmit">提交</el-button>
    <x-table :table :controller hide-operates></x-table>
  </div>
</template>
