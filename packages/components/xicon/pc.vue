<script>
const modules = import.meta.glob('../../assets/icons/*.png')

export default {
  name: 'PcXIcon',
  props: {
    name: String
  },
  data () {
    return {
      icons: {}
    }
  },
  created () {
    this.initIcons()
  },
  methods: {
    async initIcons () {
      const icons = {}
      await Promise.all(Object.keys(modules).map(async path => {
        const name = path.split('/').pop().split('.')[0]
        const res = await modules[path]()
        icons[name] = res.default
      }))
      this.icons = icons
    }
  }
}
</script>

<template>
  <img v-if="icons[name]" :src="icons[name]" alt="icon">
  <el-icon v-else v-bind="$attrs">
    <component :is="name" />
  </el-icon>
</template>
