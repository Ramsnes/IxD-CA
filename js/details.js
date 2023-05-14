const baseUrl = "https://api.noroff.dev/api/v1";
const errorMsg = document.querySelector(".loadingClass");

function getProductId() {
  // given this url: localhost:3000/details.html?id=MY_ID

  // Get the search params from the URL
  const searchParams = new URLSearchParams(window.location.search);

  // Get the value of the "id" parameter
  const id = searchParams.get("id");

  return id;
}

async function fetchProduct(id) {
  // needs to be async since we can't wait for result before code moves on
  const response = await fetch(baseUrl + `/rainy-days/${id}`);
  const data = await response.json();
  return data;
}

async function renderHTML() {
  try {
    const id = getProductId();
    const product = await fetchProduct(id);
    const whatever = document.getElementById("mainJacketWrapper");
    whatever.removeAttribute("class");
    const loading = document.getElementById("loading");
    loading.remove();

    // title change dynamically
    document.title = `Rainy Days - ${product.title}`;

    const description = document.getElementById("description");
    description.innerHTML = product.description;

    const image = document.getElementById("jacketImg");
    image.src = product.image;

    const jacketPrice = document.getElementById("jacketPrice");
    jacketPrice.innerHTML = "Price: " + product.price;

    const header = document.getElementById("header");
    header.innerHTML = product.title;

    const sizes = document.getElementById("sizes");
    sizes.innerHTML = "Sizes available: " + product.sizes;

    // console.log(product);
  } catch (error) {
    errorMsg.innerHTML = `<div class ="error"> There was an error. Contact online support at 555-444-333.<div>
        `;
    // console.log("Please check details.js code for fixing");
  } finally {
    // console.log("try catch error has been handled");
  }
}

renderHTML();
