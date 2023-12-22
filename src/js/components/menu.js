const showTopmenu = (content, link) => {
  const menuContent = document.getElementById(content),
    menuLink = document.getElementById(link)

  menuLink.addEventListener("click", (e) => {
    e.preventDefault()
    menuContent.classList.toggle("topmenu_show")
  })

  document.addEventListener("click", (e) => {
    let target = e.target
    let its_menu = target == menuContent || menuContent.contains(target)
    let its_link = target == menuLink
    let menu_is_active = menuContent.classList.contains("topmenu_show")

    if (!its_menu && !its_link && menu_is_active) {
      menuContent.classList.toggle("topmenu_show")
    }
  })
}

const showBlockTopmenu = (menu, link, hidemenu) => {
  const menuContent = document.getElementById(menu)
  const menuHide = document.getElementById(hidemenu)
  const menuLink = document.getElementById(link)
  menuLink.addEventListener("mouseover", (e) => {
    e.preventDefault()
    menuContent.classList.add("topmenu_show")
    menuHide.classList.remove("topmenu_show")
  })
}

const hideBlockTopmenu = (menu, link) => {
  const menuContent = document.getElementById(menu),
    menuLink = document.getElementById(link)
  //скрыть блок меню, когда мышь уходит за его пределы
  menuContent.addEventListener("mouseleave", (e) => {
    e.preventDefault()
    menuContent.classList.remove("topmenu_show")
  })
}

// СКРИПТ ДЛЯ ВЕРХНЕГО МЕНЮ
let getSiblings = function (e) {
  let siblings = []
  if (!e.parentNode) {
    return siblings
  }
  let sibling = e.parentNode.firstChild // first child of the parent node
  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling)
    }
    sibling = sibling.nextSibling
  }
  return siblings
}

const showTopMenuPanel = (toshow) => {
  //const menuBlock = document?.querySelector(toshow)
  //if (menuBlock) {
  //   const siblings = getSiblings(menuBlock)
  //   menuBlock.classList.toggle("topmenu_show")
  //   siblings.forEach((element) => {
  //     element.classList.remove("topmenu_show")
  //   })
  //   if (tohide) {
  //     document.querySelectorAll(tohide).forEach((element) => {
  //       element.classList.remove("topmenu_show")
  //     })
  //   }
  //}
}

// nav-top-l3-0 nav-top-l3-1
//

// МЕНЮ ФУТЕРА И ВСЕ ПРОСТЫЕ АККОРДЕОНЫ КРОМЕ ПРОИЗВОДСТВА
function accordionInit(classname) {
  var acc = document.getElementsByClassName(classname)
  var i
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active")
      var panel = this.nextElementSibling
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px"
      }
    })
  }
}

// КОГДА СТРАНИЦА ЗАГРУЗИЛАСЬ:
document.addEventListener("DOMContentLoaded", function (event) {
  // showTopmenu("topmenu-brands", "link-brands")
  // showTopmenu("topmenu-manuf", "link-manuf")

  // ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ ДЛЯ МЕНЮ (hover, etc.)

  showBlockTopmenu("topmenu-brands", "link-brands", "topmenu-manuf")
  showBlockTopmenu("topmenu-manuf", "link-manuf", "topmenu-brands")

  hideBlockTopmenu("topmenu-brands", "link-brands")
  hideBlockTopmenu("topmenu-manuf", "link-manuf")

  const menuManufHover = document?.querySelectorAll("[data-onhover-id]")
  menuManufHover.forEach((element) => {
    const id = element.getAttribute("data-onhover-id")
    element.addEventListener("mouseover", function (ev) {
      document.getElementById(id).style.backgroundColor = "#FAF5F0"
    })
    element.addEventListener("mouseout", function (ev) {
      document.getElementById(id).style.backgroundColor = ""
    })
  })

  const menuBrandsHover = document?.querySelectorAll("[data-show-submenu]")
  menuBrandsHover.forEach((element) => {
    const id = element.getAttribute("data-show-submenu")
    element.addEventListener("mouseover", (e) => {
      // console.log(id, document.getElementById(id))
      document.getElementById(id).classList.add("topmenu_show")

      const siblings = getSiblings(document.getElementById(id))
      siblings.forEach((element) => {
        element.classList.remove("topmenu_show")
      })
    })
  })

  // СКРЫТЬ ПОДМЕНЮ БРЕНДОВ
  const menuBrandsHide = document?.querySelectorAll("[data-menuleave-hide]")
  menuBrandsHide.forEach((element) => {
    //console.log("[hide]", element.children)
    element.addEventListener("mouseout", function (ev) {
      element.children.forEach((child) => {
        // нужны уточнения
        // child.classList.remove("topmenu_show")
        // console.log(child)
      })
    })
  })
  // СКРЫТЬ ДЕСКТОПНОЕ МЕНЮ ПО КЛИКУ НА БЭКДРОП
  const menuDesktopBackdrops = document?.querySelectorAll("[data-menu-hide]")
  menuDesktopBackdrops.forEach((element) => {
    const id = element.getAttribute("data-menu-hide")
    element.addEventListener("click", function (ev) {
      document.getElementById(id).classList.remove("topmenu_show")
    })
    if (id === "all") {
      element.addEventListener("click", function (ev) {
        document.getElementById("topmenu-manuf").classList.remove("topmenu_show")
        document.getElementById("topmenu-brands").classList.remove("topmenu_show")
      })
    }
  })

  // И ПРИ ХОВЕРЕ НА ДР. ПУНКТЫ
  const menuDesktopHide = document?.querySelectorAll("[data-menu-hide-onhover]")
  menuDesktopHide.forEach((element) => {
    // const id = element.getAttribute("data-menu-hide-onhover")
    element.addEventListener("mouseover", function (ev) {
      document.getElementById("topmenu-manuf").classList.remove("topmenu_show")
      document.getElementById("topmenu-brands").classList.remove("topmenu_show")
    })
  })

  // МЕНЮ ФУТЕРА и все аккордеоны
  accordionInit("accordion")

  // закрывающая скобка document onload
})
