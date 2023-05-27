// Fetch cart items from local storage
function fetchCartItems() {
  // Get the cart from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Get the cartItems and cartButtons elements
  const cartItems = document.getElementById("cartItems");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const cartButtons = document.getElementById("cartButtons");

  // Clear the cartItems element
  cartItems.innerHTML = "";

  // If the cart is empty, display the empty cart message and hide the cart buttons
  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartButtons.style.display = "none";
  } else {
    emptyCartMessage.style.display = "none";
    cartButtons.style.display = "block";

    // Render each cart item
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      const title = document.createElement("p");
      title.textContent = item.title;
      cartItem.appendChild(title);

      const price = document.createElement("p");
      price.textContent = "Price: " + item.price;
      cartItem.appendChild(price);

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.title;
      cartItem.appendChild(image);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => removeFromCart(item.id));
      cartItem.appendChild(removeButton);

      cartItems.appendChild(cartItem);
    });
  }
}

// Remove item from cart
function removeFromCart(itemId) {
  // Get the cart from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Filter out the item to remove
  const updatedCart = cart.filter((item) => item.id !== itemId);

  // Save the updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Fetch and render the updated cart items
  fetchCartItems();
}

// Call the fetchCartItems function to populate the cart and handle empty cart message
fetchCartItems();
