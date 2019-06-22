var bgm = document.getElementById('bgm')
var m = new Vue({
  el: '.wrapper',
  data: {
    stage: 1,
    scrollY: 0,
    landscape: true,
    playingMusic: false,
    muted: false,
    windowWidth: 1200,
    windowHeight: 700,
    headerScaleRatio: 1,
    headerFinalScale: 4.8,
    headerScrollDistance: 500,
    smallScreenW: 379,
    smallScreenH: 283,
    smallScreenHPercent: 0.3,
    opScrollDistance: 1400,
    windowHeight: 1000,
    lastScroll: 0,
    scrollDirection: 1,
    tvInitOffsetX: 200,
    tvFinalOffsetX: 176,
    tvOffsetY: 0,
    tvInitOffsetY: 0,
    tvFinalOffsetY: -160,
    opBgNum: 0,
    mainBgColor: '7c0808',
    mainScroll:0,
    bgColorList: ['7c0808','8a9eae','b96605']
  },
  watch: {
  //   scrollY: function () {
  //     if (this.stage == 1) {
  //       if (this.landscape) {
  //       }
  //       else {
  //       }
  //     }
  //
  //   },
    stage: function () {
      console.log("Changed Stage")
      if (this.stage == 2) {
        if (!this.playingMusic & !this.muted) {
          bgm.play()
          bgm.muted = false
          this.playingMusic = true
        }

      }
    }
  },
  methods: {
    checkScroll: function(y){
      if (y > this.lastScroll) this.scrollDirection = 1
      else this.scrollDirection = -1

      if (y > this.headerScrollDistance + this.opScrollDistance) {
        this.stage = 3
        this.mainScroll = y - this.headerScrollDistance - this.opScrollDistance
      }
      else if (y > this.headerScrollDistance) {
        this.stage = 2
        this.opBgNum = Math.floor(y/80) % 7 + 1
      }
      else {
        this.stage = 1
      }

      if (y < this.headerScrollDistance) {
        this.headerScaleRatio = 1+ y / this.headerScrollDistance * (this.headerFinalScale - 1)
      }
      else {
        this.headerScaleRatio = this.headerFinalScale
        this.tvOffsetY = this.tvFinalOffsetY
      }

      this.lastScroll = y
    },
    swtichBgColor() {
      this.mainBgColor = bgColorList[Math.floor(Math.random() * bgColorList.length)]
      // console.log(m.mainBgColor)
    },
    checkInView(n) {
      if (this.landscape) {
        vDistance = this.windowHeight + 200
      }
      else {
        vDistance = this.windowHeight - 100
      }
      if (this.mainScroll > (n-1) * vDistance  && this.mainScroll < n * vDistance ) {
        return 'in'
      }

    },
    toggleMute() {
      if (this.muted) {
        this.muted = false
        bgm.muted = false
      }
      else { //没有静音的状态
        this.muted = true
        bgm.muted = true
      }

    }

  }
})

// m.smallScreenW = 379
// m.smallScreenH = 283
// m.smallScreenHPercent = 0.3
var bgColorList = ['7c0808','8a9eae','b96605']

function getSize(){
  console.log(m.tvInitOffsetX)
  m.windowWidth = window.innerWidth
  m.windowHeight = window.innerHeight
  if (window.innerWidth>window.innerHeight) { //横屏
    m.landscape = true
    m.tvInitOffsetX = window.innerWidth / 4
    m.tvFinalOffsetX = window.innerWidth * -0.05
    console.log('TV Init Offset X: ' + m.tvInitOffsetX)
    m.headerFinalScale = window.innerWidth / ( window.innerHeight * m.smallScreenHPercent / m.smallScreenH * m.smallScreenW)
  }
  else { //竖屏
    m.landscape = false
    m.headerFinalScale = 1 / m.smallScreenHPercent
    m.tvInitOffsetX = 0
    m.tvFinalOffsetX = window.innerWidth * -0.05 //屏幕中心位置在 TV 图片左 45% 处
  }
  console.log(m.headerFinalScale)
}

console.log("Let's start!")
getSize()

window.onload = function(){
  var ttt = setInterval(m.swtichBgColor, 2000);
}

window.onresize = function(){
  getSize()
  console.log("Resized")
  // var corners = document.querySelectorAll(".x-corner")
}

window.onscroll = function(){
  m.checkScroll(window.scrollY)
  m.scrollY = window.scrollY
}

function swtichBgColor() {
  m.mainBgColor = bgColorList[Math.floor(Math.random() * bgColorList.length)]
  console.log(m.mainBgColor)
}

function audioAutoPlay(id){
  var audio = document.getElementById(id),
    play = function(){
      audio.play()
      document.removeEventListener("touchstart",play, false)
    }
  audio.play()
  document.addEventListener("WeixinJSBridgeReady", function () {
    play()
  }, false)
  document.addEventListener('YixinJSBridgeReady', function() {
    play()
  }, false)
  document.addEventListener("touchstart",play, false)
}

function stopAudio(id){
  var audio = document.getElementById(id),
    pause = function(){
      audio.pause()
      document.removeEventListener("touchstart",pause, false)
    }
  audio.pause()
  document.addEventListener("WeixinJSBridgeReady", function () {
    pause()
  }, false)
  document.addEventListener('YixinJSBridgeReady', function() {
    pause()
  }, false)
  document.addEventListener("touchstart",pause, false)
}
