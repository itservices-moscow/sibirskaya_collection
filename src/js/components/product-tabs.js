const subitems = document.querySelectorAll('.subitem');
let currentIndex = 0;

function updateCurrentItem() {
  subitems.forEach(function (subitem, index) {
    const productTab = subitem.getAttribute('data-product-tab');
    const productContent = document.querySelector('.product-content[data-product-tab="' + productTab + '"]');

    if (index === currentIndex) {
      productContent.classList.add('active');
    } else {
      productContent.classList.remove('active');
    }

    if (index <= currentIndex) {
      subitem.classList.add('hidden');
    } else {
      subitem.classList.remove('hidden');
    }
  });

  const subitemName = subitems[currentIndex].querySelector('.subitem__name').innerText;
  document.getElementById('product-tab-title').innerText = subitemName;

  document.getElementById('product-number').innerText = (currentIndex + 1).toString().padStart(2, '0');
}

subitems.forEach(function (subitem, index) {
  subitem.addEventListener('click', function () {
    currentIndex = index;
    updateCurrentItem();
  });
});
document.getElementById('product-next').addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % subitems.length;
  updateCurrentItem();
});
document.getElementById('product-prev').addEventListener('click', function () {
  currentIndex = (currentIndex - 1 + subitems.length) % subitems.length;
  updateCurrentItem();
});
updateCurrentItem();
