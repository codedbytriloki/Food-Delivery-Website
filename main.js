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
const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = document.querySelector('.fa-bars');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('mobile-active');
})

hamburger.addEventListener('click', () => {
  bars.classList.toggle('fa-xmark');
})

cartIcon.addEventListener('click', () => {
  cartTab.classList.add('cart-tab-active');
});

closeBtn.addEventListener('click', () => {
  cartTab.classList.remove('cart-tab-active');
})

let productList = [];
let cartProduct = [];

const updateTotal = () => {

  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll('.iteam').forEach(item => {
    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
    const price = parseFloat(item.querySelector('.iteam-total').textContent.replace('$', ''));

    totalPrice += price;
    totalQuantity += quantity;
  });
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
}

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
  let price = parseFloat(prodect.price.replace('$', ''))

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
  updateTotal();

  const plusBtn = cartItem.querySelector('.plus');
  const minusBtn = cartItem.querySelector('.minus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const iteamTotal = cartItem.querySelector('.iteam-total');

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    iteamTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    updateTotal();
  })

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      iteamTotal.textContent = `$${(price * quantity).toFixed(2)}`;
      updateTotal();
    }
    else {
      cartItem.classList.add('slide-out');
      setTimeout(() => {
        cartItem.remove();
        cartProduct = cartProduct.filter(item => item.id !== prodect.id);
        updateTotal();
      }, 300)
    }
  })

}

const initApp = () => {
  fetch('prodect.json').then(res => res.json()).then(data => {
    productList = data;
    showCards();
  })
}

initApp();