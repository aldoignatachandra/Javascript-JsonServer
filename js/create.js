//Javascript For create.html

//Define Query Selector
const form = document.querySelector("form");

//Function Create New Data To db.json
const createPost = async (e) => {
  e.preventDefault();

  const doc = {
    title: form.title.value,
    body: form.body.value,
    likes: 0,
  };

  //Create New Data (Method : POST)
  await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(doc),
    headers: { "Content-type": "application/json" },
  });

  window.location.replace("/index.html");
};

form.addEventListener("submit", createPost);
