document.addEventListener("DOMContentLoaded", function (event) {
  // ПОКАЗАТЬ СЛОЙ С ХЛЕБОМ НА ГЛАВНОЙ
  window.addEventListener("scroll", function () {
    let scrollPosition = document.documentElement.scrollTop
    if (document.querySelector(".extra-bg")) {
      let extraPosY = Math.round(document.querySelector(".extra").getBoundingClientRect().top)

      if (scrollPosition > 3200) {
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
  document.getElementById("searchbox").style.right = "calc(100% - " + (Math.ceil(searchposX) + 30) + "px)"

  window.addEventListener("resize", (event) => {
    const searchposX = document.getElementById("searchanchor").getBoundingClientRect().x
    document.getElementById("searchbox").style.right = "calc(100% - " + (Math.ceil(searchposX) + 30) + "px)"
  })

  document.getElementById("searchicon").addEventListener("click", (e) => {
    document.getElementById("searchbox").classList.toggle("active")
  })
  // document.getElementById('searchicon').addEventListener('click', (e) => {
  //   e.stopPropagation();
  // })
})
