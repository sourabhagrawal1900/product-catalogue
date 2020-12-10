var productList = localStorage.products ? JSON.parse(localStorage.products) : [];
var categoryId = 0;

/**
 * Function to get category object
 */
function fetchCategory(cb) {
    fetch('./data/category-data.json')
        .then(response => {
            if (!response.ok) {
                console.error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            cb(json.data);
        })
        .catch((e) => {
            console.error(e);
        })
}

/**
 * Function to get product list
 */
function fetchProduct(cb) {
    fetch('./data/product-data.json')
        .then(response => {
            if (!response.ok) {
                console.log("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            productList = json.data.products;
            if (!localStorage.products) {
                localStorage.products = JSON.stringify(json.data.products);
            }
            cb();
        })
        .catch((e) => {
            console.error(e);
        })
}

/**
 * Renders the categories list page
 */
function renderSelectBox(data) {
    if (data.categories && data.categories.length > 0) {
        const sel1 = document.getElementById('cat-id');
        if (!localStorage.categoryId) {
            localStorage.categoryId = data.categories[0].id;
        }
        categoryId = parseInt(localStorage.categoryId);
        data.categories.map((value) => {
            let newOption = document.createElement('option');
            newOption.value = value.id;
            newOption.innerHTML = value.name;
            sel1.options.add(newOption);
        })
        sel1.value = localStorage.categoryId;
    }
}

/**
 * Renders the products list page
 *
 * The products list page can optionally be filtered by a category, and will
 * then only show products from that category. This is only used from the
 * categories page, in order to render lists of products with only products
 * from a selected category.
 *
 * @param products
 */
function renderProducts(products) {
    const container = document.getElementById('product-list');
    container.innerHTML = '';
    products.forEach((result, idx) => {
        // Create card element
        const content = `
              <div class="card" onclick="navigateToDetailView(${result.id})">
                  <div class="card-header" id="heading-${idx}">
                    <img src="${result.images}" width="150" height="150" />
                  </div>
                  <div class="card-body">
                    <h5>${result.name}</h5>
                  </div> 
              </div>
            `;
        // Append newly created card element to the container
        container.innerHTML += content;
    });
}

function navigateToDetailView(id) {
    window.location.href = "/productDetail?productId=" + id;
}

function changeCategory(id) {
    let s1 = document.getElementById(id);
    localStorage.categoryId = parseInt(s1.value);
    categoryId = parseInt(localStorage.categoryId);
    filterList();
}

function filterList() {
    if (productList && productList.length > 0) {
        let products = productList.filter((product) => {
            return product.categoryId === categoryId;
        });
        renderProducts(products);
    }
}

function initialPage() {
    fetchCategory(renderSelectBox);
    fetchProduct(() => {
        filterList();
    });
}

initialPage();

