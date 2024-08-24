if (localStorage.getItem("cart")) {
  render();
}

//Функция отрисовки корзины
function render() {
  const outBlock = document.querySelector(".cart-out");
  outBlock.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cart"));
  const table = document.createElement("table");
  table.classList.add("cart");

  // Отрисовка рядов таблицы с товарами
  for (let key in cart) {
    let sum = countSum(cart[key].price, cart[key].count);
    const tableInner = `<tr><td><button class="delete button-primary" data-articul=${key}>x</button></td><td><img src=${cart[key].image}></td><td><h4>${cart[key].name}</h4></td><td><button class="minus button-primary" data-articul=${key}>-</button></td><td><span class="count">${cart[key].count}</span></td><td><button class="plus button-primary" data-articul=${key}>+</button></td><td><span class="price">${sum} UAH</span></td></tr>`;
    table.insertAdjacentHTML("beforeend", tableInner);
  }

  // Отрисовка ряда таблицы с общей стоимостью товаров

  const totalPrice = countTotal(table);

  const total = `<tr><td class="total-row" colspan="7" style="text-align: right;"><span class="total">Total: </span> ${totalPrice} UAH</td></tr>`;
  table.insertAdjacentHTML("beforeend", total);
  outBlock.append(table);
}

function countSum(price, amount) {
  return price * amount;
}

// Функция подсчета общей стоимости ВСЕХ товаров
function countTotal(table) {
  const priceElements = table.querySelectorAll("span.price");
  let total = 0;

  priceElements.forEach((priceElement) => {
    total += parseInt(priceElement.textContent);
  });

  return total;
}
