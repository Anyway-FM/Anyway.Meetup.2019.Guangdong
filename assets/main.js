var m = new Vue({
  el: '.wrapper',
  data: {
    commentSlide: 1,
    headerScaleRatio: 1,
    windowHeight: 1000,
    tvXOffset: 100
  },
  methods: {
    checkScroll: function(y){
      console.log(y)
      if (this.headerScaleRatio < 3.25) {
        this.headerScaleRatio = 1 + y/500
      }

      console.log(this.headerScaleRatio)
    },
    diamond: function(n) {
      console.log(n)
      // n = n / a.maxDiamondSize
      return n / 20
    }

  }
})

function getSize(){
  console.log("lalal")
}

window.onload = function(){
  getSize()
}

window.onresize = function(){
  getSize()
  console.log("★")
  var corners = document.querySelectorAll(".x-corner")
	if (window.innerHeight > heightBreakPoint) {
    corners[0].classList.add("show")
    corners[1].classList.add("show")
	}
	else {
    corners[0].classList.remove("show")
    corners[1].classList.remove("show")
	}
}

window.onscroll = function(){
  console.log("332")
  m.checkScroll(window.scrollY)
}
