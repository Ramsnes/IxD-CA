// Get the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const isCartAvailable = urlParams.get("cart");

if (isCartAvailable === "true") {
  // Fetch the cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Update the checkout page with the cart items
  updateCheckoutPage(cartItems);
}

// Update the checkout page with the cart items
function updateCheckoutPage(cart) {
  const orderSummary = document.getElementById("orderSummary");
  const totalAmount = calculateTotalAmount(cart);

  // Clear the orderSummary element
  orderSummary.innerHTML = "";

  // Create the order summary elements
  const orderText = document.createElement("div");
  orderText.classList.add("order-text");
  const heading = document.createElement("h1");
  heading.textContent = "Order summary:";
  const emptyLine = document.createElement("p");
  emptyLine.textContent = "___";

  orderText.appendChild(heading);
  orderText.appendChild(emptyLine);

  // Create a list of cart items
  cart.forEach((item) => {
    const itemLine = document.createElement("p");
    itemLine.textContent = `x${item.quantity} ${item.title} (${item.price})`;

    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemImage.alt = item.title;

    orderText.appendChild(itemLine);
    orderText.appendChild(itemImage);
  });

  const totalLine = document.createElement("p");
  totalLine.textContent = "Total to pay:";
  const totalPrice = document.createElement("p");
  totalPrice.textContent = `€${totalAmount.toFixed(2)}`;

  orderText.appendChild(totalLine);
  orderText.appendChild(totalPrice);

  orderSummary.appendChild(orderText);
}

// Calculate the total amount to pay
function calculateTotalAmount(cart) {
  let totalAmount = 0;

  cart.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });

  return totalAmount;
}
