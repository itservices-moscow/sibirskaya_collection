document.addEventListener("DOMContentLoaded", (event) => {
  console.log("script brands", event)
  const brandsListItems = document?.querySelectorAll("[data-subbrand-id]")
  // const filterSelectAllGroup = document?.querySelectorAll('[data-filter-function="selectall_cb"]')
  brandsListItems.forEach((element) => {
    const id = element.getAttribute("data-subbrand-id")
    const type = element.getAttribute("data-filter-value")
    console.log("[item:]", id, type)
  })

  const element = document.querySelector(".view360__icon")
  element.addEventListener("mouseover", function (e) {
    document.querySelector("#sprite-box").classList.add("animated")
    console.log("over", e)
  })
  element.addEventListener("mouseout", function (e) {
    document.querySelector("#sprite-box").classList.remove("animated")
    console.log("out", e)
  })
})
