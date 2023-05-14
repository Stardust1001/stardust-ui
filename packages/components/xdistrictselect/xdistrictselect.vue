<script>
const areaList = {}

const areas = {
  provinces: [],
  cities: [],
  counties: []
}

export default {
  name: 'XDistrictSelect',
  props: {
    areaList: Object,
    modelValue: String,
    level: {
      type: String,
      default: 'county'
    }
  },
  emits: ['update:modelValue', 'change'],
  data () {
    return {
      inited: true,
      province: '',
      city: '',
      county: '',
      provinces: Object.freeze(areas.provinces),
      cities: [],
      counties: []
    }
  },
  computed: {
    number () {
      return ({ province: 1, city: 2, county: 3 })[this.level]
    },
    span () {
      return 24 / this.number
    }
  },
  watch: {
    areaList: {
      handler: 'initAreas',
      immediate: true
    },
    province (newVal) {
      if (!this.county) {
        this.update()
      }
      this.city = this.county = ''
      if (!newVal) {
        this.cities = []
        this.counties = []
        return
      }
      const prefix = newVal.slice(0, 2)
      this.cities = Object.freeze(areas.cities.filter(ele => ele.value.slice(0, 2) === prefix))
    },
    city (newVal) {
      if (!this.county) {
        this.update()
      }
      this.county = ''
      if (!newVal) {
        this.counties = []
        return
      }
      const prefix = newVal.slice(0, 4)
      this.counties = Object.freeze(areas.counties.filter(ele => ele.value.slice(0, 4) === prefix))
    },
    county () {
      this.update()
    },
    modelValue: {
      handler: 'init',
      immediate: true
    }
  },
  methods: {
    initAreas () {
      Object.assign(areaList, this.areaList)
      areas.provinces = Object.entries(areaList.province_list).map(ele => ({ value: ele[0], text: ele[1] }))
      areas.cities = Object.entries(areaList.city_list).map(ele => ({ value: ele[0], text: ele[1] }))
      areas.counties = Object.entries(areaList.county_list).map(ele => ({ value: ele[0], text: ele[1] }))
      this.provinces = Object.freeze(areas.provinces)
    },
    async init () {
      this.inited = false
      const [province, city, county] = this.modelValue.split('/')
      if (province) {
        const ele = Object.entries(areaList.province_list).find(ele => ele[1] === province)
        this.province = ele?.[0]
      } else {
        this.province = ''
        this.inited = true
        return
      }
      await this.$nextTick()
      if (city) {
        const ele = Object.entries(areaList.city_list).find(ele => ele[1] === city)
        this.city = ele?.[0]
      } else {
        this.city = ''
        this.inited = true
        return
      }
      await this.$nextTick()
      if (county) {
        const ele = Object.entries(areaList.county_list).find(ele => ele[1] === county)
        this.county = ele?.[0]
      } else {
        this.county = ''
      }
      this.inited = true
      this.update()
    },
    update () {
      if (!this.inited) {
        return
      }
      let value = [
        this.province && areaList.province_list[this.province] || '',
        this.number > 1 && this.city && areaList.city_list[this.city] || '',
        this.number > 2 && this.county && areaList.county_list[this.county] || ''
      ].slice(0, this.number).join('/')
      this.$emit('update:modelValue', value)
      this.$emit('change', value)
    }
  }
}
</script>

<template>
  <x-row class="x-district-select" :gutter="10">
    <x-col :span="span">
      <x-select
        v-model="province"
        :options="provinces"
        placeholder="省份"
      />
    </x-col>
    <x-col v-if="number > 1" :span="span">
      <x-select
        v-model="city"
        :options="cities"
        placeholder="城市"
      />
    </x-col>
    <x-col v-if="number > 2" :span="span">
      <x-select
        v-model="county"
        :options="counties"
        placeholder="县区"
      />
    </x-col>
   </x-row>
</template>
