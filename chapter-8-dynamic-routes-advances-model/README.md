# Chapter-8 Dynamic Routes Advances Model

## Table of Contents
1. [Adding a Cart Model](#adding-a-cart-model)
2. [Module Summary](#module-summary)

<br/>

## Adding a Cart Model

I don't grasp the logic, so I just try to write what the logic behind the
[Cart.js](./../project-4/models/cart.js). cause this is important **logic code**.

### Why not using constructor on Cart class

what we need on this cart `model` is a way to `add` and `remove` product. The
problem we have is the cart is itself is not really an `object`; we'll constantly
(continually) recreate; not for every new product that we add we want to have
a new single cart. Instead there always will be a cart in our application and we
want to manage the product in `cart.json` (as we just write down our data as
a json; soon will put the data in database).

So the approach is actually be a different one, In Cart.js we use **static**
`method`.

###

```javascript
const Cart = class Cart(id) {

    static addProduct(id, productPrice) {

        // Fetch the previous cart
        fs.readFile(p, "utf8", (err, data) => {

            let cart = {
                products: [],
                totalPrice: 0
            };

            if (!err && data) {
                cart = JSON.parse(data);
                // This console.log will fired up after 'cart.json' exist;
                console.log("cart.js ===> fs.readFile:", cart);
                }
                else {
                console.log("ERROR: you don't have 'cart.json' flie");

                // Uncomment this for production
                // return;
            };

            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === id);     // [1.a] search existing product from product index that match with the request.body
            const existingProduct = cart.products[existingProductIndex];                            // [1.b] put found 'id' into temporary 'cart' object
            let updatedProduct;

            // Add new Product | increase quantity
            if (existingProduct) {                                                                  // [2]
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];                                                 // [2.a] copying the old array
                cart.products[existingProductIndex] = updatedProduct;                               // [2.b] overwrite exisitingProduct and replace into updatedProduct
            }
            // Add product to cart for 1st time.
            else {
                updatedProduct = {
                id: id,
                qty: 1
                };

                cart.products = [...cart.products, updatedProduct];                                 // [2.a.a] add updatedProduct as a new additional product
            };

            cart.totalPrice = cart.totalPrice + productPrice;                                       // [3] add the price for each products into single entity

            fs.writeFile(p, JSON.stringify(cart, null, 4), (err) => {                               // [4] rewrite cart.json

                if (err) {
                    console.log("addProduct Error:", err);
                    return;
                }
                else {
                    console.log("writed cart.json file with data:", cart);
                    console.log("addProduct Error:", err); // result null
                    return;
                };
            });
        });
    };
};
```

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Module Summary

![chapter-8-1.gif](./images/gif/chapter-8-1.gif "Module Summary")
<br/>

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

