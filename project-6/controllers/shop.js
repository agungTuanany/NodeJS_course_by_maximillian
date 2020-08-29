"use strict";

/*
 * Controller for "customer" views.
 *
 * Sat Aug 29 05:07:10 AM WIB 2020
 * @TODO: change all promise with async-await
 */

// Internal Dependencies
const Product = require("./../models/product.js");
const Order = require("./../models/order.js");

const getProducts = (request, response, next) => {

    Product.findAll()
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

    // @NOTE: Another approach for getProduct
    // Product.findAll({
    //     where: {
    //         id: prodId
    //     }
    // })
    //     .then(products => {
    //
    //         console.log(products)
    //         response.render('shop/product-detail', {
    //             pageTitle: products[0].title,
    //             path: '/products',
    //             product: products[0]
    //         });
    //     })
    //     .catch(err => console.log(err));

    Product.findByPk(prodId)
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

    Product.findAll()
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

    // console.log("request.user ===>", request.user)

    request.user.getCart()
        .then(cart => {
            // console.log(cart);
            return cart.getProducts()
                .then(products => {
                    // console.log("getCart ===>",products);
                    response.render("shop/cart", {
                        pageTitle: "Your Cart",
                        path: "/cart",
                        products: products
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

const postCart = (request, response, next) => {

    const prodId = request.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    request.user.getCart()
        .then(cart => {

            fetchedCart = cart;
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {

            let product;
            if (products.length > 0) {
                product = products[0];
            };

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            };
            return Product.findByPk(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQuantity
                }
            })
        })
        .then(() => {
            return response
                .status(301)
                .redirect("/cart");

        })
        .catch(err => console.log(err));
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

const getCheckout = (request, response, next) => {

    return response
        .status(200)
        .render("shop/checkout", {
            pageTitle: "Checkout Page",
            path: "/checkout",
        });
};

const postOrder = (request, response, next) => {

    request.user.getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            // @NOTE: createOrder() method present cause we called user.createCart() in app.js
            return request.user.createOrder()
            // @TODO: get rid from nested .then(); bad approach!!
                .then(order => {
                    order.addProducts(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity }
                        return product;
                    }))
                })
                .catch(err => console.log(err));
            // console.log("postOrder products ==>", products);
        })
        .then(result => {
            response
                .status(301)
                .redirect("/orders");
        })
        .catch(err => console.log(err));
};

const getOrders = (request, response, next) => {

    return response
        .status(200)
        .render("shop/orders", {
            pageTitle: "Orders Page",
            path: "/orders",
        });
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
