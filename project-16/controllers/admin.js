"use strict";

/*
 * Controller for all "product" either admin-product or user-product
 *
 * @param: save() at @param: postAddProduct(), is a method provided by mongoose
 */

// 3rd party Dependencies
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Internal Dependencies
const Product = require("./../models/product.js");
const fileHelper = require("./../lib/file.js");

// Global variables

const getProducts = (request, response, next) => {

    Product.find({ userId: request.user._id })
        // .select("title price -_id")          // which field you want retrieve from database
        // .populate("userId", "firstName")     // retrieve any field instead writing query on your own
        .then(product => {

            // console.log("====>", product)
            return response.render('admin/products', {
                pageTitle: "Admin Products",
                path: '/admin/products',
                products: product,
            });
        })
        .catch(err => {

            console.log("===> An error occured:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });

};

const getAddProduct = (request, response, next) => {

    return response
        .status(200)
        .render("admin/edit-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: false,
            hasError: false,
            errorMessage: null,
            validationErrors: []
        });
};

const postAddProduct = (request, response, next) => {

    // const title       = typeof(request.body.title) === "string" && request.body.title.trim().length > 0 ? request.body.title : false;
    // const price       = typeof(parseFloat(request.body.price)) === "number" && parseFloat(request.body.price.length) > -1 ? parseFloat(request.body.price) : false;
    // const imageUrl    = typeof(request.body.image) === "string" && request.body.image.trim().length > 0 ? request.body.image : false;
    // const description = typeof(request.body.description) === "string" && request.body.description.trim().length > 0 ? request.body.description : false;

    const title       = request.body.title;
    const image       = request.file;
    const price       = request.body.price;
    const description = request.body.description;

    // Validation Check the image is defined for multer
    if (!image) {
        // console.log("===> validationResult errors:", errors.array())
        return response
            .status(422)
            .render('admin/edit-product', {
                pageTitle: "Add Product",
                path: '/admin/add-product',
                editing: false,
                hasError: true,
                product: {
                    title: title,
                    price: price,
                    description: description
                },
                errorMessage: "Attached file is not an image",
                validationErrors: []
            });
    }

    // console.log("===> imageUrl:", imageUrl)
    const errors = validationResult(request);

    // Validation Check
    if (!errors.isEmpty()) {
        console.log("===> validationResult errors:", errors.array())
        return response
            .status(422)
            .render('admin/edit-product', {
                pageTitle: "Add Product",
                path: '/admin/add-product',
                editing: false,
                hasError: true,
                product: {
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            });
    };

    const imageUrl = image.path

    //(title, price, imageUrl, description, id, userId)
    const product = new Product({
        // _id         : new mongoose.Types.ObjectId("5f541166c8d34519048a04c5"), // @NOTE: Constructed scenario
        title       : title,
        price       : price,
        imageUrl    : imageUrl,
        description : description,
        userId      : request.user
    })

    product.save()
        .then(result => {

            return response
                .status(301)
                .redirect("/admin/products");
        })
        .catch(err => {

            console.log("===> An error occured!");
            console.log("===>", err);
            // // @NOTE: Option 1. Return Response
            // return response
            //     .status(500)
            //     .render('admin/edit-product', {
            //         pageTitle: "Add Product",
            //         path: '/admin/add-product',
            //         editing: false,
            //         hasError: true,
            //         product: {
            //             title: title,
            //             imageUrl: imageUrl,
            //             price: price,
            //             description: description
            //         },
            //         errorMessage: "Database operation falied, please try again",
            //         validationErrors: []
            //     });

            // // @NOTE: Option 2. Return Response
            // return response
            //     .status(500)
            //     .redirect("/500");
            // throw new Error()

            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

// http://localhost:8080/admin/edit-product/123aabb?edit=true
const getEditProduct = (request, response, next) => {

    const editMode = request.query.edit;

    if (!editMode) {
        return response
            .status(301)
            .redirect("/");
    };

    const prodId = request.params.productId;

    Product.findById(prodId)
        .then(product => {

            // throw new Error("Dummy Error") // @NOTE: Constructed scenario

            // @NOTE: It's bad approach in UX, most of the time you want to show an error instead redirect
            // @TODO: Create a flash error message and redirect back into '/admin/product' with EJS template with message.
            if(!product) {
                return response
                    .status(301)
                    .redirect("/")
            };

            return response
                .status(200)
                .render('admin/edit-product', {
                    pageTitle: "Edit Product",
                    path: '/admin/edit-product',
                    editing:editMode,
                    product: product,
                    hasError: false,
                    errorMessage: null,
                    validationErrors: []
                });
        })
        .catch(err => {

            console.log("===> An error occured:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

const postEditProduct = (request, response, next) => {

    const prodId          = request.body.productId;
    const updatedTitle    = request.body.title;
    const updatedPrice    = request.body.price;
    const image           = request.file;
    const updatedDesc     = request.body.description;

    const errors = validationResult(request);

    // Validation Check
    if (!errors.isEmpty()) {
        console.log("===> validationResult errors:", errors.array())
        return response
            .status(422)
            .render('admin/edit-product', {
                pageTitle: "Edit Product",
                path: '/admin/edit-product',
                editing: true,
                hasError: true,
                product: {
                    title: updatedTitle,
                    // imageUrl: updatedImageUrl,
                    price: updatedPrice,
                    description: updatedDesc,
                    _id: prodId
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            });
    };


    //(title, price, imageUrl, description, id)
    // const product = new Product(updatedTitle, updatedPrice, updatedImageUrl, updatedDesc, prodId);

    Product.findById(prodId)
        .then(product => {

            if (product.userId.toString() !== request.user._id.toString()) {
                return response
                    .status(302)
                    .redirect("/")
            };

            product.title       = updatedTitle;
            product.price       = updatedPrice;
            product.description = updatedDesc;

            if (image) {
                fileHelper/deleteFile(product.imageUrl);
                product.imageUrl    = image.path;
            };

            return product.save()
                .then(result => {

                    console.log("Succeeded update product");
                    return response
                        .status(301)
                        .redirect("/admin/products");
                });
        })
        .catch(err => {

            console.log("===> An error occured:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

const postDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    Product.findById(prodId)
        .then(product => {

            if (!product) {
                return next(new Error("Deleted Product not found"));
            };

            fileHelper.deleteFile(product.imageUrl);
            return Product.deleteOne({
                _id: prodId,
                userId: request.user._id
            });
        })
        .then(() => {

            console.log("Destroyed Product");
            response.redirect("/admin/products");
        })
        .catch(err => {

            console.log("===> An error occured:", err);
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

module.exports = {
    getProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
};
