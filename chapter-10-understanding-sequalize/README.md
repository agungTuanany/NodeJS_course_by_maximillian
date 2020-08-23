# Understanding Sequelize

## Table of Contents
1. [Module Introduction](#module-introduction)

<br/>

## Module Introduction

In the last module (chapter), you learned how to use `SQL` in NodeJS application
and we did this example of a `MariaDB` database which we want to use to store
data.

Now we didn't complete the [project-5](../project-5) with that `SQL` approach
simply because in this chapter, we'll implement other features like for example
working with the `shopping cart` with the help of `sequelize`. This will still
use the same `MariaDB` database actually behind the scenes or in the background
as a database but the code we write instead of `SQL` statement as in
[cart.js](../project-5/models/cart.js) file

```javascript
    save() {

        return db.execute(
            "INSERT INTO product (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
            [this.title, this.price, this.imageUrl, this.description]
        );
    };

    static deleteById(id) {
    };

    static fetchAll() {

        return db.execute("SELECT * FROM product");
    };

    static findById(id) {

        return db.execute("SELECT * FROM product WHERE product.id = ?", [id]);
    };
```

We'll use a third party package  that allow us to work with JavaScript `object`
and convenient methods to create new elements in the database, to `edit`,
`delete`, or to `find` them and also connect them, because you remember, a `SQL`
database typically also work with `relations` and we got lot of `relations` in
our current project.

You will learn what exactly `sequelize` this third package is; and how  you can
use it and we'll then implement our `proudct` and our `cart` and so on in this
chapter with `sequelize`.




**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
