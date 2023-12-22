document.addEventListener("DOMContentLoaded", function (event) {
  // ПОКАЗАТЬ СЛОЙ С ХЛЕБОМ НА ГЛАВНОЙ
  window.addEventListener("scroll", function () {
    let scrollPosition = document.documentElement.scrollTop
    if (document.querySelector(".extra-bg")) {
      let extraPosY = Math.round(document.querySelector(".extra").getBoundingClientRect().top)
      console.log("display extra", scrollPosition)
      if (scrollPosition > 3200 && scrollPosition < 6600) {
        //console.log('display extra', scrollPosition);
        document.querySelector(".extra-bg").style.display = "block"
      } else {
        document.querySelector(".extra-bg").style.display = "none"
      }
    }
  })

  // СКРЫТЬ ПЕРВУЮ СЕКЦИЮ ГЛАВНОЙ, КОГДА РАЗВЕРНЕТСЯ ВИДЕО
  window.addEventListener("scroll", function () {
    const scrollPosition = document.documentElement.scrollTop
    let calc = scrollPosition
    document.querySelector(".scrollval").innerHTML = scrollPosition
    if (scrollPosition > 500 && scrollPosition < 1400) {
      calc = Math.ceil(scrollPosition / 100)
      // document.getElementById("video-container").style.width = calc + "px"
      console.log(document.getElementById("video-container").style.width)
      document.querySelector(".scrollval").innerHTML = scrollPosition + "<br/>" + calc
    }
    if (document.querySelector(".intro")) {
      if (
        (scrollPosition > 800 && document.querySelector(".intro").style.visibility === "") ||
        document.querySelector(".intro").style.visibility === "visible"
      ) {
        document.querySelector(".intro").style.visibility = "hidden"
      }
      if (scrollPosition < 800 && document.querySelector(".intro").style.visibility === "hidden") {
        document.querySelector(".intro").style.visibility = "visible"
      }
    }
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
  // document.getElementById('searchicon').addEventListener('click', (e) => {
  //   e.stopPropagation();
  // })
})
