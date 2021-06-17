const result = document.querySelector(".result");

const fetchProducts = async () => {
  try {
    // const { data } = await axios.get("/api/airtable_api");
    const { data } = await axios.get("/api/product_combined");
    const products = data
      .map((product) => {
        const { id, url, name, price } = product;
        return `<a href="product.html?id=${id}" class="product">
            <img src="${url}" alt="${name}"/>
            <div class="info">
                <h5>${name}</h5>
                <h5 class="price">$${price}</h5>
            </div>
        </a>`;
      })
      .join("");
    result.innerHTML = products;
  } catch (e) {
    result.innerHTML = "<h4>There was an error when fetching</h4>";
  }
};

fetchProducts();
