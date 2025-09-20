var swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');

cartIcon.addEventListener('click', () => {
  cartTab.classList.add('cart-tab-active');
});

closeBtn.addEventListener('click', () => {
  cartTab.classList.remove('cart-tab-active');
})

let productList = [];
let cartProduct = [];


const showCards = () => {
  productList.forEach(product => {
    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');
    orderCard.innerHTML = `
              <div class="card-image">
                <img src=${product.image} alt>
              </div>
              <h4>${product.name}</h4>
              <h4 class="price">${product.price}</h4>
              <a href="#" class="btn card-btn">Add to Card</a>
        `;
    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector('.card-btn');
    cardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product);
    })
  })
}

const addToCart = (prodect) => {

  const existingProduct = cartProduct.find(iteam => iteam.id === prodect.id);
  if (existingProduct) {
    alert("Item already in your cart");
    return;
  }
  cartProduct.push(prodect);
  let quantity = 1;

  const cartItem = document.createElement('div');
  cartItem.classList.add('iteam');
  cartItem.innerHTML = `
  <div class="iteam-image">
    <img src="${prodect.image}" alt="">
  </div>
  <div class="detail">
    <h4>${prodect.name}</h4>
    <h4 class="iteam-total">${prodect.price}</h4>
  </div>
  <div class="flex">
    <a href="#" class="quantity-btn minus">
      <i class="fa-solid fa-minus"></i>
    </a>
    <h4 class="quantity-value">${quantity}</h4>
    <a href="#" class="quantity-btn plus">
      <i class="fa-solid fa-plus"></i>
    </a>
  </div>    
    `
  cartList.appendChild(cartItem);

  const plusBtn = cartItem.querySelector('.plus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  plusBtn.addEventListener('click', () => {
    quantity++;
    quantityValue.textContent = quantity;
  })
}

const initApp = () => {
  fetch('prodect.json').then(res => res.json()).then(data => {
    productList = data;
    showCards();
  })
}

initApp();