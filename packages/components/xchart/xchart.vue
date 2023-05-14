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
    update () {
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1)

      this.chart?.setOption({
        tooltip: {},
        ...this.option,
        grid: {
          left: 20,
          top: 10,
          right: 10,
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
