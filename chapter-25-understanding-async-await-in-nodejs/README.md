# Understand Async Await in NodeJS

## Table of Contents

1. [Module Introduction](#module-introduction)
2. [What is Async Await All About](#what-is-async-await-all-about)

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
