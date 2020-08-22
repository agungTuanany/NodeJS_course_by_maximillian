"use strict";

/*
 * Controller for "customer" views.
 *
 */

// Internal Dependencies
const Product = require("./../models/product.js");
const Cart = require("./../models/cart.js");

const getProducts = (request, response, next) => {

    Product.fetchAll(products => {

        return response
            .status(200)
            .render("shop/product-list", {
                products,
                pageTitle: "All Products",
                path: "/products"
            });
    });
};

const getProduct = (request, response, next) => {

    const prodId = request.params.productId;

    // Fetch product
    Product.findById(prodId, product => {

        return response.render("shop/product-detail", {
            product,
            pageTitle: product.title,
            path: "/products"
        });
    });
};

const getIndex = (request, response, next) => {

    return response
        .status(200)
        .render("shop/index", {
            pageTitle: "Index Page",
            path: "/"
        });

};

const getCart = (request, response, next) => {

    // @TODO: re code from callback hell! Is not good code approach
    Cart.getCart(cart => {

        Product.fetchAll(products => {

            const cartProducts =[];

            for (const product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);

                // @TODO: catch the error if '!product'
                // @TODO: handle productPrice
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                };
            };

            return response
                .status(200)
                .render("shop/cart", {
                    pageTitle: "Your Cart",
                    path: "/cart",
                    products: cartProducts
                });
        });
    });
};

const postCart = (request, response, next) => {

    const prodId = request.body.productId;

    // console.log(prodId)
    Product.findById(prodId, product => {

        Cart.addProduct(prodId, product.price);
    });

    return response
        .status(301)
        .redirect("/cart")
};

const postCartDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    Product.findById(prodId, product => {

        // Fri 21 Aug 2020 10:24:58 PM WIB
        // @TODO: make if block statement; if deletion is succeeded go to
        // redirect if not warn the user. Because we access a file in there,
        // theoretically we should use callback here.
        Cart.deleteProduct(prodId, product.price);
        return response
            .status(301)
            .redirect("/cart");
    });
};

const getCheckout = (request, response, next) => {

    return response
        .status(200)
        .render("shop/checkout", {
            pageTitle: "Checkout Page",
            path: "/checkout",
        });
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
    getOrders
};
