<script setup>
import { reactive } from 'vue'
import { areaList } from '@vant/area-data'

import { baseTable, baseForm } from '../packages/utils/model.js'

const model = reactive({
  table: {
    ...baseTable(),
    searcherConfig: {
      conditions: [
        { no: 1, prop: 'name', op: 'like', value: '', universal: true },
        { no: 2, prop: 'gender', op: 'eq', value: '' },
      ],
      expression: '1 2',
      ignoreUnfilled: true,
      traditional: true
    },
    list: [
      { name: '卡卡', gender: '男', age: 27, avatar: ['https://www.baidu.com/favicon.ico'] },
      { name: '娜娜', gender: '女', age: 25, avatar: 'https://im.qq.com/favicon.ico' },
    ],
    columns: [
      {
        label: '头像',
        prop: 'avatar',
        minWidth: 100,
        block: 'base',
        tableAttrs: { slot: '$image' }
      },
      { label: '姓名', prop: 'name', minWidth: 100, block: 'base', universal: true },
      {
        label: '性别',
        prop: 'gender',
        comp: 'x-select',
        options: ['男', '女'],
        minWidth: 100,
        block: 'base',
        slot: '$tag',
        tagTypes: {
          '男': 'success',
          '女': 'danger'
        },
        tagValues (v) {
          return v === '男' ? 'Boy' : 'Girl'
        }
      },
      { label: '年龄', prop: 'age', minWidth: 100, block: 'base' },
      {
        label: '出生日期',
        prop: 'birthday',
        minWidth: 100,
        formAttrs: { comp: 'ElDatePicker' },
        block: 'others'
      },
    ],
    chartOption: {
      remote: true,
      grid: { left: 30 }
    }
  },
  form: {
    ...baseForm(),
    district: '',
    form: {},
    formItems: [
      { label: '姓名-age', prop: 'name', 'label-width': '40px', span: 16, xs: 24 },
      { label: '性别', prop: 'gender', comp: 'x-select', options: ['男', '女'] },
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
  handleKeywordsSearch () {

  },
  handleSearch () {

  },
  handleAdd () {

  },
  handleEdit () {

  },
  handleDelete () {

  }
}
</script>

<template>
  <div style="padding: 10px;">
    <el-button type="warning">haha</el-button>
    <x-scan v-model="model.form.scan"></x-scan>
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
      operates-width="100"
      operates-dropdown
      listen="keywords-search,search,add,edit,export,search-export,delete"
    ></x-table>
    <br>
    <x-form label-width="40px" :gutter="5" :form="model.form">
      <template #slot>
        this is 插槽
      </template>
    </x-form>
    <x-image-uploader v-model="others.files" :limit="3" />
    <x-info :data="model.form" :fields="model.table.columns"></x-info>
  </div>
</template>
