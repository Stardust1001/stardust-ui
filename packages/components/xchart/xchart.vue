<script>
import { baseDialog } from '../../utils/model.js'
const { format, formatDate, formatTime } = StardustJs.dates
const { funcs } = StardustBrowser

const TYPES = ['index', 'selection', 'expand', 'radio', '_index']

const FORMATTERS = {
  '原样': v => v,
  '年份': v => format(v, 'YYYY年'),
  '月份': v => format(v, 'MM月'),
  '年月': v => format(v, 'YYYY-MM'),
  '年月日': v => format(v, 'YYYY-MM-DD'),
  '时分': v => format(v, 'HH:mm'),
  '时分秒': v => format(v, 'HH:mm:ss'),
}

const SORTS = [
  { text: '原样', value: '' },
  { text: '升序', value: 'asc' },
  { text: '降序', value: 'desc' },
]

export default {
  name: 'XChart',
  props: {
    height: {
      type: String,
      default: '150px'
    },
    option: {
      type: Object,
      default: () => ({})
    },
    updator: Object,
    datasource: Object
  },
  data () {
    return {
      zoom: 1,
      loading: false,
      filterType: '分类',
      SORTS,
      dialog: {
        ...baseDialog(),
        formItems: [
          {
            label: '分类', prop: 'categories', comp: 'x-select', multiple: true, 'collapse-tags': true, clearable: false,
            text: 'label', value: 'prop',
            options: []
          },
          {
            label: '系列', prop: 'series', comp: 'x-select', clearable: false, required: true,
            text: 'label', value: 'prop',
            options: [], slot: 'selects-formatters', formatters: []
          },
          {
            label: '值', prop: 'attr', comp: 'x-select', clearable: false, required: true,
            text: 'label', value: 'prop',
            options: [], slot: 'selects-formatters', formatters: []
          },
          {
            label: '汇总方式', prop: 'summary', comp: 'x-select', clearable: false, required: true,
            options: [
              { text: '求和', value: 'sum' },
              { text: '平均', value: 'average' },
              { text: '首个', value: 'first' },
              { text: '最后一个', value: 'last' },
              { text: '最大值', value: 'max' },
              { text: '最小值', value: 'min' },
              { text: '个数', value: 'count' },
            ]
          },
          {
            label: '图表类型', prop: 'type', comp: 'x-select', clearable: false, required: true,
            options: [
              { text: '柱状图', value: 'bar' },
              { text: '折线图', value: 'line' }
            ]
          },
          { label: '边距', slot: 'grid' },
          { label: '数据筛选', slot: 'filter' },
          { label: '字体大小', slot: 'font-sizes' }
        ],
        form: {
          sort: '',
          categories: [],
          series: '',
          attr: '',
          summary: 'count',
          type: 'bar',
          grid: {
            left: 30,
            top: 40,
            right: 20,
            bottom: 30
          },
          filter: {
            categories: { isLimit: false, limit: 10, mergeOthers: false },
            series: { isLimit: false, limit: 10, mergeOthers: false }
          },
          fontSizes: [12, 12, 12]
        }
      }
    }
  },
  computed: {
    zoomedHeight () {
      return funcs.calcPixel(this.height) * this.zoom + 'px'
    },
    sidebarCollapse () {
      return this.$store.app.sidebarCollapse
    },
    grid () {
      return this.dialog.form.grid
    },
    categories () {
      return this.dialog.form.filter.categories
    },
    series () {
      return this.dialog.form.filter.series
    },
    fontSizes () {
      return this.dialog.form.fontSizes
    }
  },
  watch: {
    zoomedHeight () {
      this.$nextTick(() => {
        this.chart?.resize()
      })
    },
    option: {
      handler: 'update',
      immediate: true
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
      if (!rich.filter?.categories.isLimit) rich.filter.categories.mergeOthers = false
      if (!rich.filter?.series.isLimit) rich.filter.series.mergeOthers = false
      let list = this.datasource.list
      if (this.datasource.search) {
        list = await this.datasource.search()
      }
      rich.data = list
      this.setRich(rich)
      this.loading = false
    },
    calcSummary (values, summary, count) {
      let value
      if (summary === 'sum' || summary === 'average') {
        value = values.reduce((sum, v) => sum + v, 0).toFixed(3) * 1
      }
      if (summary === 'count') {
        value = values.length
      } else if (summary === 'average') {
        if (values.length) value = (value / (count || values.length)).toFixed(3) * 1
        else value = undefined
      } else if (summary === 'first') {
        value = values[0]
      } else if (summary === 'last') {
        value = values[values.length - 1]
      } else if (summary === 'max' || summary === 'min') {
        value = Math[summary].apply(null, values)
      }
      return value
    },
    setRich (rich) {
      const { categories, data, attr, summary, type, filter, grid, fontSizes } = rich
      const opts = {}
      const hasCategories = Array.isArray(categories) && categories.length || categories?.data?.length
      const cateAttrs = hasCategories && (Array.isArray(categories) ? categories : categories.data)
      const seriesName = typeof rich.series === 'string' ? rich.series : rich.series.data
      const limitCategories = filter?.categories.limit > -1
      const limitSeries = filter?.series.limit > -1
      const counts = {}
      const cates = []
      const otherCateSet = new Set()
      const seriesNames = []
      const seriesFormatter = rich.series_formatter === '原样' ? null : FORMATTERS[rich.series_formatter]
      const attrFormatter = rich.attr_formatter === '原样' ? null : FORMATTERS[rich.attr_formatter]
      console.log(data)
      data.forEach(ele => {
        let name = (seriesFormatter ? seriesFormatter(ele[seriesName]) : ele[seriesName]) ?? '未知'
        if (limitSeries && seriesNames.length >= filter.series.limit && !seriesNames.includes(name)) {
          if (!filter.series.mergeOthers) return
          name = '其他'
        }
        const value = attrFormatter ? attrFormatter(ele[attr]) : ele[attr]
        if (hasCategories) {
          let cate = cateAttrs.map(c => ele[c]).join('/') || '未知'
          if (limitCategories && cates.length >= filter.categories.limit && !cates.includes(cate)) {
            if (!filter.categories.mergeOthers) return
            otherCateSet.add(cate)
            cate = '其他'
          }
          if (!counts[cate]) cates.push(cate)
          counts[cate] ||= {}
          if (!seriesNames.includes(name)) seriesNames.push(name)
          counts[cate][name] ||= []
          counts[cate][name].push(value)
        } else {
          if (!counts[name]) seriesNames.push(name)
          counts[name] ||= []
          counts[name].push(value)
        }
      })
      const legend = hasCategories && !limitSeries ? [...new Set(data.map(e => e[seriesName]))] : seriesNames
      if (hasCategories) {
        for (let cate in counts) {
          for (let name in counts[cate]) {
            counts[cate][name] = this.calcSummary(
              counts[cate][name],
              summary,
              limitCategories && cate === '其他' ? (counts[cate][name].length / otherCateSet.size) : counts[cate][name].length
            )
          }
        }
      } else {
        for (let name in counts) {
          counts[name] = this.calcSummary(counts[name], summary)
        }
      }
      let _legend = legend
      if (typeof rich.series === 'object' && rich.series.formatter) {
        _legend = legend.map(l => rich.series.formatter(l))
      }
      let series = []
      if (hasCategories) {
        series = legend.map((name, i) => {
          return {
            name: _legend[i],
            type,
            label: { show: true, position: 'top' },
            data: cates.map(c => ({ name: c, value: counts[c][name] }))
          }
        })
      } else {
        // series = legend.map((name, i) => {
        //   return {
        //     name: _legend[i],
        //     type,
        //     label: { show: true, position: 'top' },
        //     data: legend.map(n => ({ name: n, value: n === name ? counts[name] : undefined }))
        //   }
        // })
        series = [
          {
            type,
            colorBy: 'data',
            label: { show: true, position: 'top', fontSize: fontSizes[2] },
            data: legend.map(name => {
              return { name, value: counts[name] }
            })
          }
        ]
      }
      Object.assign(opts, {
        legend: { data: _legend },
        xAxis: {
          type: 'category',
          data: hasCategories
            ? (!categories.formatter ? cates : cates.map(c => categories.formatter(c)))
            : (!seriesName.formatter ? seriesNames : seriesNames.map(c => seriesName.formatter(c)))
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: fontSizes[1]
          }
        },
        series
      }, this.option, { grid })
      this.update(opts)
    },
    update (option = {}) {
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1)
      option = {
        tooltip: {},
        toolbox: { feature: { saveAsImage: {} } },
        ...this.option,
        ...option,
        grid: {
          left: 30, top: 40, right: 20, bottom: 20,
          ...this.option.grid,
          ...option.grid
        },
        legend: {
          padding: [0, 60],
          ...option.legend
        }
      }
      if (option.xAxis && !option.xAxis.axisLabel?.formatter) {
        option.xAxis.axisLabel ||= { fontSize: this.fontSizes[0] }
        option.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)
      }
      if (this.series.sort && option.series?.[0]?.data.length) {
        const symbol = this.series.sort === 'asc' ? 1 : -1
        option.series[0].data.sort((a, b) => (a.value - b.value) * symbol)
        option.xAxis.data = option.series[0].data.map(e => e.name)
      }
      console.log(option)
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
              <el-checkbox v-model="categories.isLimit">只使用前有限条记录</el-checkbox>
              <div v-show="categories.isLimit">
                记录条数
                <el-input-number v-model="categories.limit" :min="0" :precision="0" />
                <el-checkbox v-model="categories.mergeOthers">合并剩余项为其他</el-checkbox>
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
