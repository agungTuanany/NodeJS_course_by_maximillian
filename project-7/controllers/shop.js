"use strict";

/*
 * Controller for "customer" views.
 *
 * Sat Aug 29 05:07:10 AM WIB 2020
 * @TODO: change all promise with async-await
 *
 */

// Internal Dependencies
const Product = require("./../models/product.js");
// const Order = require("./../models/order.js");

const getProducts = (request, response, next) => {

    Product.fetchAll()
        .then(products => {

            return response
                .status(200)
                .render("shop/index", {
                    pageTitle: "Shop",
                    path: "/",
                    prods: products
                });
        })
        .catch(err => console.log(err));
};

const getProduct = (request, response, next) => {

    const prodId = request.params.productId;

    Product.findById(prodId)
        .then(product => {

            return response
                .status(200)
                .render('shop/product-detail', {
                    pageTitle: product.title,
                    path: '/products',
                    product: product
                });
        })
        .catch(err => console.log(err));
};

const getIndex = (request, response, next) => {

    Product.fetchAll()
        .then(products => {

            return response
                .status(200)
                .render("shop/index", {
                    pageTitle: "Shop",
                    path: "/",
                    prods: products
                });
        })
        .catch(err => console.log(err));
};

const getCart = (request, response, next) => {

    request.user.getCart()
        .then(products => {

            // console.log("===> getCart shop models:", products);
            return response.render("shop/cart", {
                pageTitle: "Your Cart",
                path: "/cart",
                products: products
            });
        })
        .catch(err => console.log(err));
};

const postCart = (request, response, next) => {

    const prodId = request.body.productId;

    Product.findById(prodId)
        .then(product => {

            return request.user.addToCart(product);
        })
        .then(result => {                           // This chain is from db.collection("users").updateOne()

            console.log("===> postCart:", result);
        })
        .catch(err => console.log(err));

    // let fetchedCart;
    // let newQuantity = 1;

    // request.user.getCart()
    //     .then(cart => {

    //         fetchedCart = cart;
    //         return cart.getProducts({
    //             where: {
    //                 id: prodId
    //             }
    //         });
    //     })
    //     .then(products => {

    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         };

    //         if (product) {
    //             const oldQuantity = product.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return product;
    //         };
    //         return Product.findByPk(prodId)
    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct(product, {
    //             through: {
    //                 quantity: newQuantity
    //             }
    //         })
    //     })
    //     .then(() => {
    //         return response
    //             .status(301)
    //             .redirect("/cart");

    //     })
    //     .catch(err => console.log(err));
};

const postCartDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    request.user.getCart()
        .then(cart => {

            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {

            const product = products[0]
            return product.cartItem.destroy()
        })
        .then(result => {

            return response
                .status(301)
                .redirect("/cart");
        })
        .catch(err => console.log(err));
};

// @TODO work in this controllers with Sequelize
const getCheckout = (request, response, next) => {

    return response
        .status(200)
        .render("shop/checkout", {
            pageTitle: "Checkout Page",
            path: "/checkout",
        });
};

const postOrder = (request, response, next) => {

    let fetchedCart;
    request.user.getCart()
        .then(cart => {

            fetchedCart = cart;
            return cart.getProducts()
        })
        .then(products => {

            // @NOTE: createOrder() method present cause we called user.createCart() in app.js
            return request.user.createOrder()
            // @TODO: get rid from nested .then(); bad approach!!
                .then(order => {

                    order.addProducts(products.map(product => {

                        product.orderItem = { quantity: product.cartItem.quantity }
                        // console.log("==========>", product.orderItem)
                        return product;
                    }))
                })
                .catch(err => console.log(err));
        })
        .then(result => {

            console.log("===========> fetchedCart", fetchedCart);
            return fetchedCart.setProducts(null);
        })
        .then(result => {

            return response
                .status(301)
                .redirect("/orders");

        })
        .catch(err => console.log(err));
};

const getOrders = (request, response, next) => {

     // @NOTE: using concept "eager loading" in Sequelize.
    request.user.getOrders({include: ["products"]})
        .then(orders => {

            console.log(orders)
            return response
                .status(200)
                .render("shop/orders", {
                    pageTitle: "Orders Page",
                    path: "/orders",
                    orders: orders
                });
        })
        .catch(err => console.log(err));
};

module.exports = {
    getProducts,
    getProduct,
    getIndex,
    getCart,
    postCart,
    postCartDeleteProduct,
    getCheckout,
    postOrder,
    getOrders
};

/*
 * @NOTE: why use @param: "include:["products"]" ? Because in app.js we associate
 * "Order. @param: belongsToMany(Product, { through: OrderItem });".  Sequelize pluralize
 * "product" as a model then we use concept eager loading; and basically
 * instruct Sequelize if Sequelize fetch all the "orders" please also fetch all
 * related "products" already and give the "orders" data back, and one array of
 * "orders" that also includes the "products" per "order"
 *
 */
