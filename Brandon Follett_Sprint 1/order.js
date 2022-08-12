if (document.readyState == "loading") {
  document.addEventListener("DOMConenetLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeOrderItemsButtons = document.getElementsByClassName("btn_danger");
  console.log(removeOrderItemsButtons);
  for (var i = 0; i < removeOrderItemsButtons.length; i++) {
    var button = removeOrderItemsButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("order_quantity_input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("ato");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn_purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert(
    "Thank you for your order, We will soon contact you with an estimated pick-up time!"
  );
  var cartItems = document.getElementsByClassName("order_items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateOrderTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateOrderTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateOrderTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  addItemToCart(title, price);
  updateOrderTotal();
}

function addItemToCart(title, price) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart_row");
  var cartItems = document.getElementsByClassName("order_items")[0];
  var cartItemNames = cartItems.getElementsByClassName("order_item_title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item has already been added to your order");
      return;
    }
  }
  var cartRowContents = `<div class="order_item order_col">
  <span class="order_item_title shop-item-title"
    >${title}</span
  >
</div>
&nbsp;
<span class="order_price order_col">${price}</span>
&nbsp;
<div class="order_quantity order_col">
  <input class="order_quantity_input" type="number" value="1" />
  <button
    class="btn btn_danger order_quantity_button"
    role="button"
  >
    Remove
  </button>
</div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn_danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("order_quantity_input")[0]
    .addEventListener("change", quantityChanged);
}

function updateOrderTotal() {
  var orderItemContainer = document.getElementsByClassName("order_items")[0];
  var cartRows = orderItemContainer.getElementsByClassName("cart_row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("order_price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "order_quantity_input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", " "));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  //   total = Math.round(total * 100) / 100;
  document.getElementsByClassName("order_total_price")[0].innerText =
    "$" + total;
}
