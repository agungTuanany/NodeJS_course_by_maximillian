# Understand Async Await in NodeJS

## Table of Contents

1. [Module Introduction](#module-introduction)
2. [What is Async Await All About](#what-is-async-await-all-about)
3. [Transforming Then-Catch Block to Async-Await](#transforming-then-catch-block-to-async-await)

<br/>

## Module Introduction

You've learn about a brand new type of backend application you can build with
NodeJS a RESTFUL API; and you learn that it's not that far off from the
server-side rendering (classic NodeJS apps) we built before. The only major
differences is how you handle request and response data; You send JSON data, now
with that out of the way,

I want to dive into something totally different which is applicable to any
NodeJS application, not just to RESFUL API. I want to dive into _async-await
keyword_, which is relatively new JavaScript language feature, which you can
use, again in any place in your NodeJS code, this does not have to be used in
a RESTFUL API, you can or can not use it anywhere.

I will explain what's up with this two keywords, how you used them? And why you
would use them?.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## What is Async Await All About
<br/>

![chapter-25-1.gif](./images/gif/chapter-25-1.gif "Module introduction")
<br/>

What is async-await all about? Async-await are two keywords, which are part of
the core JavaScript language. They're not an exclusive part of the NodeJS
runtime. Async-await also available in modern browser or in Frontend projects.
They're not part of NodeJS, but you can use them in NodeJS.

The question of course is, what do these two keyword do?, Async-await allows you
to write asynchronous request, so request, where you have some operation that
takes a little while, and comes back later in a synchronous way; And you see
there is an asterisk `*` after `Synchronous Way*`, because **_async-await it allows
you to write asynchronous statements in a way that looks synchronous, but still
ins't a synchronous request_**.

Now this is of course very abstract; So, let's simply dive into our existing
NodeJS code; And let me show you which parts of it you could change to use
async-await, and then it will come very clear what it does.

Now if you go in [feed.js](../project-20/server/controllers/feed.js) controller,
in previous lecture, you'll see that there we have asynchronous operations
`post.find()`; how can you see or identify asynchronous operations? Well, for
example when you're using **_Promises_**.

```javascript
const getPosts = (request, response, next) => {

    const currentPage = request.query.page || 1;        [4]
    const perPage = 2;                                  [5]
    let totalItems;

    Post.find()                                         [1]
        .countDocuments()                               [2]
        .then(count => {                                [3]

            totalItems = count;
            return Post.find()                          [8]
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
        })
        .then(posts => {                                [7]

            return response
                .status(200)
                .json({
                    message: "Successfully fetched the all Posts",
                    posts: posts,
                    totalItems: totalItems
                });
        })
        .catch(err => {

            if (!err.statusCode) {
                console.log("===> post.find().countDocuments() getPosts error", err);
                err.statusCode = 500;
            };
                next(err);
        });
        // ...                                          [6]
        // console.log() //NOTE: imagine, if we have some code,
};
```

Promises are typically construct that help you deal with asynchronous code,
because promises work like that.

`[1] Post.find()` get executed, and `[2] countDocuments()` gets executed
immediately; But then `[2] countDocuments()` returns a promise, or a promise
like a object; And you then use `[3] then()` function that should be executed
once `[1] Post.find()` and `[2] countDocuments()` is done.

Since we access database, it's typically takes a bit longer; We're talking about
_millisecond_ here, but still it doesn't happen instantly.

On the opposite, the `[4] const currentPage = request.query.page || 1;` and `[5]
const perPage = 2;` are get executed after each other instantly, `[4]` operation
does essentially not take any time at all, it's so fast, JavaScript can wait for
it to complete, and move onto the next steps `[5]` right away.

On `[1] - [3]` it will not wait for that to complete; And that is why after `[1]
and [2]` statements, JavaScript would actually move on with _next statement_
`[6]` in line; if we have another statement on the same level, as `[1]
Post.find()`, we would continue with `[6]` that.

In this case we got none; but if we would have some code, there like
`console.log()` or anything, the `[6]` will be executed right away, probably or
very likely before `[4] then(){}` or `[7] then(){}` was executed. The reason for
that is, with `then()` keywords, we define code-snippets or we define functions
that should run in the future, once `[1] and [2]` it's longer taking;
asynchronous operation is done. It's called asynchronous because it doesn't have
happen instantly, but it takes a little while.

```javascript
    Post.find()
    .countDocuments(count => {

        totalItems = count;
        return Post.find()                              [8]
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
    })
```

Callbacks, which we used earlier on the course, are a another way of working
with asynchronous code. So for the `[2] countDocuments()` documentation, you
could define callback function that executed once it;s done, instead of `then()`
block.

We don't use callbacks, because we will use inside `[3] then(){...}`, and then
we would need a call by each in the `[8] Post.find()` function, and we would
nest all the callback leading to very unreadable code.

That's why you often prefer _promises_, even though you could do it with
callbacks, because with `[3] then(){...}` block after each other, and it's very
readable.

Still it can get more readable with async-await; And that's what I want to show
you in the next lecture.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Transforming Then-Catch Block to Async-Await

We have brief look at how asynchronous code can be identified, and what is
important about asynchronous code, and that you can see callbacks and promises
to handle asynchronous code;

Now we learn all that, let me introduce you to async-await. To use that you
first of all have to _prepend `async` keyword_ in front of a function,

```javascript
const getPosts = async (request, response, next) => {

}
```
Where you plain to use the `wait` keyword; So where you want to use these two
keyword? They always are used together, **_`async` in front of the function_**,
then you can tweak `getPost()` function syntax. You can write the `post.find()`
almost as if it would run synchronously.

You can get your `count` a new `const` or variable you create by a awaiting
`[1] Post.find().countDocuments()`.

```javascript
const getPost = async (request, response, next) => {

    const currentPage = request.query.page || 1;
    const perPage = 2;
    let totalItems;

    totalItems = await Post.find().countDocuments();            [1]
}
```
Then you get rid of `then()` block. You continue to next line, `[2]
Post.find().skip().limit()`. This gives you back a list of `posts`, you
currently have in the second `then()` block.

```javascript
const getPost = async (request, response, next) => {

    const currentPage = request.query.page || 1;
    const perPage = 2;
    let totalItems;

    const totalItems = await Post.find().countDocuments();              [1]
    const post = await Post.find()                                      [2]
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    ...
    ...
}
```

You again write with create `post` as `const` variable, and assign `await`
keyword into `[2] Post.find().skip().limit()`, and then the whole statement in
the `then()` block would be followed; let's _comment out the `catch` block_,
because that's something we'll care about in a second.

```javascript
const getPost = async (request, response, next) => {

    const currentPage = request.query.page || 1;
    const perPage = 2;
    let totalItems;

    const totalItems = await Post.find().countDocuments();              [1]
    const post = await Post.find()                                      [2]
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

    response
        .status(200)
        .json({
            message: "Successfully fetched the all Posts",
            posts: posts,
            totalItems: totalItems
        })

    //.catch(err => {

    //    if (!err.statusCode) {
    //        console.log("===> post.find().countDocuments() getPosts error", err);
    //        err.statusCode = 500;
    //    };
    //        next(err);
    //});
}
```

Now, the code has using async-await. It does looks like the normal JavaScript
code right? But behind the scenes async-await takes your code and transforms it
into the old `then()` structure we used. So, it uses `then` keyword behind the
scenes, we just can't see it; We have more convenient way of writing our
asynchronous code.

I haven't used this in the course, because I think that if you're relatively new
to JavaScript or NodeJS, this can quickly lead you to think, that async-await in
the `const totalItems = await Post.find().countDocuments();` works just like the
other line; And indeed it doesn't.

Always keep in mind, `await` just does some behind the scenes transformation of
your code. It takes your codes, and adds `then()` block after it (behind the
scenes), get the result of that operation, and then stores it in `totalItems`,
and then moves onto the next line.  Execute that inside of the `then(){}` block
it creates here `[2] const totalItems = await Post.find().countDocuments();`
implicitly.

So, basically the exact same code we had before, this is done by async-await
behind the scenes. But, if you know, if you understand this, then this can be
a syntax you might prefer, you don't have too. You can absolutely use the other
one with _then-catch_, but you prefer _async-await_.

Back to catching, how do we handle errors now? Well since this now runs almost
like asynchronous code we use _try-catch_ block.

```javascript
const getPost = async (request, response, next) => {

    const currentPage = request.query.page || 1;
    const perPage = 2;
    let totalItems;

    try {
        const totalItems = await Post.find().countDocuments();              [1]
        const post = await Post.find()                                      [2]
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        response
            .status(200)
            .json({
                message: "Successfully fetched the all Posts",
                posts: posts,
                totalItems: totalItems
            });
    }
    .catch (err) {

        if (!err.statusCode) {
            console.log("===> post.find().countDocuments() getPosts error", err);
            err.statusCode = 500;
        };
            next(err);
    }
};
```

So we keep the `cath` block with same logic, and we try assign `next(err)`,
because keep in mind behind the scenes, `next(err)` get converted to `then-catch`
block we used before; But now with that we have transformed this first snippet
where we used promises to async-await.


**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
