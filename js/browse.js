// We follow a URL structure of https://api.noroff.dev/api/<version>/<endpoint>.

// The API base URL for v1 is https://api.noroff.dev/api/v1.

// Each endpoint should be prefixed with this base URL. For example, the full path for getting all jokes using v1 is https://api.noroff.dev/api/v1/jokes.

const mainContainer = document.querySelector(".jacket-block");
const jacketList = document.querySelector(".alljackets");

// console.log({ mainContainer });
const baseUrl = "https://api.noroff.dev/api/v1";
const allEndpoint = "/rainy-days";
const specificEndpoint = "/rainy-days/<id>"; // splitting the url for future useage

// fetch API and it's elements
async function fetchData() {
  // needs to be async since we can't wait for result before code moves on
  const response = await fetch(baseUrl + allEndpoint);
  const data = await response.json();
  // console.log({ data }); // shows element ID's of API
  return data;
}

fetchData();

async function renderHTML() {
  const productList = await fetchData();
  jacketList.innerHTML = ``; // clears the HTML before adding

  productList.forEach(function (element, index) {
    const productElement = document.createElement("li");
    productElement.id = element.id;

    const productContent = `
      <div>
        <h2>${element.title}</h2>
        <p>${element.description}</p>
        <img src="${element.image}" alt="#" />
      </div>
    `;

    productElement.innerHTML = productContent;

    productElement.addEventListener("click", function () {
      // console.log("On click", element.id);
      window.location.href = `details.html?id=${element.id}`;
    });

    jacketList.appendChild(productElement);
  });
}

renderHTML();
