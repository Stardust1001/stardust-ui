<script>
import { baseDialog } from '../../utils/model.js'
import utils from './utils.js'
import { TYPES, FORMATTERS, SORTS } from './constants.js'
const { StardustEcharts } = StardustBrowser
window.echarts.registerTransform(StardustEcharts.grouping)

export default {
  name: 'XChart',
  props: {
    ...utils.props
  },
  data () {
    return {
      zoom: 1,
      loading: false,
      filterType: '分类',
      SORTS,
      dialog: {
        ...baseDialog(),
        formItems: utils.formItems,
        form: utils.form
      }
    }
  },
  computed: {
    ...utils.computed
  },
  watch: {
    option: {
      handler: 'update',
      immediate: true
    },
    zoomedHeight () {
      this.$nextTick(() => {
        this.chart?.resize()
      })
    },
    sidebarCollapse () {
      const duration = (this.$store.app.toggleDuration || 0) * 1000 + 50
      const interval = 50
      for (let i = 0; i < Math.ceil(duration / interval); i++) {
        setTimeout(this.chart.resize, interval * i)
      }
    }
  },
  mounted () {
    window.v = this
    this.init()
  },
  beforeUnmount () {
    document.removeEventListener('resize', this.update)
    this.timer && clearInterval(this.timer)
  },
  methods: {
    async init () {
      await window.DynamicLibs?.use('echarts')
      if (this.chart) this.$refs.el.removeAttribute('_echarts_instance_')
      this.chart = window.echarts.init(this.$refs.el)
      this.update()
      document.removeEventListener('resize', this.update)
      document.addEventListener('resize', this.update)
      if (this.updator) {
        this.timer = setInterval(this.updator.handler.bind(this), this.updator.interval || 1000)
      }
    },
    initDatasource () {
      if (!this.datasource) return
      const columns = this.datasource.columns.filter(col => !TYPES.includes(col.type)).map(col => {
        const column = { ...col }
        column.formatters = ['原样']
        if (col.comp === 'el-date-picker' || col.comp === 'ElDatePicker' || col.type === 'date') {
          column.formatters = Object.keys(FORMATTERS)
        }
        return column
      })
      this.dialog.formItems.slice(0, 3).forEach(it => it.options = columns)
      this.handleMakeChart()
    },
    handleCalcFormatters (item) {
      const value = this.dialog.form[item.prop]
      if (!value) return item.formatters = []
      item.formatters = item.options.find(op => op.prop === value).formatters
    },
    async handleMakeChart () {
      if (this.loading) return
      this.dialog.visible = false
      this.loading = true
      const rich = { ...this.dialog.form }
      if (!rich.filter?.category.isLimit) rich.filter.category.mergeOthers = false
      if (!rich.filter?.series.isLimit) rich.filter.series.mergeOthers = false
      let list = this.datasource.list
      if (this.datasource.search) {
        list = await this.datasource.search()
      }
      rich.data = list
      this.setRich(rich)
      this.loading = false
    },
    setRich (rich) {
      const { data, category, series, value, summary, chartType, filter, grid, fontSizes } = rich
      if (!series || !value) return
      const dimensions = this.datasource.columns.map(col => col.prop)
      const source = data.map(ele => dimensions.map(d => ele[d]))
      const params = {
        dimensions,
        source,
        category,
        series,
        value,
        summary,
        chartType
      }
      const opts = StardustEcharts.generateOptions(params)
      const option = {
        dataset: [
          { dimensions, source }
        ]
      }
      option.dataset = [option.dataset[0], ...opts.dataset]
      option.series = opts.series
      this.update(option)
    },
    update (opts = {}) {
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1)
      const option = {
        tooltip: {},
        toolbox: { feature: { saveAsImage: {} } },
        xAxis: { type: 'category' },
        yAxis: {},
        ...this.option,
        ...opts,
        grid: {
          left: 30, top: 40, right: 20, bottom: 20,
          ...this.option.grid,
          ...opts.grid
        },
        legend: {
          padding: [0, 60],
          ...opts.legend
        }
      }
      if (option.xAxis && !option.xAxis.axisLabel?.formatter) {
        option.xAxis.axisLabel ||= { fontSize: this.fontSizes[0] }
        option.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)
      }
      this.chart?.setOption(option, true)
    },
    labelSplitFormatter (limit) {
      return (text) => {
        if (text.length < limit) return text
        return Array.from({
          length: Math.ceil(text.length / limit)
        }).map((_, i) => text.slice(i * limit, (i + 1) * limit)).join('\n')
      }
    }
  }
}
</script>

