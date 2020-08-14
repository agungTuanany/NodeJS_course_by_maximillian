# Chapter-6 The MVC paradigm

## Table of Contents
1. [Module Introduction](#module-introduction)
2. [Module Summary](#module-summary)

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

## Module Summary

![chapter-6-2.gif](./images/gif/chapter-6-2.gif "MVC summary")

You learned about the **important** `mvc` pattern; and there the `model` serves the
purpose of `representing` our data and `managing` our data, `saving` it,
`fetching` it, later also `updating` it and so on; And it doesn't matter if you
manage your data in **memory**, **files** or **database**, it is the model which
is responsible for your data.

The `view` on the other hand is responsible for `presenting` it to the user, is
responsible for what the user sees and it `shouldn't contain too much logic`
which might remind you of the `handlebars` templating engine; which kind of
forced you to not put too much logic in there. With `ejs`, the templating engine
you can put more logic into the `view` and you should always well **try to find
your own personal balance**; Some people want to have a super pure approach,
other people fine with a little bit of logic in the templates but you should
definitely not put too much logic in `view`.

Your logic should be in the `model` or partly in the `controller` because the
`controller` should do everything that needs to be done to **connect** your
`model` and the `view`; So to get the data from **A** to **B** and that can
involve both directions. It can mean that through your `view`, some data was
sent to your `Node` `Express` application and you now need to send that to the
`model` to save it or it can of course mean you're fetching data from the
`model` or via the `model` and send that into a `view`.

This is the `mvc` pattern and I will continue to work with that fort the rest of
this project.
oft

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
