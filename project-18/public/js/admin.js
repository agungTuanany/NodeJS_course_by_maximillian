const deleteProduct = (btn) => {

    // console.log(btn);
    const productId = btn.parentNode.querySelector("[name=productId]").value;
    const csrfToken = btn.parentNode.querySelector("[name=_csrf]").value;

    const productElement = btn.closest("article");

    console.log(productId, csrfToken)

    fetch(`/admin/product/${productId}`, {
        method: "DELETE",
        headers: {
            // @NOTE: csurf package on github
            "csrf-token": csrfToken
        }
    })
        .then(result => {
            console.log("===> deleteProduct result", result);
            return result.json();
        })
        .then(data => {
            console.log("===> result deleteProduct data:", data);
            console.log("===> result deleteProduct productElement:", productElement);
            productElement.parentNode.removeChild(productElement);
        })
        .catch(err => {
            console.log("===> deleteProduct error:", err);
        })
};
