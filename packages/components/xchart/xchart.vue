<script>
const { funcs } = StardustBrowser

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
    updator: Object
  },
  data () {
    return {
      zoom: 1
    }
  },
  computed: {
    zoomedHeight () {
      return funcs.calcPixel(this.height) * this.zoom + 'px'
    },
    sidebarCollapse () {
      return this.$store.app.sidebarCollapse
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
    this.chart = window.echarts.init(this.$refs.el)
    this.update()
    document.addEventListener('resize', this.update)
    if (this.updator) {
      this.timer = setInterval(this.updator.handler.bind(this), this.updator.interval || 1000)
    }
  },
  beforeUnmount () {
    document.removeEventListener('resize', this.update)
    this.timer && clearInterval(this.timer)
  },
  methods: {
    calcSummary (values, summary, count) {
      let value
      if (summary === 'sum' || summary === 'average') {
        value = values.reduce((sum, v) => sum + v, 0)
      }
      if (summary === 'count') {
        value = values.length
      } else if (summary === 'average') {
        if (values.length) value = (value / (count || values.length)).toFixed(2) * 1
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
      const { categories, data, attr, summary, type, filter } = rich
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
      data.forEach(ele => {
        let name = ele[seriesName] || '未知'
        if (hasCategories) {
          let cate = cateAttrs.map(c => ele[c]).join('/') || '未知'
          if (limitCategories && cates.length >= filter.categories.limit && !cates.includes(cate)) {
            if (!filter.categories.mergeOthers) return
            otherCateSet.add(cate)
            cate = '其他'
          }
          if (!counts[cate]) cates.push(cate)
          counts[cate] ||= {}
          counts[cate][name] ||= []
          counts[cate][name].push(ele[attr])
        } else {
          if (limitSeries && seriesNames.length >= filter.series.limit && !seriesNames.includes(name)) {
            if (!filter.series.mergeOthers) return
            name = '其他'
          }
          if (!counts[name]) seriesNames.push(name)
          counts[name] ||= []
          counts[name].push(ele[attr])
        }
      })
      const legend = hasCategories ? [...new Set(data.map(e => e[seriesName]))] : seriesNames
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
        series = legend.map((name, i) => {
          return {
            name: _legend[i],
            type,
            label: { show: true, position: 'top' },
            data: legend.map(n => ({ name: n, value: n === name ? counts[name] : undefined }))
          }
        })
        // series = [
        //   {
        //     name: 'haha',
        //     type,
        //     label: { show: true, position: 'top' },
        //     data: legend.map(name => {
        //       return { name, value: counts[name] }
        //     })
        //   }
        // ]
      }
      Object.assign(opts, {
        legend: { data: _legend },
        xAxis: {
          type: 'category',
          data: hasCategories
            ? (!categories.formatter ? cates : cates.map(c => categories.formatter(c)))
            : (!seriesName.formatter ? seriesNames : seriesNames.map(c => seriesName.formatter(c)))
        },
        yAxis: { type: 'value' },
        series
      }, this.option)
      this.update(opts)
    },
    update (option = {}) {
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1)

      this.chart?.setOption({
        tooltip: {},
        toolbox: { feature: { saveAsImage: {} } },
        ...this.option,
        ...option,
        grid: {
          left: 30,
          top: 40,
          right: 20,
          bottom: 20,
          ...this.option.grid,
          ...option.grid
        }
      }, true)
    }
  }
}
</script>

<template>
  <div class="x-chart" ref="el" />
</template>

<style lang="scss" scoped>
.x-chart {
  width: 100%;
  height: v-bind('zoomedHeight');
  zoom: v-bind('zoom');
}
</style>
