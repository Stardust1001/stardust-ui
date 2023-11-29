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
    updator: Object,
    rich: Object
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
    this.rich && this.calcRich()
  },
  beforeUnmount () {
    document.removeEventListener('resize', this.update)
    this.timer && clearInterval(this.timer)
  },
  methods: {
    calcRich () {
      const { categories, series: seriesName, data } = this.rich
      const opts = {}
      const hasCategories = categories?.length
      const counts = {}
      const nameSet = new Set()
      data.forEach(ele => {
        const name = ele[seriesName] || '未知'
        nameSet.add(name)
        if (hasCategories) {
          const cate = config.categories.map(c => ele[c]).join('/') || '未知'
          counts[cate] ||= {}
          counts[cate][name] ||= 0
          counts[cate][name]++
        } else {
          counts[name] ||= 0
          counts[name]++
        }
      })
      const cates = Object.keys(counts)
      const legend = [...nameSet]
      let series = []
      if (hasCategories) {
        series = legend.map(name => {
          return {
            name,
            type: 'bar',
            data: cates.map(c => ({ name: c, value: counts[c][name] }))
          }
        })
      } else {
        series = [
          {
            name: 'haha',
            type: 'bar',
            data: legend.map(name => {
              return { name, value: counts[name] }
            })
          }
        ]
      }
      Object.assign(opts, {
        legend: { data: legend },
        xAxis: { type: 'category', data: cates },
        yAxis: { type: 'value' },
        series
      }, this.option)
      Object.assign(this.option, opts)
      this.update()
    },
    update () {
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1)

      this.chart?.setOption({
        tooltip: {},
        toolbox: { feature: { saveAsImage: {} } },
        ...this.option,
        grid: {
          left: 30,
          top: 20,
          right: 20,
          bottom: 20,
          ...this.option.grid
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
