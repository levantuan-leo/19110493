const addForm = document.getElementById("add-form");
const commentForm = document.getElementById("comment-form");
const editForm = document.getElementById("edit-form");

if (addForm) addForm.addEventListener("submit", addFormSubmit);
if (commentForm) commentForm.addEventListener("submit", commentFormSubmit);
if (editForm) editForm.addEventListener("submit", editFormSubmit);

function addFormSubmit(e) {
  e.preventDefault();

  document.querySelector(".spinner").style.display = "flex";
  fetch("/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      title: addForm.querySelector('input[name="postTitle"]').value,
      content: addForm.querySelector('textarea[name="postContent"]').value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

function commentFormSubmit(e) {
  e.preventDefault();

  document.querySelector(".spinner").style.display = "flex";
  fetch("/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      text: commentForm.querySelector('input[name="postComment"]').value,
      postId: commentForm.querySelector('input[name="postId"]').value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

function editFormSubmit(e) {
  e.preventDefault();

  document.querySelector(".spinner").style.display = "flex";
  fetch("/post/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      id: editForm.querySelector('input[name="postId"]').value,
      title: editForm.querySelector('input[name="postTitle"]').value,
      content: editForm.querySelector('textarea[name="postContent"]').value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = `/post/${
        editForm.querySelector('input[name="postId"]').value
      }`;
    })
    .catch((error) => {
      console.log(error);
    });
}
