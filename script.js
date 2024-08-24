const table = document.querySelector(".cart");
if (table) {
  table.addEventListener("click", (event) => deleteFromCart(event));
  table.addEventListener("click", (event) => counterInCart(event));
}

// Функция удаления элемента с корзины
function deleteFromCart(event) {
  const target = event.target;
  const totalPrice = table.querySelector(".total-row");
  if (target.classList.contains("delete")) {
    target.closest("tr").remove(); //удаляем элемент из корзины
    totalPrice.innerHTML = `<span class="total">Total: </span> ${countTotal(
      table
    )} UAH`; // считаем общую стоимость ВСЕХ товаров
    changeLocal("delete", target); // удаляем элемент из LocalStorage
    if (document.querySelectorAll(".cart tr").length < 2) {
      const tbodies = document.querySelectorAll("tbody");

      let targetTbody = null;

      tbodies.forEach((tbody) => {
        if (tbody.querySelector("td.total-row")) {
          targetTbody = tbody;
        }
      });

      targetTbody.remove();
    }
  }
}

// Функция увеличения и уменьшения кол-ва товара в корзине
function counterInCart(event) {
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
      changeLocal("plus", target);
    } else if (target.classList.contains("minus")) {
      if (amount > 1) {
        amount--;
        count.textContent = amount;
        changeLocal("minus", target);
      } else {
        row.remove();
        changeLocal("minus", target, true);
      }
    }

    countRowPrice(row, amount, target); //после изменения кол-ва одинаковых товаров считаем их общую стоимость
    totalPrice.innerHTML = `<span class="total">Total: </span> ${countTotal(
      table
    )} UAH`; // считаем общую стоимость ВСЕХ товаров
  }
}

// Функция подсчета итоговой стоимости одного конкретного товара
function countRowPrice(row, amount, target) {
  const rowPrice = row.querySelector(".price");
  let price = 0;
  const data = JSON.parse(localStorage.getItem("cart"));
  for (let key in data) {
    if (key === target.dataset["articul"]) {
      price = data[key].price;
    }
  }
  rowPrice.textContent = `${countSum(price, amount)} UAH`;
}

// Функция получения данных с LocalStorage
function getFromLocal() {
  const data = JSON.parse(localStorage.getItem("cart"));
  if (data) {
    const map = new Map(Object.entries(data));
    return map;
  }
}

// Функция изменения данных внутри LocalStorage
function changeLocal(arg, target, lastMinus = false) {
  const map = getFromLocal();
  const articul = target.dataset["articul"];

  if (arg === "delete" || (arg === "minus" && lastMinus === true)) {
    map.delete(articul);
  } else if (arg === "plus") {
    const item = map.get(articul);
    item.count = item.count + 1;
    map.set(articul, item);
  } else if (arg === "minus") {
    const item = map.get(articul);
    item.count = item.count - 1;
    map.set(articul, item);
  }

  const dataObj = Object.fromEntries(map);
  localStorage.setItem("cart", JSON.stringify(dataObj));
}
