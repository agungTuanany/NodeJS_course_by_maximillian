# Adding Payment

## Table of Contents
1. [Module Introduction](#module-introduction)
2. [How Payment Work](#how-payment-work)

<br/>

## Module Introduction

Before we move on to REST API features which is a whole new block or a whole new
way of interacting with the client and of which we got to taste with our
Asynchronous JavaScript; before we do that, let's finish our shop by adding some
payment functionality; because what would be a shop without being able to pay.

For that in this module we'll add a simple _checkout-page_. _We'll collect some
payment data_, a credit card data from our user, and we'll finally do a _purchase
charge that credit card_ or at least simulate the charge in this module; And of
course then we'll store the order as we did it before.

For that I'll use a third party provider _stripe_ which is great provider for
integrating payment into your application; And I'll show you how yo integrate it
step by step.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## How Payment Work
<br/>

![chapter-22-1.gif](./images/gif/chaper-22-1.gif "How payment work")
<br/>

Let's first of all, we start with the payment process how does it work? It's
a pretty long process.

We start by `[1]` _collecting the payment method_. So the credit card data
typically.

We then have to `[2]` _verified the payment method_, it's to credit card data correct?
It's expired? Is the number correct?.

We then have to `[3]` _charge the payment method_;

After we charge we have to `[4]` _manage payment_, that include things like fraud
protection, managing disputes and so on.

At last but not least, we of course have to `[5]` _process the order_ in our
app, so in our server-side code, for example, that we stored the data in the
database.

All payment related thing here are pretty complex tasks, both from a legal and
the technical side. Therefore typically you outsource them. Even the very big
companies outsource this complex tasks.

Stripe is a very a very popular company offering payment services. It offers
a great integration. It's super easy to add to any application as you will see
in this module.

### How Stripe Works
<br/>

![chapter-22-2.gif](./images/gif/chaper-22-2.gif "How Stripe works")
<br/>

We have our _client (browser)_ and our _server (NodeJS)_. That's all the code we
own and we wrote.

At the _client we'll collect credit card data_. We'll do that with the help of
Stripe, and we'll send it to the Stripe servers which are not owned by us, but
that company validate the input; Once it's valid, Stripe return a _token_ to us
which _basically encode_ and includes that credit card data with confirmation
that credit card is correct.

We sent that _Stripe Token_ to our server; and in our code (server) we create
a charge into this payment method with the help of Stripe again.

So we create a payment, a charge object we sent to Stripe with token and with
our price included; And Stripe will then do the actual charging, do the actual
managing; And we will get a response once this is done and then we can also
continue with our code _added the Payment-data_ and store the Payment-data in
our database.

This is generally how payment will work in web. Now let me walk you through step
by step.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

