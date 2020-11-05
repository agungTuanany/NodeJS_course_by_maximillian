const getButton = document.getElementById("get");
const postButton = document.getElementById("post");


getButton.addEventListener("click", () => {

    fetch("http://localhost:8081/feed/posts")
        .then(res => res.json())
        .then(resData => console.log(resData))
        .catch(err => console.log("==> getButton error:", err))
});

postButton.addEventListener("click", () => {

    fetch("http://localhost:8081/feed/post", {
        method: "POST"
        body: JSON.stringify({
            title: "A Codepen Post",
            content: "Created via Codepen"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(resData => console.log(resData))
        .catch(err => console.log("==> getButton error:", err))
})

