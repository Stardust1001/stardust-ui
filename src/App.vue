<script setup>
import { reactive } from 'vue'
import { areaList } from '@vant/area-data'

import { baseTable, baseForm } from '../packages/utils/model.js'

const model = reactive({
  table: {
    ...baseTable(),
    list: [
      { name: '卡卡', gender: '男', age: 27 },
      { name: '娜娜', gender: '女', age: 25 },
    ],
    columns: [
      { label: '姓名', prop: 'name', minWidth: 100 },
      { label: '性别', prop: 'gender', comp: 'XSelect', options: ['男', '女'], minWidth: 100 },
      { label: '年龄', prop: 'age', minWidth: 100 },
      {
        label: '出生日期',
        prop: 'birthday',
        minWidth: 100,
        formAttrs: { comp: 'ElDatePicker' },
      },
    ]
  },
  form: {
    ...baseForm(),
    district: '',
    form: {},
    formItems: [
      { label: '姓名', prop: 'name' },
      { label: '性别', prop: 'gender', comp: 'XSelect', options: ['男', '女'] },
      { label: '年龄', prop: 'age', comp: 'ElInputNumber' },
      { label: '插槽', prop: 'slot', slot: 'slot' }
    ].map(e => ({ span: 8, ...e }))
  }
})

const others = reactive({
  files: [
    { name: '1', url: 'https://www.baidu.com/favicon.ico' },
    { name: '2', url: 'https://www.apple.com.cn/favicon.ico' }
  ]
})

const controller = {
  handleSearch () {

  },
  handleAdd () {

  },
  handleEdit () {

  }
}
</script>

<template>
  <div style="padding: 10px;">
    <el-button type="warning">haha</el-button>
    <x-row :gutter="20">
      <x-col :span="8">1</x-col>
      <x-col :span="8">2</x-col>
      <x-col :span="8">3</x-col>
    </x-row>
    <br>
    <br>
    <x-district-select v-model="model.form.district" :area-list="areaList" />
    <br>
    <x-table
      :table="model.table"
      :controller="controller"
      listen="search,add,edit,export,search-export"
    ></x-table>
    <br>
    <pc-x-form label-width="40px" :form="model.form">
      <template #slot>
        this is 插槽
      </template>
    </pc-x-form>
    <x-image-uploader v-model="others.files" multiple />
  </div>
</template>
