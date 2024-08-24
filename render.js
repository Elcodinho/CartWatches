if (localStorage.getItem("cart")) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const table = document.createElement("table");
  table.classList.add("cart");
  for (let key in cart) {
    let sum = countSum(cart[key].price, cart[key].count);
    const tableInner = `<tr><td><button class="delete button-primary" data-articul=${key}>x</button></td><td><img src=${cart[key].image}></td><td><h4>${cart[key].name}</h4></td><td><button class="minus button-primary" data-articul=${key}>-</button></td><td><span class="count">${cart[key].count}</span></td><td><button class="plus button-primary" data-articul=${key}>+</button></td><td><span class="price">${sum} UAH</span></td></tr>`;
    table.insertAdjacentHTML("beforeend", tableInner);
  }
  // // //
  const totalPrice = countTotal(table);
  // // //

  const total = `<tr><td class="total-row" colspan="7" style="text-align: right;"><span class="total">Total: </span> ${totalPrice} UAH</td></tr>`;
  table.insertAdjacentHTML("beforeend", total);
  document.querySelector(".cart-out").append(table);
}

function countSum(price, amount) {
  return price * amount;
}

function countTotal(table) {
  const spans = table.querySelectorAll("span");
  const pricElements = Array.from(spans).filter((item) =>
    item.classList.contains("price")
  );
  const countElements = Array.from(spans).filter((item) =>
    item.classList.contains("count")
  );

  const priceValues = pricElements.map((item) => parseInt(item.textContent));
  const countValues = countElements.map((item) => parseInt(item.textContent));

  let total = 0;
  for (let i = 0; i < pricElements.length; i++) {
    total += countSum(priceValues[i], countValues[i]);
  }

  return total;
}
