const addToggleClass = (selector, t_class) => {
  const elements = document.querySelectorAll(selector)
  elements.forEach(function (elem) {
    elem.addEventListener("click", (e) => {
      e.target.classList.toggle(t_class)
    })
  })
}

//addToggleClass(".btn-filter", "selected")