<template>
  <div v-loading="loading" class="x-chart">
    <div class="chart" ref="el" />
    <div v-if="!!datasource" class="settings flex-center" @click="dialog.visible = true">
      配置
      <pc-x-icon name="Setting" />
    </div>
    <x-dialog
      v-model="dialog.visible" title="图表配置" drawer width="460" submit-text="生成图表" cancel-text="关闭"
      @submit="handleMakeChart"
      @cancel="dialog.visible = false"
    >
      <x-form :dialog>
        <template #selects-formatters="{ item }">
          <el-row :gutter="5" class="grid">
            <el-col :span="12">
              <x-select
                v-model="dialog.form[item.prop]" v-bind="item"
                @change="handleCalcFormatters(item)"
              />
            </el-col>
            <el-col :span="12">
              <x-select
                v-model="dialog.form[item.prop + '_formatter']" :options="item.formatters"
                placeholder="格式化方式"
              />
            </el-col>
          </el-row>
        </template>
        <template #grid>
          <el-row :gutter="5" class="grid">
            <el-col :span="12">
              <span>左</span>
              <el-input-number v-model="grid.left" />
            </el-col>
            <el-col :span="12">
              <span>上</span>
              <el-input-number v-model="grid.top" />
            </el-col>
            <el-col :span="12">
              <span>右</span>
              <el-input-number v-model="grid.right" />
            </el-col>
            <el-col :span="12">
              <span>下</span>
              <el-input-number v-model="grid.bottom" />
            </el-col>
          </el-row>
        </template>
        <template #filter>
          <label class="sorts flex-center">
            排序方式
            <x-radios v-model="dialog.form.sort" :options="SORTS" />
          </label>
          <el-tabs v-model="filterType">
            <el-tab-pane label="分类" name="分类">
              <el-checkbox v-model="category.isLimit">只使用前有限条记录</el-checkbox>
              <div v-show="category.isLimit">
                记录条数
                <el-input-number v-model="category.limit" :min="0" :precision="0" />
                <el-checkbox v-model="category.mergeOthers">合并剩余项为其他</el-checkbox>
              </div>
            </el-tab-pane>
            <el-tab-pane label="系列" name="系列">
              <el-checkbox v-model="series.isLimit">只使用前有限条记录</el-checkbox>
              <div v-show="series.isLimit">
                记录条数
                <el-input-number v-model="series.limit" :min="0" :precision="0" />
                <el-checkbox v-model="series.mergeOthers">合并剩余项为其他</el-checkbox>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
        <template #font-sizes>
          <el-row :gutter="5">
            <el-col :span="8">
              X轴
              <el-input-number v-model="fontSizes[0]" />
            </el-col>
            <el-col :span="8">
              Y轴
              <el-input-number v-model="fontSizes[1]" />
            </el-col>
            <el-col :span="8">
              值
              <el-input-number v-model="fontSizes[2]" />
            </el-col>
          </el-row>
        </template>
      </x-form>
    </x-dialog>
  </div>
</template>

<style lang="scss" scoped>
.x-chart {
  width: 100%;
  height: v-bind('zoomedHeight');
  zoom: v-bind('zoom');
  position: relative;
  .chart {
    height: 100%;
  }
  :deep(.el-form-item) {
    margin-bottom: 10px;
  }
  .grid {
    .el-col {
      margin-bottom: 5px;
    }
    span {
      display: inline-block;
      width: 20px;
    }
    .el-input-number {
      width: calc(100% - 20px);
    }
  }
  .sorts {
    height: 32px;
    justify-content: flex-start;
    .el-radio-group {
      margin-left: 20px;
    }
  }
  .settings {
    position: absolute;
    left: 6px;
    top: 3px;
    font-size: 14px;
    cursor: pointer;
    .el-icon {
      font-size: 18px;
      margin-left: 5px;
    }
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
