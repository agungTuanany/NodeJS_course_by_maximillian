"use strict";

/*
 * Controller for "customer" views.
 *
 * Sat Aug 29 05:07:10 AM WIB 2020
 * @TODO: change all promise with async-await
 *
 * @param: ._doc is a mongoose special field to access just the data
 */

// Core Dependencies
const fs   = require("fs");
const path = require("path");

// 3rd party Dependencies
const PDFDocument = require("pdfkit");
const stripe = require('stripe')('sk_test_cVADl5LfP2UhZsHwYj2u6W6Q');

// Internal Dependencies
const Product = require("./../models/product.js");
const Order   = require("./../models/order.js");

// Global Variables
const ITEMS_PER_PAGE = 1;

const getProducts = (request, response, next) => {

    const page = +request.query.page || 1;
    let totalItems;

    Product.find()
        .countDocuments()
        .then(numberOfProducts => {

            totalItems = numberOfProducts;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products => {

            return response
                .status(200)
                .render("shop/product-list", {
                    pageTitle: "Product",
                    path: "/products",
                    products: products,
                    totalProducts: totalItems,
                    currentPage: page,
                    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
                });
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
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
                    product: product,
                });
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

const getIndex = (request, response, next) => {

    const page = +request.query.page || 1;
    let totalItems;

    Product.find()
        .countDocuments()
        .then(numberOfProducts => {

            totalItems = numberOfProducts;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products => {

            return response
                .status(200)
                .render("shop/index", {
                    pageTitle: "Shop",
                    path: "/",
                    prods: products,
                    totalProducts: totalItems,
                    currentPage: page,
                    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
                });
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

const getCart = (request, response, next) => {

    console.log("====> getCart request.user", request.user);
    request.user.populate("cart.items.productId")   //  cause populate() doesn't return a promise
        .execPopulate()
        .then(user => {

            // console.log("====> getCart:", user.cart.items);
            const products = user.cart.items;
            return response.render("shop/cart", {
                pageTitle: "Your Cart",
                path: "/cart",
                products: products,
            });
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

const postCart = (request, response, next) => {

    const prodId = request.body.productId;

    Product.findById(prodId)
        .then(product => {

            return request.user.addToCart(product);
        })
        .then(result => {

            console.log("====> postCart:", result);
            return response
                .status(301)
                .redirect("/cart");
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

const postCartDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    request.user.removeFromCart(prodId)
        .then(result => {

            console.log("====> postCartDeleteProduct", result);
            return response
                .status(301)
                .redirect("/cart");
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

const postOrder = (request, response, next) => {

    request.user.populate("cart.items.productId")
        .execPopulate()
        .then(user => {

            console.log("====> postOrder:", user.cart.items);
            const products = user.cart.items.map(i => {

                return {
                    product  : { ...i.productId._doc },
                    quantity : i.quantity
                };
            });

            const order = new Order({
                user: {
                    email: request.user.email,
                    userId: request.user
                },
                products: products
            });

            order.save();
        })
        .then(() => {

          return request.user.clearCart();
        })
        .then(()=> {

            return response
                .status(301)
                .redirect("/orders");
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

const getOrders = (request, response, next) => {

    Order.find({ "user.userId": request.user._id })
        .then(orders => {

            // console.log("====> getOrders", orders);
            return response
                .status(200)
                .render("shop/orders", {
                    pageTitle: "Orders Page",
                    path: "/orders",
                    orders: orders,
                });
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

// @TODO work in this controllers with Sequelize
const getCheckout = (request, response, next) => {

    // const products = user.cart.items;
    let products;
    let total = 0;

    request.user
        .populate("cart.items.productId")
        .execPopulate()
        .then(user => {

            products = user.cart.items;

            products.forEach(prod => {

                total += prod.quantity * prod.productId.price;
            });

            return stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: products.map(prod => {

                    return {
                        name: prod.productId.title,
                        description: prod.productId.description,
                        amount: prod.productId.price * 100,
                        currency: "usd",
                        quantity: prod.quantity
                    };
                }),
                success_url: request.protocol + '://' + request.get('host') + '/checkout/success',
                cancel_url: request.protocol + '://' + request.get('host') + '/checkout/cancel'
            });
        })
        .then(session => {
            return response
                .status(200)
                .render("shop/checkout", {
                    pageTitle: "Checkout Page",
                    path: "/checkout",
                    products: products,
                    totalSum: total,
                    sessionId: session.id
                });
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });

};

const getCheckoutSuccess = (request, response, next) => {

    request.user
        .populate("cart.items.productId")
        .execPopulate()
        .then(user => {

            const products = user.cart.items.map(i => {

                return {
                    quantity: i.quantity,
                    product: { ...i.productId._doc }
                };
            });

            const order = new Order({
                user: {
                    email: request.user.email,
                    userId: request.user
                },
                products: products
            });

            return order.save();
        })
        .then(result => {

            return request.user.clearCart();
        })
        .then(() => {
            response
                .status(301)
                .redirect("/orders");
        })
        .catch(err => {

            console.log("===> An error occurred:", err)
            const error = new Error(err);
            error.httpsStatusCode = 500;
            return next(error);
        });
};

const getInvoice = (request, response, next) => {

    const orderId = request.params.orderId;

    Order.findById(orderId)
        .then(order => {

            // Validation Check
            if (!order) {
                return next(new Error("No order be found for certain user"));
            };

            if (order.user.userId.toString() !== request.user._id.toString()) {

                return next(new Error("Unauthorized User to check orderId"));
            };

            const invoiceName = "invoice-" + orderId + ".pdf";
            const invoicePath = path.join(".data", "invoices", invoiceName);

            const pdfDoc = new PDFDocument();

            response.setHeader("Content-type", "application/pdf");
            response.setHeader("Content-disposition", `inline; filename="${invoiceName}"`);
            // response.setHeader("Content-disposition", `attachment; filename="${invoiceName}"`);
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(response);

            pdfDoc.fontSize(28).text("Invoice", { underline: true });
            pdfDoc.text("--------------------------");

            let totalPrice = 0;

            order.products.forEach(prod => {

                totalPrice += prod.quantity * prod.product.price;
                pdfDoc.fontSize(14).text(`${prod.product.title}  -  ${prod.quantity}  x  $${prod.product.price}`)
            });

            pdfDoc.text("-----");
            pdfDoc.fontSize(16).text(`Total Price:      $${totalPrice}`)

            // Sign to end the writable stream
            pdfDoc.end();

            // // @NOTE: Reading file data with "Preloading" into memory. It's not good practice.
            // fs.readFile(invoicePath, (err, data) => {

            //     if (err) {
            //         console.log("===> invoicePath:", invoicePath)
            //         console.log("===> getInvoice data:", data)
            //         console.log("===> getInvoice error:", err);
            //         return next(err);
            //     };

            //     console.log("===> getInvoice data:", data)
            //     response.setHeader("Content-type", "application/pdf");
            //     response.setHeader("Content-disposition", `inline; filename="${invoiceName}"`);
            //     // response.setHeader("Content-disposition", `attachment; filename="${invoiceName}"`);
            //     return response.send(data);
            // });


            // @NOTE: Read file data with "Stream". It's good practice.
            // const file = fs.createReadStream(invoicePath);

            // console.log("===> getInvoice data:", data)
            // response.setHeader("Content-type", "application/pdf");
            // response.setHeader("Content-disposition", `inline; filename="${invoiceName}"`);
            // // response.setHeader("Content-disposition", `attachment; filename="${invoiceName}"`);
            // response.send(data);

            // file.pipe(respose);
        })
        .catch(err => {

            console.log("===> error Occured at getInvoice", err);
            return next(err);
        });
};

module.exports = {
    getProducts,
    getProduct,
    getIndex,
    getCart,
    postCart,
    postCartDeleteProduct,
    postOrder,
    getOrders,
    getCheckout,
    getCheckoutSuccess,
    getInvoice,
};
