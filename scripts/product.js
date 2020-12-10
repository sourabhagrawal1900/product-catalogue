(function () {
    /**
     * Utilty function to get value for URL
     * @param name
     * @param url
     * @returns {string|null}
     */
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    /**
     * Renders the individual product page
     */
    function renderSingleProduct(product) {
        const container = document.getElementById('product-detail');
        container.innerHTML = '';
        // Create card element
        const content = `
              <div class="product">
                  <div class="product-header">
                    <h3>${product.name}</h3>
                  </div>
                  <div class="product-image">
                    <img src="${product.images}" alt="product-image" />
                  </div>
                  <div class="product-body">
                  <h5>Description:</h5>
                   <p>
                        ${product.descript || "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly normal distribution of letters and words (making it look like normal English), but it’s also Latin, which means your average reader won’t get distracted by trying to read it. It’s perfect for showcasing design work as it should look when fleshed out with text, because it allows viewers to focus on the design work itself, instead of the text. It’s also a great way to showcase the functionality of programs like word processors, font types, and more."}
                   </p>
                    <p>Color: ${product.color || 'Back'}</p>
                    <p>Price: ${product.price || 120}&euro;</p>
                     <p>${product.quantity || 4}  in stock</p>
                  </div> 
              </div>
            `;
        container.innerHTML += content;
    }

  /**
   * Renders the error if no product found
   */
  function noDataExist(product) {
    const container = document.getElementById('product-detail');
    container.innerHTML = '';
    // Create card element
    const content = `
              <div class="error">
                  <h3>Sorry, the product you try to view does not exist.</h3>
              </div>
            `;
    container.innerHTML += content;
  }

    /**
     * API call to get product detail by ID
     */
    function getProductDetail(productId) {
        let products = localStorage.products ? JSON.parse(localStorage.products) : [];
        if (products && products.length > 0) {
            let product = null;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === parseInt(productId)) {
                    product = products[i];
                    break;
                }
            }
           console.log(product)
          if(product) {
            renderSingleProduct(product);
          } else{
            noDataExist();
          }
        }
    }

    function initialPage() {
        const productId = getParameterByName('productId');
        getProductDetail(productId);
    }

    initialPage();
}());
