import { debounce } from "../functions/debounce"

const suggestItemBase = document.createElement("div");
suggestItemBase.className = "searchsuggest-item";

const suggestError = document.createElement("div");
suggestError.className = "searchsuggest-error";
suggestError.textContent = "К сожалению, по вашему запросу ничего не нашлось. Попробуйте использовать другие ключевые слова";

document.querySelectorAll(".searchbox, .topmenu-mobile__head").forEach((el) => {
  const suggestWrapper = el.querySelector(".searchsuggest");
  const searchInput = el.querySelector("input");
  const backdrop = el.querySelector(".topmenu-mobile__backdrop");
  const closeButton = el.querySelector(".topmenu-mobile__close");

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
            suggestItem.innerHTML = item.title.replace(
              searchInput.value,
              "<span class='searchsuggest-highlight'>$&</span>"
            );
          });
        } else {
          suggestWrapper.appendChild(suggestError);
        }
        if (backdrop) backdrop.style.visibility = "visible";
      }
    });
  }, 500);

  const resetSearch = () => {
    suggestWrapper.textContent = "";
    if (backdrop) backdrop.style.visibility = "hidden";
  }

  searchInput.addEventListener("input", () => {
    if (searchInput.value) handleInput();
    else resetSearch();
  });

  suggestWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("searchsuggest-item")) {
      searchInput.value = event.target.textContent;
      searchInput.form.submit();
    }
  });

  if (closeButton)
    closeButton.addEventListener("click", () => {
      searchInput.value = "";
      resetSearch();
    });
});
