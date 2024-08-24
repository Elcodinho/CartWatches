const table = document.querySelector(".cart");
table.addEventListener("click", deleteFromCart);
table.addEventListener("click", counterInCart);

// Функция удаления элемента с корзины
function deleteFromCart() {
  const target = event.target;
  if (target.classList.contains("delete")) {
    target.closest("tr").remove();
  }
}

// Функция увеличения и уменьшения кол-ва товара в корзине
function counterInCart() {
  const target = event.target;
  if (target.classList.contains("plus") || target.classList.contains("minus")) {
    const table = document.querySelector(".cart");
    const totalPrice = table.querySelector(".total-row");

    const row = target.closest("tr");
    const count = row.querySelector(".count");
    let amount = +count.textContent;
    if (target.classList.contains("plus")) {
      amount++;
      count.textContent = amount;
    } else if (target.classList.contains("minus")) {
      if (amount > 1) {
        amount--;
        count.textContent = amount;
      } else {
        row.remove();
      }
    }

    countRowPrice(row, amount, target);
    totalPrice.innerHTML = `<span class="total">Total: </span> ${countTotal(
      table
    )} UAH`;
  }
}

function countRowPrice(row, amount, target) {
  const priceInTable = row.querySelector(".price");
  let price = 0;
  const data = JSON.parse(localStorage.getItem("cart"));
  for (let key in data) {
    if (key === target.dataset["articul"]) {
      price = data[key].price;
    }
  }
  priceInTable.textContent = `${countSum(price, amount)} UAH`;
}
