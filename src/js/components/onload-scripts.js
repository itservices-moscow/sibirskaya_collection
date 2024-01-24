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

    // document.querySelector(".scrollval").innerHTML = scrollPosition
    // let calc = scrollPosition
    // if (scrollPosition > 500 && scrollPosition < 1400) {
    //   calc = Math.ceil(scrollPosition / 100)
    //   // document.getElementById("video-container").style.width = calc + "px"
    //   // console.log(document.getElementById("video-container").style.width)
    //   document.querySelector(".scrollval").innerHTML = scrollPosition + "<br/>" + calc
    // }

    // СКРЫТЬ ПЕРВУЮ СЕКЦИЮ ГЛАВНОЙ, КОГДА РАЗВЕРНЕТСЯ ВИДЕО
    // if (document.querySelector(".intro")) {
    //   if (
    //     (scrollPosition > 800 && document.querySelector(".intro").style.visibility === "") ||
    //     document.querySelector(".intro").style.visibility === "visible"
    //   ) {
    //     document.querySelector(".intro").style.visibility = "hidden"
    //   }
    //   if (scrollPosition < 800 && document.querySelector(".intro").style.visibility === "hidden") {
    //     document.querySelector(".intro").style.visibility = "visible"
    //   }
    // }
  })

  // ПОИСК В ХЕДЕРЕ
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
