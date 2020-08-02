# Chapter-4 Working With ExpressJS

## Table of Contents
1. [Adding Middleware](#adding-middleware)


## Adding Middleware
<br />

![chapter-4-1.png](./images/chapter-4-1.png "All about Middleware")

ExpressJS is all about `middleware` as diagram above. Instead of just having one
`request` handler, you will have a possibility of hooking (connect) in multiple
functions which the `request` will go through until you send a `response`.

`middleware` allows developer o split the code into multiple blocks or pieces;
instead of having one huge function that does everything.

`middleware` is pluggable nature of express, where developer can easily add
other third party packages; which simply happen to give developer such
`middleware` functions that can plug into ExpressJS and add certain
functionalities.

This is a **Core** concept of ExpressJS.

### What is Middleware

Is mean that an incoming `request` is automatically funneled (distributed)
through a bunch of functions.




**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
