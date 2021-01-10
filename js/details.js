//Javascript For details.html

//Define Query Selector
const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector(".details");
const deleteBtn = document.querySelector(".delete");
const likeButton = document.querySelector(".likeButton");
const dislikeButton = document.querySelector(".dislikeButton");

//Render Details Data (Get By ID)
const renderDetails = async () => {
  const res = await fetch("http://localhost:3000/posts/" + id);
  const post = await res.json();

  const template = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `;

  container.innerHTML = template;
};

//Function For Click Delete Button
deleteBtn.addEventListener("click", async (e) => {
  //Delete Data From db.json (Method : DELETE)
  await fetch("http://localhost:3000/posts/" + id, {
    method: "DELETE",
  });

  window.location.replace("/index.html");
});

//Function For Click Like Button
likeButton.addEventListener("click", async (e) => {
  //Get Likes Data (Method : GET)
  const res = await fetch("http://localhost:3000/posts/" + id);
  const data = await res.json();

  //Update Likes (Method : PATCH)
  await fetch("http://localhost:3000/posts/" + id, {
    method: "PATCH",
    body: JSON.stringify({
      likes: (data.likes += 1),
    }),
    headers: { "Content-type": "application/json" },
  });

  window.location.replace("/index.html");
});

//Function For Click Dislike Button
dislikeButton.addEventListener("click", async (e) => {
  //Get Likes Data (Method : GET)
  const res = await fetch("http://localhost:3000/posts/" + id);
  const data = await res.json();

  //Update Likes (Method : PATCH)
  await fetch("http://localhost:3000/posts/" + id, {
    method: "PATCH",
    body: JSON.stringify({
      likes: data.likes <= 0 ? (data.likes -= 0) : (data.likes -= 1),
    }),
    headers: { "Content-type": "application/json" },
  });

  window.location.replace("/index.html");
});

window.addEventListener("DOMContentLoaded", () => renderDetails());
