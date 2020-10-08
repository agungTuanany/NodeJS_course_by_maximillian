# Understanding Validation

## Table of Contents
1. [Module Introduction](#module-introduction)
2. [Why validate](#why-validate)

<br/>


## Module Introduction
<br/>

![chapter-17-1.gif](./images/gif/chapter-17-1.gif "Module introduction")

Now what we learned how to add users to our application, let's take step
backward and let's have a look at an important topic that is related to any
visitor, no matter if he or she is authenticated or not, interacting with your
website.

I'm talking about handling _user input_ and most importantly, that will be the
topic of thuis module, _validating that user input_.

### Why validate?

We'll have a look at why validation is important, so what do I mean with
validating user input and why would we want to do that?

### How to validate

These are the **_core_** things and I will show you how you can ensure that the
data you work with is _really the data_ and in the _format you expect to get
it_.

So, let's see what exactly validation is and why we would want to add it.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Why validate
<br/>

![chapter-17-2.gif](./images/gif/chapter-17-2.gif "Why validate")
<br/>

So why would we want to add some data or input validation to our application?
Well if we have a user interacting with our website, then we typically have
a lot of forms on any web application we build. In our example project for
example, we have a form for _signing up_, we got one for _signing in_, and we
got one for _adding products_ and the bigger your application is, the more data
you will need from your users at some point of time.

So we have that form with which our _user_, our _visitor_ of the website
interacts with. Now in the end when this form is submitted with a _post request_
as we controlled it in our form, then a _request_ is sent to our backend and by
the way you could also configure it to send a _get request_ but the key thing
_here is a request with the form data is sent_ and we're already doing this in
this course because this is a crucial task in any web application.

Now on our backend (NodeJS) code, we then typically interact with a database or
maybe we write the data into a normal file but in the end we take the data which
we receive and we want to store it. This is exactly the part which can be
_dangerous_ or _problematic though_.

Right now in the app we got no kind of data validation. If a user in our current
application would try to _login_ with something that is _not a valid email
address_, we would allow that, we're not preventing the user from entering
something incorrect.

The same is true for adding a product, we don't care about what the user enters
and this is what I want to change this module. We'll add some validation as an
extra step right at the start of our NodeJS code _when we handled a request on
the server_, definitely before we store it in a database; And this is validation
can then either succeed and allow the data to be _written_ to the _database_ or
to _a file_ or allow it to be **_handled_** by the rest of our NodeJS code or we
**_reject_** the input and then basically return some information to the user
prompting the user to correct the error.

This is what we will work on in this module and I will show you how to validate
and how to provide a good user experience.



**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

