<script>
import { h } from 'vue'

export default {
  name: 'Inner',
  render () {
    const inner = this.HeaderInner
    if (inner) {
      return typeof inner === 'function' ? inner() : h(inner)
    }
  }
}
</script>
