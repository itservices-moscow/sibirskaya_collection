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
      document.getElementById(id).classList.add('hover-bg')
    })
    element.addEventListener("mouseout", function (ev) {
      document.getElementById(id).classList.remove('hover-bg')
    })
  })

  const menuBrandsHover = document?.querySelectorAll("[data-show-submenu]")
  menuBrandsHover.forEach((element) => {
    const id = element.getAttribute("data-show-submenu")
    element.addEventListener("mouseover", (e) => {
      // Находим ближайшего родителя с классом "topmenu-container__item"
      const parentItem = element.closest(".topmenu-container__item");

      // Убираем класс "active" у всех дочерних элементов родителя
      parentItem.querySelectorAll("[data-show-submenu]").forEach((el) => {
        el.classList.remove("active");
      });

      // Добавляем класс "active" только текущему элементу
      element.classList.add("active");

      // Показываем подменю для текущего элемента
      document.getElementById(id).classList.add("topmenu_show");

      // Скрываем подменю для соседних элементов
      const siblings = getSiblings(document.getElementById(id));
      siblings.forEach((el) => {
        el.classList.remove("topmenu_show");
      });
    });

    element.addEventListener("mouseout", (e) => {
      // Ваш код для обработки события "mouseout"
    });
  });

  // Функция для получения соседних элементов
  function getSiblings(element) {
    const siblings = Array.from(element.parentNode.children);
    return siblings.filter((el) => el !== element);
  }



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
  // const menuDesktopBackdrops = document?.querySelectorAll(".topmenu-backdrop");
  // menuDesktopBackdrops.forEach((element) => {
  //   const id = element.getAttribute("data-menu-hide");
  //   element.addEventListener("click", function (ev) {
  //     document.getElementById(id).classList.remove("topmenu_show");
  //   });
  //   if (id === "all") {
  //     element.addEventListener("mouseover", function (ev) {
  //       document.getElementById("topmenu-manuf").classList.remove("topmenu_show");
  //       document.getElementById("topmenu-brands").classList.remove("topmenu_show");
  //     });
  //   }
  // });

  const menuDesktopBackdrops = document?.querySelectorAll(".topmenu-backdrop");
  menuDesktopBackdrops.forEach((element) => {
    element.addEventListener('mouseover', function () {
      document.getElementById("topmenu-manuf").classList.remove("topmenu_show");
      document.getElementById("topmenu-brands").classList.remove("topmenu_show");
    });
  });
  // menuDesktopBackdrops.addEventListener('mouseover', function () {

  // });


  // topmenu

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




document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll('.nav-top-l1__item');

  items.forEach(function (item, index) {
    item.addEventListener('mouseover', function () {
      // Добавляем класс hover текущему элементу и предыдущему
      this.classList.add('hover');
      if (index > 0) {
        items[index - 1].classList.add('hover');
      }
    });

    item.addEventListener('mouseout', function () {
      // Убираем класс hover у всех элементов
      items.forEach(function (item) {
        item.classList.remove('hover');
      });
    });
  });
});