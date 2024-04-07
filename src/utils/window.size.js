
var windowSize = {
  data () {
    return {
      window_width: window.innerWidth,
      window_height: window.innerHeight
    }
  },
  mounted () {
    window.addEventListener('resize', this.update_window_size)
  },
  destroyed () {
    window.removeEventListener('resize', this.update_window_size)
  },
  methods: {
    update_window_size () {
      this.window_width = window.innerWidth
      this.window_height = window.innerHeight
    }
  }
}
export default windowSize

