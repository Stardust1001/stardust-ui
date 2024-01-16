<script>
const modules = import.meta.glob('../../assets/icons/*.png')

export default {
  name: 'MobileXIcon',
  props: {
    name: String
  },
  data () {
    return {
      icons: {}
    }
  },
  computed: {
    iconClass () {
      const [set, name] = this.name.split(':')
      return 'icon--' + set + ' icon--' + set + '--' + name
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
  <span v-if="name.includes(':')" :class="iconClass" />
  <img v-else-if="icons[name]" :src="icons[name]" alt="icon">
  <van-icon v-else v-bind="$attrs" :name />
</template>
