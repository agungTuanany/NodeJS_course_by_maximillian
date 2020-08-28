"use strict";

/*
 * Controller for "customer" views.
 *
 */

// Internal Dependencies
const Product = require("./../models/product.js");
const Cart = require("./../models/cart.js");

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

    console.log(request.user.cart)

    request.user.getCart()
        .then(cart => {
            // console.log(cart);
            return cart.getProducts()
                .then(products => {
                    console.log("getCart ===>",products);
                    response.render("shop/cart", {
                        pageTitle: "Your Cart",
                        path: "/cart",
                        products: products
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));


    // @TODO: re code from callback hell! Is not good code approach
    // Cart.getCart(cart => {

    //     Product.fetchAll(products => {

    //         const cartProducts =[];

    //         for (const product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);

    //             // @TODO: catch the error if '!product'
    //             // @TODO: handle productPrice
    //             if (cartProductData) {
    //                 cartProducts.push({
    //                     productData: product,
    //                     qty: cartProductData.qty
    //                 });
    //             };
    //         };

    //         return response
    //             .status(200)
    //             .render("shop/cart", {
    //                 pageTitle: "Your Cart",
    //                 path: "/cart",
    //                 products: cartProducts
    //             });
    //     });
    // });
};

const postCart = (request, response, next) => {

    const prodId = request.body.productId;
    let fetchedCart;

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

            let newQuantity = 1;

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return fetchedCart.addProduct(product, {
                    through: {
                        quantity: newQuantity
                    }
                })
            };

            return Product.findByPk(prodId)
                .then(product => {

                    //A sequelize magic method | associations:belongs-to-many
                    return fetchedCart.addProduct(product, {
                        through: {
                            quantity: newQuantity
                        }

                    })
                })
                .catch(err => console.log(err));
        })
        .then(() => {
            return response
                .status(301)
                .redirect("/cart");

        })
        .catch(err => console.log(err));

    // Product.findById(prodId, product => {

    //     Cart.addProduct(prodId, product.price);
    // });

    // return response
    //     .status(301)
    //     .redirect("/cart")
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
