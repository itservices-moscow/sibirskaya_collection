// fetch("https://reqbin.com/echo/get/json", {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//   },
// })
//   .then((response) => response.json())
//   .then((response) => console.log(JSON.stringify(response)))

const loadMore = (test, test2, more_minmore) => {
  const requestURL = "catalog-test-2.json"

  console.log(test, more_minmore)

  fetch(requestURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        console.log("[data]", data)

        document.getElementById("goodsblock").innerHTML += data.result
        if (Number(data.nextCount) < more_minmore) {
          document.getElementById("loadmore").style.visibility = "hidden"
        }
      } else {
        console.log("[status]", data.status)
      }
    })
}

const loadProducts = (id, val) => {
  console.log("[loadProducts]", id, val)
}

document.addEventListener("DOMContentLoaded", (event) => {
  const filterButtonsBrands = document?.querySelectorAll('[data-filter-function="brands"]')
  console.log("brands", filterButtonsBrands)

  filterButtonsBrands.forEach((element) => {
    const id = element.getAttribute("data-filter-id")
    const val = element.getAttribute("data-filter-value")
    element.addEventListener("click", function (e) {
      e.target.classList.toggle("selected")
      //fetch here
      loadProducts(id, val)
    })
    // if (id === "all") {
    //   element.addEventListener("click", function (ev) {
    //     //document.getElementById("").classList.remove("topmenu_show")
    //   })
    // }
  })

  const filterSelectAllBtns = document?.querySelectorAll('[data-filter-function="selectall"]')

  const filterShowMoreBtn = document?.querySelector('[data-filter-function="loadmore"]')
  const more_group = filterShowMoreBtn.getAttribute("data-filter-group")
  const more_lastid = filterShowMoreBtn.getAttribute("data-filter-lastid")
  const more_minmore = filterShowMoreBtn.getAttribute("data-filter-minmore") // скрыть кнопку, если nextCount меньше этого значения (к-во товаров в подгрузке)

  const filterClearAll = document?.querySelector('[data-filter-function="clearall"]')

  filterShowMoreBtn.addEventListener("click", function (e) {
    //fetch
    //data-filter-group
    //data-filter-lastid
    loadMore(more_group, more_lastid, more_minmore)
  })
  filterClearAll.addEventListener("click", function (e) {
    //clear all filters
  })
})
