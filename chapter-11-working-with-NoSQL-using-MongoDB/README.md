# Working with NoSQL Using MongoDB

## Table of Contents
1. [Module Introduction](#module-introduction)
2. [What is MongoDB](#what-is-mongodb)
3. [Association](#association)

<br/>

## Module Introduction
<br/>

![chapter-11-1.gif](./images/gif/chapter-11-1.gif "What is MongoDB")

In this module we have look more in MongoDB, what it is and how you can start up
, you can use MongoDB to be database inside your NodeJS code.j

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## What is MongoDB


MongoDB is both the name of the company which develop MongoDB to be but also
then of their most famous product a _database solution_ of database engine. You
could say a tool you can use to run very efficient NoSQL.

The name stems from the word *humongous* because MongoDB was built for one major
purpose that you could store and work wilt lots and lost of data. MongoDB to be
is build for large scale applications, MongoDB to be as built to quickly clear
,store and interact with data.

MongoDB it's really fast and it's really awesome database philosophy behind
those SQL databases and they'll for all the behind MongoDB.

### How MongoDB works

Just like in the SQL world we spin up the database server and then we can
have multiple databases.
<br/>

![chapter-11-2.gif](./images/gif/chapter-11-2.gif "What is MongoDB")

For example a **Shop** database, in the SQL world we would have multiple
**tables**, in NoSQL MongoDB world we have multiple **collection** like `Users`
and `orders` collected for example.

Inside of each **collection** we don't have so-called **record** but we have
a couple **documents**. **documents** also look different then **records** did,
It's not just about different names being used. The core philosophy behind
that database really is totally different one. MongoDB is **schema-less**,
inside of one **collection** your **documents** is **do not have to have the
same structure**, and this totally different in SQL world.

In SQL we had a **User** table and in that table we had an **Id**, **name**,
**email** and **password**. In NoSQL world we can have any kind of data in one
and the same **collection**. Often in NoSQL world you will still end up with at
least similar structure but you're not forced to have exactly the same
structure; and this gives you more **flexibility** also for your application to
**grow** and to **change** it's data requirements over time. Without being
difficult to depict (describe) in your database world.

A document in MongoDB look like:

```nosql
{
    "name": "max",
    "age": 29,
    "address":
        {
            "city": "Munich"

        },
    "hobbies": [
        { "name": "Cooking" },
        { "name": "Sports" }
    ]
}
```

This looks a lot like JavaScript object notation; and to be precise it kind of
is. MongoDB to be uses JSON to store data in **collections** (tables), every
**document** you store looks something like above. It follows the JavaScript
object notation (JSON) format. To be very precise moment to be used a something
which is called **BSON** (Binary JSON) but that only means that MongoDB to be
kind of transforms this behind scenes before storing it in the files.

In the MongoDB document structure you can have **nested** (embedded) documents.
For example the `address` wold hold and embed to **document**, and you can also
have an **array** inside of the **document**, the array data can hold other
**document** of the objects or ti could also just hold **string, numbers**
anything of that kinds

So again for the data you have a great flexibility and the existence of these
nested **documents** also means **relation** are managed a bit differently in
the NoSQL MongoDB world.



**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
