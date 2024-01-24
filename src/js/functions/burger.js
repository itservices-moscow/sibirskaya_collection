import { disableScroll } from "../functions/disable-scroll";
import { enableScroll } from "../functions/enable-scroll";

(function () {
  const burger = document?.querySelector("[data-burger]");
  const menu = document?.querySelector("[data-menu]");
  const menuItems = document?.querySelectorAll("[data-menu-item]");
  const menuContent = document?.querySelector("[data-menu-content]");
  const menuSearch = document?.querySelector("[data-menu-search]");
  const overlay = document?.querySelector("[data-menu-overlay]");
  const closeBtn = document?.querySelector("[data-menu-close]");

  burger?.addEventListener("click", (e) => {
    burger?.classList.toggle("burger--active");
    menu?.classList.toggle("menu--active");
    menuContent.classList.toggle("hidden"); // fix for mobile menu width
    menuSearch.classList.toggle("hidden"); // fix for mobile menu width

    if (menu?.classList.contains("menu--active")) {
      burger?.setAttribute("aria-expanded", "true");
      burger?.setAttribute("aria-label", "Закрыть меню");
      //disableScroll();
    } else {
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "Открыть меню");
      //enableScroll();
    }
  });

  overlay?.addEventListener("click", () => {
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Открыть меню");
    burger.classList.remove("burger--active");
    menu.classList.remove("menu--active");
    //enableScroll();
  });

  closeBtn?.addEventListener("click", () => {
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Открыть меню");
    burger.classList.remove("burger--active");
    menu.classList.remove("menu--active");
    setTimeout(hideFix, "1000");
    //enableScroll();
  });

  function hideFix() {
    menuContent.classList.add("hidden"); // fix for mobile menu width
    menuSearch.classList.add("hidden"); // fix for mobile menu width
  }

  menuItems?.forEach((el) => {
    el.addEventListener("click", () => {
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "Открыть меню");
      burger.classList.remove("burger--active");
      menu.classList.remove("menu--active");
      //enableScroll();
    });
  });
})();
