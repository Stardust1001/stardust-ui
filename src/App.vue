<script setup>
import { reactive } from 'vue'

import { baseTable, baseForm } from '../packages/utils/model.js'

const model = reactive({
  form: {
    ...baseForm(),
    formItems: [
      {
        label: '姓名', prop: 'name', required: true
      },
      {
        label: '年龄', prop: 'age', comp: 'ElInputNumber', min: 1, required: true,
      },
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
    ],
    form: {
      educations: [
        { school: '11', start: '2024-05', end: '2024-06' },
        { school: '22', start: '2024-06', end: '2024-07' }
      ]
    }
  }
})

const controller = {
  handleSubmit () {
    window.model = model
    model.form.formRef.validate()
  }
}
</script>

<template>
  <div style="padding: 10px;">
    <x-form :form="model.form" label-width="100px">

    </x-form>
    <el-button type="primary" @click="controller.handleSubmit">提交</el-button>
  </div>
</template>
