const layout = require('../layout');
const productsRepo = require('../../repositories/products')

module.exports = ({items}) => {
    let cartProducts = '';
    let total = 0;
    if (items.length){
        // Render products and calculate total
        cartProducts = items.map( (item) => {
            total += item.quantity * item.productDetail.price;
            return `
                <li class="cart_item mb-2 d-flex py-1 px-4 border border-1 rounded-3">
                <div class="overflow-hidden text-center" style="width: 80px; height:80px">
                    <img class="h-100 object-fit-cover" src="data:image/png;base64, ${item.productDetail.image}" alt="">
                </div>
                <div class="me-auto d-flex flex-column justify-content-center ms-4">
                    <div class="fw-bolder">${item.productDetail.title}</div>
                    <div class="" style="font-style: italic;">Quantity: ${item.quantity}</div>
                </div>
                <span class="my-auto me-4">Price: ${item.productDetail.price}$</span>
                <form class="d-flex align-items-center" method="POST" action="/cart/product/delete">
                    <input hidden value="${item.id}" name="productID"/>
                    <button class="btn btn-danger h-50 fw-bolder my-auto">Remove</button>
                </form>
                </li>
            `;
        }).join('');
    }
    return layout({
      content: `
        <div class="container-lg" style="height: 70vh;">
          <h1 class="fs-3 mb-4 text-center">Cart</h1>
          <ul class="cart list-unstyled w-100 m-auto overflow-y-auto" style="max-width:800px; max-height: 50vh">
            ${
                !items.length
                ? '<li class="text-center">No item to display</li>'
                : cartProducts
            }
          </ul>
          ${
            items.length
            ? 
            `<div class="d-flex w-50 mx-auto mt-3">
                <h4 class="me-auto">Total: ${total}$</h4>
                <a href="" class="btn btn-success px-5 fw-bold">Buy</a>
            </div>
            `
            : ''
          }
        </div>

        `,
    });
}