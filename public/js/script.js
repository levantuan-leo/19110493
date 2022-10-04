function act(postId, action) {
  const reactionCount = document.querySelector(
    `.post-${postId} .reaction-${action} span`
  );
  reactionCount.innerText = `${Number(reactionCount.innerText) + 1}`;

  //   document.querySelector(".spinner").style.display = "flex";
  fetch("/reaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      action,
      postId,
    }),
  }).catch((error) => {
    console.log(error);
    reactionCount.innerText = `${Number(reactionCount.innerText) - 1}`;
  });
}

function deletePost(postId) {
  if (confirm("Are you sure?") === true) {
    document.querySelector(".spinner").style.display = "flex";
    fetch("/post/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        postId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
