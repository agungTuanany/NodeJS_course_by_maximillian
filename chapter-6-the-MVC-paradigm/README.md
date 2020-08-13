# Chapter-6 The MVC paradigm

## Table of Contents
1. [Module Introduction](#module-introduction)

## Module Introduction
<br/>

![chapter-6-1.gif](./images/gif/chapter-6-1.gif "What's MVC")

### So what does `mvc` stand for or what is it ?

It's all about a **separation of concern**. `mvc` making sure that different
part of your code do different things and you clearly know which part is
responsible for what.

MVC stand for `model` `view` `controllers`.

We work with `models`, `views` and `controllers`; actually for example `views`
that is something you already know, we already got views in our `models` are
basically objects or is a part of your code that is responsible for
`representing your data` in your code and allowing you to `work with your data`.
The things like `saving`data, `fetching` data to or from a file or even if it's
just in memory as we're currently doing it this should be handled by `models`.

The `views` are responsible for `what the user sees` in the end; `views` are
responsible for rendering the right content in `.html` documents and sending
that back so they are `decoupled from your application code` and are just having
some light or minor integration's regarding the data we inject into our
templating-engine to generate these `views`.

The `controllers` are now the `connection point between the models and your
views` because since the `views` shouldn't care about the application logic and
the `models` do care about how to `save` and `fetch` data and so on; the
`controllers` are the thing working with the `models`, saving that data and also
the part where they pass that data that was fetched to your `views` for example.

So the controller is the `middleman`; it contains the `in-between logic`. Now in
case you're also wondering how `routes` fit into this picture. Well `routes` are
basically the things which define upon which path for which `http` method which
controller code should execute.

The `controller` is then thing defining with which model to work and which
`view` to render.

In an app with `Express` or built with `express` as we are doing it which
heavily relies on this `middleware` the `controllers` are also kind of split up
across `middleware` functions or some of the logic might be separated and move
into another `middleware` function but we'll see all that and we'll get there
step by for now.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
