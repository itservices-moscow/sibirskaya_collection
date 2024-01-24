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

const selAlls = (group_name) => {
  const ele = document.getElementsByName(group_name)
  for (var i = 0; i < ele.length; i++) {
    if (ele[i].type == "checkbox") ele[i].checked = true
  }
}
const deSelAlls = (group_name) => {
  const ele = document.getElementsByName(group_name)
  for (var i = 0; i < ele.length; i++) {
    if (ele[i].type == "checkbox") ele[i].checked = false
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const filterButtonsBrands = document?.querySelectorAll('[data-filter-function="brands"]')
  const filterSelectAllGroup = document?.querySelectorAll('[data-filter-function="selectall_cb"]') // select all group checkboxes
  const filterSelectAllBtns = document?.querySelectorAll('[data-filter-function="selectall"]') // select all Products
  const filterShowMoreBtn = document?.querySelector('[data-filter-function="loadmore"]')
  const more_group = filterShowMoreBtn.getAttribute("data-filter-group")
  const more_lastid = filterShowMoreBtn.getAttribute("data-filter-lastid")
  const more_minmore = filterShowMoreBtn.getAttribute("data-filter-minmore") // скрыть кнопку Показать еще, если nextCount меньше этого значения (к-во товаров в подгрузке)

  const filterClearAll = document?.querySelector('[data-filter-function="clearall"]')

  // FILTER BY BRANDS
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

  //SELECT ALL btn
  filterSelectAllGroup.forEach((element) => {
    element.addEventListener("change", function (e) {
      if (e.target.checked == true) {
        selAlls(e.target.getAttribute("data-filter-group"))
      } else {
        deSelAlls(e.target.getAttribute("data-filter-group"))
      }
    })
  })

  //SELECT ALL IN GROUP CHECKBOX
  filterSelectAllBtns.forEach((element) => {
    element.addEventListener("click", function (e) {
      console.log(e.target)
      e.target.classList.toggle("selected")
      const dfv = e.target.classList.contains("selected") ? "selected" : "none"
      e.target.setAttribute("data-filter-value", dfv)
      //select all products
      document.querySelectorAll("input[type='checkbox']").forEach((elem) => {
        console.log("+")
        elem.checked = dfv == "selected" ? true : false
        elem.setAttribute("data-filter-value", dfv)
        console.log("+", elem.getAttribute("data-filter-value"))
      })
    })
  })

  //SHOW MORE
  filterShowMoreBtn.addEventListener("click", function (e) {
    //fetch
    loadMore(more_group, more_lastid, more_minmore)
  })

  // CLEAR ALL
  filterClearAll.addEventListener("click", function (e) {
    //clear all filters
    filterSelectAllBtns.forEach((element) => {
      element.classList.remove("selected")
      element.setAttribute("data-filter-value", "none")
    })
    filterButtonsBrands.forEach((element) => {
      element.classList.remove("selected")
      element.setAttribute("data-filter-value", "none")
    })
    document.querySelectorAll("input[type='checkbox']").forEach((element) => {
      element.checked = false
      element.setAttribute("data-filter-value", "none")
    })
  })
})
