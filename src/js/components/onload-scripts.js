function rotatePachka(steps, top, bottom, scrollval) {
  const bglast = 26250
  const height = bottom - top
  // const step = bglast / steps // шаг 1 кадра
  const step = 750
  const start = top
  const end = bottom
  const scrollstep = height / steps
  const arrayLength = Math.floor((end - start) / scrollstep) + 1
  const range = [...Array(arrayLength).keys()].map((x) => x * scrollstep + start)

  var currentstep = 0
  currentstep = range.findIndex((item) => item > scrollval)
  var bgpos = `${step * currentstep}px 0px`
  // console.log("[rotatefnc]", scrollstep, range, bgpos)

  document.querySelector("#pachka-box").style.backgroundPosition = bgpos
}

// высчитывает значения ширины для видео на главной (in logariphmic scale)
function scaleMapNumbers(pos) {
  var screenW = window.screen.width
  var minM = 570
  var maxM = 788
  // var minV = Math.log(40) // например, от 40 до 100 %
  // var maxV = Math.log(103)
  var minV = Math.log(760) // изначальная ширина
  var maxV = Math.log(screenW) // ширина экрана
  var scal = (maxV - minV) / (maxM - minM)
  var res = Math.ceil(Math.exp(minV + scal * (pos - minM)))

  return res > screenW ? screenW : res
}

document.addEventListener("DOMContentLoaded", function (event) {
  // ВИДЕО НА ГЛАВНОЙ
  if (document.querySelector("#video-main")) {
    const vid = document.querySelector("#video-main")
    const playbtn = document.querySelector("#video-play-btn")

    playbtn.addEventListener("click", (e) => {
      e.preventDefault()

      if (vid.paused) {
        vid.play()
      } else {
        vid.pause()
      }
      playbtn.classList.toggle("paused")
    })
  }

  // ПОКАЗАТЬ СЛОЙ С ХЛЕБОМ НА ГЛАВНОЙ
  window.addEventListener("scroll", function () {
    let scrollPosition = document.documentElement.scrollTop

    if (document.querySelector(".extra-bg")) {
      let extraPosY = Math.round(document.querySelector(".extra").getBoundingClientRect().top)
      if (scrollPosition > 3200 && scrollPosition < 7000) {
        document.querySelector(".extra-bg").style.display = "block"
      } else {
        document.querySelector(".extra-bg").style.display = "none"
      }
    }

    // console.log("[scroll]", scrollPosition, document.querySelector(".sticky-wrapper").getBoundingClientRect())

    if (document.querySelector(".sticky-wrapper")) {
      if (scrollPosition > 1876 && scrollPosition < 5076) {
        rotatePachka(45, 1876, 5076, scrollPosition)
      }
    }

    document.querySelector(".scrollval").innerHTML = scrollPosition
    let calc = scrollPosition
    if (scrollPosition > 570 && scrollPosition < 900) {
      let calc2 = scaleMapNumbers(scrollPosition)
      document.getElementById("video-container").style.width = calc2 + "px"
      //console.log(document.getElementById("video-container").style.width)
      document.querySelector(".scrollval").innerHTML = scrollPosition + "<br/>" + calc + "<br/>" + calc2
    }
  })

  // ПОИСК В ХЕДЕРЕ - раскрытие инпута
  const searchposX = document.getElementById("searchanchor").getBoundingClientRect().x
  // console.log('searchposX', searchposX)
  document.getElementById("searchbox").style.right = "calc(100% - " + (Math.ceil(searchposX) + 36) + "px)"

  window.addEventListener("resize", (event) => {
    const searchposX = document.getElementById("searchanchor").getBoundingClientRect().x
    document.getElementById("searchbox").style.right = "calc(100% - " + (Math.ceil(searchposX) + 36) + "px)"
  })

  document.getElementById("searchicon").addEventListener("click", (e) => {
    document.getElementById("searchbox").classList.toggle("active")
  })
})
