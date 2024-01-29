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

// {
//     "x": 0,
//     "y": 1876,
//     "width": 1519.2000732421875,
//     "height": 2800,
//     "top": 1876,
//     "right": 1519.2000732421875,
//     "bottom": 4676,
//     "left": 0
// }

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
  // ПОКАЗАТЬ СЛОЙ С ХЛЕБОМ НА ГЛАВНОЙ
  window.addEventListener("scroll", function () {
    let scrollPosition = document.documentElement.scrollTop

    if (document.querySelector(".extra-bg")) {
      let extraPosY = Math.round(document.querySelector(".extra").getBoundingClientRect().top)
      if (scrollPosition > 3200 && scrollPosition < 6600) {
        document.querySelector(".extra-bg").style.display = "block"
      } else {
        document.querySelector(".extra-bg").style.display = "none"
      }
    }

    // console.log("[scroll]", scrollPosition, document.querySelector(".sticky-wrapper").getBoundingClientRect())

    if (document.querySelector(".sticky-wrapper")) {
      if (scrollPosition > 1876 && scrollPosition < 4676) {
        rotatePachka(45, 1876, 4676, scrollPosition)
      }
    }

    document.querySelector(".scrollval").innerHTML = scrollPosition
    let calc = scrollPosition
    if (scrollPosition > 570 && scrollPosition < 900) {
      let calc2 = scaleMapNumbers(scrollPosition)
      document.getElementById("video-container").style.width = calc2 + "px"
      //document.getElementById("video-container").style.width = calc2 + "%"
      //height -? "calc(" + calc2 + "% - 88px)"
      console.log(document.getElementById("video-container").style.width)
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
