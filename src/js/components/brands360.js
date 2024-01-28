document.addEventListener("DOMContentLoaded", (event) => {
  console.log("script brands", event)
  const brandsListItems = document?.querySelectorAll("[data-subbrand-id]")
  const imageBox = document.querySelector("#sprite-box")
  // const filterSelectAllGroup = document?.querySelectorAll('[data-filter-function="selectall_cb"]')

  // переключение между пунктами
  brandsListItems.forEach((element) => {
    const id = element.getAttribute("data-subbrand-id")
    const imgtype = element.getAttribute("data-subbrand-imgtype")
    const url = element.getAttribute("data-subbrand-url")
    //console.log("[item:]", id, imgtype, url)

    element.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelectorAll(".brandmenu__link.active").forEach((elem) => {
        //console.log("ex", elem)
        elem.classList.remove("active")
      })
      e.target.classList.add("active")
      //imageBox.style.backgroundImage = "url('" + url + "')"

      switch (imgtype) {
        case "image":
          console.log("show image")
          //imageBox.style.backgroundImage = "url('" + url + "')" // прописать здесь код для обычной картинки
          break
        case "3d":
          imageBox.style.backgroundImage = "url('" + url + "')"
          break
        default:
          break
      }
    })
  })

  //animationPlayState = "running"
  const element = document.querySelector(".view360__icon")
  element.addEventListener("click", function (e) {
    e.preventDefault()
    //document.querySelector("#sprite-box").classList.add("animated")
    const state = document.querySelector("#sprite-box").style.animationPlayState
    document.querySelector("#sprite-box").style.animationPlayState = state === "paused" ? "running" : "paused"
  })
  // element.addEventListener("mouseover", function (e) {
  //   document.querySelector("#sprite-box").style.animationPlayState = "running"
  //   console.log("over", e)
  // })
  // element.addEventListener("mouseout", function (e) {
  //   document.querySelector("#sprite-box").style.animationPlayState = "paused"
  //   console.log("out", e)
  // })
})
