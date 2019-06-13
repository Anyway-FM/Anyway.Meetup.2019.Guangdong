var m = new Vue({
  el: '.wrapper',
  data: {
    stage: 1,
    windowWidth: 1200,
    windowHeight: 700,
    headerScaleRatio: 1,
    headerFinalScale: 4.8,
    headerScrollDistance: 500,
    windowHeight: 1000,
    lastScroll: 0,
    scrollDirection: 1,
    tvOffsetX: 0,
    tvFinalOffsetX: -92,
    tvOffsetY: 0,
    tvFinalOffsetY: -24
  },
  methods: {
    checkScroll: function(y){
      if (y > this.lastScroll) this.scrollDirection = 1
      else this.scrollDirection = -1

      if (y > this.headerScrollDistance) {
        this.stage = 2
      }
      else {
        this.stage = 1
      }

      if (y < this.headerScrollDistance) {
        this.headerScaleRatio = 1+ y / this.headerScrollDistance * (this.headerFinalScale - 1)
        this.tvOffsetX = y / this.headerScrollDistance * this.tvFinalOffsetX
        this.tvOffsetY = y / this.headerScrollDistance * this.tvFinalOffsetY
      }
      else {
        this.headerScaleRatio = this.headerFinalScale
        this.tvOffsetX = this.tvFinalOffsetX
        this.tvOffsetY = this.tvFinalOffsetY
        document.getElementByID('video-op').play()
      }

      this.lastScroll = y
    },
    diamond: function(n) {
      console.log(n)
      return n / 20
    }

  }
})

var smallScreenW = 379
var smallScreenH = 283
var smallScreenHPercent = 0.3

function getSize(){
  m.windowWidth = window.innerWidth
  m.windowHeight = window.innerHeight
  if (window.innerWidth>window.innerHeight) {
    m.headerFinalScale = window.innerWidth / ( window.innerHeight * smallScreenHPercent / smallScreenH * smallScreenW)
  }
  else {
    m.headerFinalScale = 1 / smallScreenHPercent
  }
  console.log(m.headerFinalScale)
}

window.onload = function(){
  getSize()
}

window.onresize = function(){
  getSize()
  console.log("★")
  // var corners = document.querySelectorAll(".x-corner")
}

window.onscroll = function(){
  console.log("332")
  m.checkScroll(window.scrollY)
}
