const showTopmenu = (content, link) => {
  const menuContent = document.getElementById(content), //document.querySelector
    menuLink = document.getElementById(link);

  menuLink.addEventListener("click", (e) => {
    e.preventDefault();
    menuContent.classList.toggle("topmenu_show");
  });

  document.addEventListener("click", (e) => {
    console.log("document click");
    let target = e.target;
    let its_menu = target == menuContent || menuContent.contains(target);
    let its_link = target == menuLink;
    let menu_is_active = menuContent.classList.contains("topmenu_show");

    if (!its_menu && !its_link && menu_is_active) {
      menuContent.classList.toggle("topmenu_show");
    }
  });
};

showTopmenu("topmenu-brands", "link-brands");
showTopmenu("topmenu-manuf", "link-manuf");
