var m = new Vue({
  el: '.wrapper',
  data: {
    stage: 1,
    scrollY: 0,
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
    tvOffsetX: 0,
    tvFinalOffsetX: -176,
    tvOffsetY: 0,
    tvFinalOffsetY: -60,
    opBgNum: 0,
    mainBgColor: '7c0808',
    mainScrollPageH: 900,
    mainScrollGap: 200,
    mainScroll:0,
    bgColorList: ['7c0808','8a9eae','b96605']
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
        this.tvOffsetX = y / this.headerScrollDistance * this.tvFinalOffsetX
        this.tvOffsetY = y / this.headerScrollDistance * this.tvFinalOffsetY
      }
      else {
        this.headerScaleRatio = this.headerFinalScale
        this.tvOffsetX = this.tvFinalOffsetX
        this.tvOffsetY = this.tvFinalOffsetY
      }

      this.lastScroll = y
    },
    swtichBgColor() {
      this.mainBgColor = bgColorList[Math.floor(Math.random() * bgColorList.length)]
      console.log(m.mainBgColor)
    }

  }
})

// m.smallScreenW = 379
// m.smallScreenH = 283
// m.smallScreenHPercent = 0.3
var bgColorList = ['7c0808','8a9eae','b96605']

function getSize(){
  m.windowWidth = window.innerWidth
  m.windowHeight = window.innerHeight
  if (window.innerWidth>window.innerHeight) {
    m.headerFinalScale = window.innerWidth / ( window.innerHeight * m.smallScreenHPercent / m.smallScreenH * m.smallScreenW)
  }
  else {
    m.headerFinalScale = 1 / m.smallScreenHPercent
  }
  console.log(m.headerFinalScale)
}

window.onload = function(){
  getSize()
  var ttt = setInterval(m.swtichBgColor, 2000);
}

window.onresize = function(){
  getSize()
  console.log("★")
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
