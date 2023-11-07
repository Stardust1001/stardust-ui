<template>
  <div
    v-if="screenLock.enabled && screenLock.isLocked"
    class="screen-lock fullscreen flex-center"
  >
    <canvas
      ref="canvas"
      class="fullscreen"
    />

    <div v-if="isVerifing" class="verify abs-center">
      <div class="pin">
        <el-input
          v-for="(c, index) in pin"
          :key="index"
          v-model="pin[index]"
          type="tel"
          ref="inputs"
          :readonly="!!c"
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          @compositionstart.stop.prevent="handleCompositionstart(index, $event)"
          @keydown.stop.prevent="handlePinInput(index, $event)"
        />
      </div>
      <el-button
        type="primary"
        class="custom-pin"
        @click="handleCustomPin"
      >
        自定义锁屏PIN码
      </el-button>
    </div>
  </div>
</template>

<script>
import { utils } from '@stardust-js/ui'
import { service } from '@/stardust'
const { funcs } = StardustJs

export default {
  data () {
    return {
      lastTime: Date.now(),
      isVerifing: false,
      pin: new Array(6).fill(''),
      inputs: [],
      stoper: null
    }
  },
  computed: {
    screenLock () {
      return this.$store.app.screenLock
    }
  },
  mounted () {
    if (!this.screenLock.enabled) {
      return
    }
    this.detectInteractive(this.onInteractive)
    setInterval(this.checkInteractive, 200)
    this.checkInteractive()
  },
  methods: {
    handleCustomPin () {
      const pin = window.prompt('请输入自定义PIN码（6位字母或数字）')
      if (pin === null) return
      if (!pin || pin.length !== 6 || !/\w{6}/.test(pin)) {
        return utils.Message('PIN码格式错误')
      }
      service.restful.update('users', this.$store.user.info.id, { pin })
      this.$store.user.info.pin = pin
    },
    async checkInteractive () {
      this.checkMask()
      if (
        this.screenLock.isLocked && !this.stoper ||
        !this.screenLock.isLocked && Date.now() - this.lastTime > this.screenLock.time * 1000
      ) {
        await this.toggleScreenLock(true)
        this.effect()
      }
    },
    effect () {
      this.stoper = utils.effects.pop(this.$refs.canvas)
    },
    detectInteractive (callback) {
      const eventTypes = ['click', 'keydown', 'mousemove', 'mousewheel']
      eventTypes.forEach(type => {
        document.addEventListener(type, () => callback(type), true)
      })
    },
    onInteractive (type) {
      if (this.screenLock.isLocked) {
        if (type === 'click') {
          this.isVerifing = true
          this.$nextTick(() => {
            const index = this.pin.findIndex(c => !c)
            this.$refs.inputs[index].input.focus()
          })
        }
      } else {
        this.lastTime = Date.now()
      }
    },
    async checkMask () {
      if (!this.screenLock.isLocked) {
        return
      }
      const mask = document.querySelector('.screen-lock .fullscreen')
      let exists = !!mask
      if (exists) {
        const rect = mask.getBoundingClientRect()
        const zoom = document.documentElement.style.zoom * 1 || 1
        exists = rect.left === 0 &&
                rect.top === 0 &&
                Math.round(rect.width - window.innerWidth / zoom) < 1 &&
                Math.round(rect.height - window.innerHeight / zoom) < 1
      }
      if (!exists) {
        window.location.reload()
      }
    },
    async handlePinInput (index, event) {
      const char = event.key
      if (/[0-9]/.test(char)) {
        this.pin[index] = char
      } else {
        if (char.toLowerCase() === 'backspace' && index > 0) {
          this.pin[index - 1] = ''
          this.$refs.inputs[index - 1].input.focus()
        }
        return
      }
      if (index < this.pin.length - 1) {
        await funcs.sleep(20)
        this.$refs.inputs[index + 1].input.focus()
      } else {
        if (this.pin.join('') !== this.$store.getters.user.pin) {
          this.$message({
            type: 'warning',
            message: '锁屏密码错误',
          })
          this.$refs.inputs[0].input.focus()
        } else {
          this.isVerifing = false
          this.stoper()
          this.stoper = null
          this.lastTime = Date.now()
          this.toggleScreenLock(false)
        }
        this.pin = new Array(6).fill('')
      }
    },
    async handleCompositionstart (index, event) {
      event.target.blur()
      await StardustJs.funcs.sleep(10)
      event.target.focus()
    },
    async toggleScreenLock (isLocked) {
      this.$store.app.screenLock.isLocked = isLocked
      await this.$nextTick()
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-lock {
  z-index: 9998;
  .pin {
    .el-input {
      width: 50px;
      height: 50px;
      margin: 5px;
      font-size: 40px;
    }
    :deep(input) {
      color: #409eff;
      text-align: center;
      padding-bottom: 3px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
      }
      -moz-appearance: textfield;
    }
  }
  .verify {
    z-index: 9999;
    text-align: center;
    .custom-pin {
      margin-top: 20px;
    }
  }
  canvas {
    animation-name: fade-in;
    animation-duration: 1s;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
