"use strict";

/*
 * Controller for all "product" either admin-product or user-product
 *
 * XXX  NOTE FIXME:
 * @param product.push() is returning with a new array; caused the data can be seen
 * with unauthorized requested user; That cause the @param requested.body.title
 * is always stream until the server reloaded. This a BAD APPROACH!!
 * XXX
 */

// Global variables
const products = [];

const getAddProduct = (request, response, next) => {

    return response
        .status(200)
        .render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        hasProduct: products.length > 0,
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

const postAddProduct = (request, response, next) => {

    if (request.body.title === "") {
        //@TODO: Create notice word if string empty
        return response
            .status(302)
            .render("add-product", {
                pageTitle: "Add Product",
                path: "/admin/add-product",
                hasProduct: products.length > 0
            });
    };

    products.push({
        title: request.body.title
    });

    return response.status(302).redirect("/");
};

const getProduct = (request, response, next) => {

    return response.render("shop", {
        products,
        pageTitle: "Shop Page",
        path: "/",
        hasProduct:  products.length> 0,
        activeShop: true,
        productCSS: true
    });
}

module.exports = {
    getAddProduct,
    postAddProduct,
    getProduct
}
