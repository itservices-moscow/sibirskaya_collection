import { debounce } from "../functions/debounce"

const suggestItemBase = document.createElement("div");
suggestItemBase.className = "searchsuggest-item";

const suggestError = document.createElement("div");
suggestError.className = "searchsuggest-error";
suggestError.textContent = "К сожалению, по вашему запросу ничего не нашлось. Попробуйте использовать другие ключевые слова";

const backdrop = document.querySelector(".topmenu-mobile__backdrop");

document.querySelectorAll(".searchbox, .searchbox-mob").forEach((el) => {
  const suggestWrapper = el.querySelector(".searchsuggest");
  const searchInput = el.querySelector("input");

  const handleInput = debounce(() => {
    if (!searchInput.value)
      return;

    fetch("search-suggest.json")
    .then(response => response.json())
    .then(data => {
      if (data.status == "success" && data.callBack == "searchSuggest") {
        const suggests = data.callbackData;

        suggestWrapper.textContent = "";
        if (suggests.length) {
          suggests.forEach((item) => {
            const suggestItem = suggestWrapper.appendChild(suggestItemBase.cloneNode());
            suggestItem.textContent = item.title;
          });
        } else {
          suggestWrapper.appendChild(suggestError);
        }
        backdrop.style.visibility = "visible";
      }
    });
  }, 500);

  searchInput.addEventListener("input", () => {
    if (searchInput.value) {
      handleInput();
    } else {
      suggestWrapper.textContent = "";
      backdrop.style.visibility = "hidden";
    }
  });

  suggestWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("searchsuggest-item"))
      searchInput.value = event.target.textContent;
  });
});
