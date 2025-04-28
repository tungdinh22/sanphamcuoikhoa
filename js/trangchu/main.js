const root_url = "https://free-e-store-api.onrender.com/api/v1/products";

function getImageUrl(product_name) {
  return `https://free-e-store-api.onrender.com/images/products/${product_name}`;
}
// get all products from api   ----------------------------------------------------
function getProductByCategory(category = "all") {
  // lay thanh phan chua cac item trong HTML
  const productContainer = document.getElementById("products");
  productContainer.innerHTML = ""; // xoa het cac item cu di

  // loc du lieu theo category
  let url = root_url;
  if (category !== "all") {
    url += `?type=${category}`;
  }
  // lay du lieu tu api
  fetch(url)
    .then((response) => response.json()) // json => js object
    .then((data) => {
      // load du lieu len giao dien
      const products = data.data.products;
      products.forEach((product) => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";
  card.style = "width: 18rem";

  const img = document.createElement("img");
  img.src = getImageUrl(product.images[0]);
  img.className = "card-img-top";
  img.style = "height: 200px; object-fit: contain; padding-top: 10px";
  img.alt = product.name;
  card.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerHTML = product.name;
  cardBody.appendChild(cardTitle);

  const cardPrice = document.createElement("div");
  cardPrice.className = "card-price";

  const actualPrice = document.createElement("p");
  actualPrice.className = "actual-price";
  actualPrice.innerHTML = formatVND (product.price * 25000)


  const normalPrice = document.createElement("p");
  normalPrice.className = "normal-price";
  normalPrice.innerHTML = formatVND (product.realPrice * 25000)
 
  cardPrice.appendChild(actualPrice);
  cardPrice.appendChild(normalPrice);
  cardBody.appendChild(cardPrice);

  const btn = document.createElement("a");
  btn.className = "btn";
  btn.innerHTML = "See details!";
  // bat su kien cho button chuyen trang detail
  btn.addEventListener("click", () => {
    getProductById(product.id);
  });
  cardBody.appendChild(btn);
  card.appendChild(cardBody);
  return card;
}
// Chon xem chi tiet 1 san pham bang id ----------------------------------------------------
function getProductById(id) {
  fetch(`${root_url}?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      // luu du lieu vao local storage de truy cap o trang khac
      localStorage.setItem(
        "currentProduct",
        JSON.stringify(data.data.products[0])
      );
      // chuyen trang den trang chi tiet
      window.location.href = "./html/chitiet.html";
    })
    .catch((error) => {
      console.log(error);
    });
}

// bat su kien khi chuyen category ----------------------------------------------------
document.getElementById("categories").addEventListener("click", (event) => {
  const category = event.target.id;
  getProductByCategory(category);
  // chuyen active cho category da chon
  const categories = document.getElementById("categories");
  categories.querySelectorAll("a").forEach((item) => {
    // xoa het class active
    item.classList.remove("active");
  });
  // them class active cho category duoc chon
  event.target.classList.add("active");
});

getProductByCategory();
 
function formatVND(amount) {
  if (isNaN(amount)) return '0 ₫';
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
}



