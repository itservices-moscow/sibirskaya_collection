const loadMore = (test, test2, more_minmore) => {
  const requestURL = "catalog-test-1.json"

  console.log(test, more_minmore)
  //https://www.npmjs.com/package/html-to-json-parser - использован этот конвертер для json
  fetch(requestURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        console.log("[data]", JSON.stringify(data.result))

        document.getElementById("goodsblock").innerHTML += data.result
        if (Number(data.nextCount) < more_minmore) {
          document.getElementById("loadmore").style.visibility = "hidden"
        }
      } else {
        console.log("[status]", data.status)
      }
    })
}

const loadProducts = (id, val, more_minmore) => {
  const requestURL = "catalog-test-3.json"
  //https://www.npmjs.com/package/html-to-json-parser - использован этот конвертер для json
  fetch(requestURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        console.log("[data]", JSON.stringify(data.result))

        document.getElementById("goodsblock").innerHTML = data.result
        if (Number(data.nextCount) < more_minmore) {
          document.getElementById("loadmore").style.visibility = "hidden"
        } else {
          document.getElementById("loadmore").style.visibility = "visible"
        }
      } else {
        console.log("[status]", data.status)
      }
    })
}

document.addEventListener("DOMContentLoaded", (event) => {
  const filterButtonsBrands = document?.querySelectorAll('[data-filter-function="brands"]')
  console.log("brands", filterButtonsBrands)

  const filterSelectAllBtns = document?.querySelectorAll('[data-filter-function="selectall"]')

  const filterShowMoreBtn = document?.querySelector('[data-filter-function="loadmore"]')
  const more_group = filterShowMoreBtn.getAttribute("data-filter-group")
  const more_lastid = filterShowMoreBtn.getAttribute("data-filter-lastid")
  const more_minmore = filterShowMoreBtn.getAttribute("data-filter-minmore") // скрыть кнопку, если nextCount меньше этого значения (к-во товаров в подгрузке)

  const filterClearAll = document?.querySelector('[data-filter-function="clearall"]')

  filterButtonsBrands.forEach((element) => {
    const id = element.getAttribute("data-filter-id")
    const val = element.getAttribute("data-filter-value")
    element.addEventListener("click", function (e) {
      filterButtonsBrands.forEach((element) => {
        element.classList.remove("selected")
        element.setAttribute("data-filter-value", "none")
      })
      e.target.classList.toggle("selected")
      e.target.setAttribute("data-filter-value", "selected")

      //fetch here
      loadProducts(id, val, more_minmore)
    })
  })

  filterShowMoreBtn.addEventListener("click", function (e) {
    //fetch
    loadMore(more_group, more_lastid, more_minmore)
  })
  filterClearAll.addEventListener("click", function (e) {
    //clear all filters
  })
})
