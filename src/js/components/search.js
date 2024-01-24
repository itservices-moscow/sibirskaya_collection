import { debounce } from "../functions/debounce"

const suggestItemBase = document.createElement("div");
suggestItemBase.className = "searchsuggest-item";

const suggestError = document.createElement("div");
suggestError.className = "searchsuggest-error";
suggestError.textContent = "К сожалению, по вашему запросу ничего не нашлось. Попробуйте использовать другие ключевые слова";

document.querySelectorAll(".searchbox, .topmenu-mobile__head").forEach((el) => {
  const suggestWrapper = el.querySelector(".searchsuggest");
  const searchInput = el.querySelector("input");
  const closeButton = el.querySelector(".topmenu-mobile__close");

  const showSuggest = debounce(() => {
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
              new RegExp(searchInput.value, "i"),
              "<span class='searchsuggest-highlight'>$&</span>"
            );
          });
        } else {
          suggestWrapper.appendChild(suggestError);
        }
      }
    });
  }, 500);

  const hideSuggest = () => {
    el.classList.remove("search-active");
  }

  searchInput.addEventListener("input", showSuggest);
  searchInput.addEventListener("focus", () => { el.classList.add("search-active"); })
  searchInput.addEventListener("blur", () => { setTimeout(hideSuggest, 100); });

  suggestWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("searchsuggest-item")) {
      searchInput.value = event.target.textContent;
      searchInput.form.submit();
    }
  });

  if (closeButton)
    closeButton.addEventListener("click", () => {
      searchInput.value = "";
      suggestWrapper.textContent = "";
    });
});
