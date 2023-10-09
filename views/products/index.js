const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="card" >
                  <div class="d-flex justify-content-center align-items-center overflow-hidden" style="height: 340px">
                    <img style="max-height: 100%; width: auto" class="card-img-top" src="data:image/png;base64, ${product.image}"  alt="..." >
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <form method="POST" action="/cart/products" >
                      <button class="btn btn-success d-block mx-5 border-0">
                        <input hidden value="${product.id}" name="productID" />
                        <i class="fa fa-shopping-cart"></i> 
                        Add to Cart
                      </button>
                    </form>
                  </div>
                </div>
          </div>
      `;
    })
    .join("\n");

  return layout({
    content: `
      <section class="banner">
        <div class="container-lg">
          <div class="text-center">
            <img class="w-100" src="/images/banner.jpg" />
          </div>
        </div>
      </section>
      
      <section>
        <div class="container">
          <div class="columns">
            <div class="column "></div>
            <div class="column is-four-fifths">
              <div>
                <h2 class="title text-center fs-3 my-4">Featured Items</h2>
                <div class="row gy-4">
                  ${renderedProducts}
                </div>
              </div>
            </div>
            <div class="column "></div>
          </div>
        </div>
      </section>
    `,
  });
};
