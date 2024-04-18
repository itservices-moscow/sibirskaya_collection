document.addEventListener("DOMContentLoaded", (event) => {
  const brandsListItems = document?.querySelectorAll(".panel [data-subbrand-id]")
  const accordionMenuItem = document.querySelector('.brandmenu.accordion li')
  const imageBox = document.querySelector("#sprite-box")
  const step = window.innerWidth > 1279 ? -500 : (window.innerWidth * -1)
  let count = 1
  let animation

  function Animate () {
    count = count < 1 ? 36 : --count
    imageBox.style.backgroundPosition = `${step * count}px 0`
  }

  function SetImage (id, imgtype, url, scale) {
    switch (imgtype) {
      case "image":
        console.log("show image")
        imageBox.classList.add("sb-center")
        imageBox.style.backgroundImage = "url('" + url + "')" // прописать здесь код для обычной картинки
        imageBox.style.backgroundPosition = 'center'
        imageBox.style.animationName = 'none'
        break
      case "3d":
        // preloader (поставить сюда fetch или нужную функцию подгрузки)
        document.getElementById("view360").classList.add("loading")
        setTimeout(function () {
          imageBox.classList.remove("sb-center")
          imageBox.style.backgroundImage = "url('" + url + "')" // отобразить 3d спрайт
          imageBox.style.backgroundPosition = 'left center'
          imageBox.style.animationName = 'sprite'
          imageBox.style.transform = `scale(${scale})`
          document.getElementById("view360").classList.remove("loading")
        }, 3000)

        break
      default:
        break
    }
  }
  const active = document?.querySelector('.panel [data-subbrand-id].active')
  SetImage(active.getAttribute("data-subbrand-id"), active.getAttribute("data-subbrand-imgtype"), active.getAttribute("data-subbrand-url"), active.getAttribute("data-subbrand-scale"))

  // переключение между пунктами
  brandsListItems.forEach((element) => {
    const id = element.getAttribute("data-subbrand-id")
    const imgtype = element.getAttribute("data-subbrand-imgtype")
    const url = element.getAttribute("data-subbrand-url")
    const scale = element.getAttribute("data-subbrand-scale")


    element?.addEventListener("click", function (e) {
      e.preventDefault()
      clearInterval(animation)
      document.querySelectorAll(".brandmenu__link.active").forEach((elem) => {
        //console.log("ex", elem)
        elem.classList.remove("active")
      })
      e.target.classList.add("active")
      const newChild = e.target.cloneNode(true)
      accordionMenuItem.innerHTML = ''
      accordionMenuItem.appendChild(newChild)
      SetImage(id, imgtype, url, scale)
      const targetParent = e.target.parentNode
      if (targetParent.parentNode.classList.contains('panel')) {
        if (document.querySelector('.brandmenu.accordion').classList.contains('active')) {
          document.querySelector('.brandmenu.accordion').click()
        }
      }
      // setTimeout(() => {
      //   count = 1
      //   animation = setInterval(Animate, 160)
      // }, 3000)
    })
  })

  // setTimeout(() => {
  //   animation = setInterval(Animate, 160)
  // }, 3000)


  // imageBox?.parentNode.parentNode.addEventListener('mouseenter', () => {
  //   // imageBox.classList.remove('animate')
  //   imageBox.parentNode.parentNode.classList.add('dragging')
  //   // clearInterval(animation)
  // })
  //
  // imageBox?.parentNode.parentNode.addEventListener('mouseleave', ()=> {
  //   imageBox.parentNode.parentNode.classList.remove('dragging')
  //   // imageBox.classList.add('animate')
  //   // animation = setInterval(Animate, 160)
  // })

  let x = 0
  function onMouseMove (event) {
    event.preventDefault()
    console.log(event, event.pageX)
    const diff = count === -500 ? 10 : 2
    if (event.pageX - x > diff) {
      count = count < 36 ? ++count : 1
      imageBox.style.backgroundPosition = `${step * count}px 0`
      x = event.pageX
    } else if (event.pageX - x < (diff * -1)) {
      count = (count < 36 && count > 0) ? --count : 35
      imageBox.style.backgroundPosition = `${step * count}px 0`
      x = event.pageX
    }
  }

  imageBox?.parentNode.parentNode.addEventListener('dragstart', () => false)

  imageBox?.parentNode.parentNode.addEventListener('pointerdown', (e) => {
    imageBox.parentNode.parentNode.classList.add('drag')
    x = e.pageX
    document.querySelector('body').classList.add('dragging')
    document.addEventListener('pointermove', onMouseMove);
  })
  imageBox?.parentNode.parentNode.addEventListener('pointerup', (e) => {
    imageBox.parentNode.parentNode.classList.remove('drag')
    setTimeout(() => document.querySelector('body').classList.remove('dragging'), 500)
    document.removeEventListener('pointermove', onMouseMove);
  })

  document.addEventListener('pointermove', (event) => {
    if (document.querySelector('body').classList.contains('dragging') || imageBox?.parentNode.parentNode.classList.contains('drag')) {
      event.preventDefault()
      if (!event.target.closest('.view360')) {
        imageBox?.parentNode.parentNode.classList.remove('drag')
        setTimeout(() => document.querySelector('body').classList.remove('dragging'), 500)
        document.removeEventListener('pointermove', onMouseMove);
      }
    }
  })
})
