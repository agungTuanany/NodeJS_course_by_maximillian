# Adding Payment

## Table of Contents
1. [Module Introduction](#module-introduction)

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
