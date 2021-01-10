//Javascript For index.html

//Define Query Selector
const container = document.querySelector(".blogs");
const searchForm = document.querySelector(".search");
const sortButtonPopular = document.querySelector(".sortButtonPopular");
const sortButtonUnpopular = document.querySelector(".sortButtonUnpopular");
const sortButtonNewest = document.querySelector(".sortButtonNewest");
const sortButtonOldest = document.querySelector(".sortButtonOldest");

//Render Details Data (Get All Data)
const renderPosts = async (term, sort) => {
  let uri = "http://localhost:3000/posts?";

  //For Search
  if (term) {
    uri += `&q=${term}`;
  }

  //For Sort
  if (sort == "popular") {
    uri += `&_sort=likes&_order=desc`;
  } else if (sort == "unpopular") {
    uri += `&_sort=likes&_order=asc`;
  } else if (sort == "newest") {
    uri += `&_sort=id&_order=desc`;
  } else if (sort == "oldest") {
    uri += `&_sort=id&_order=asc`;
  } else {
    uri += `&_sort=id&_order=desc`;
  }

  const res = await fetch(uri);
  const posts = await res.json();

  let template = "";
  await posts.forEach((post) => {
    template += `
      <div class="post">
        <h2>${post.title}</h2>
        <p><small>${post.likes} likes</small></p>
        <p>${post.body.slice(0, 200)}...</p>
        <a href="/details.html?id=${post.id}">Read more...</a>
      </div>
    `;
  });

  container.innerHTML = template;
};

//Function For Using Search Form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});

//Function For Sort From Highest Likes
sortButtonPopular.addEventListener("click", async (e) => {
  renderPosts("", "popular");
});

//Function For Sort From Lowest Likes
sortButtonUnpopular.addEventListener("click", async (e) => {
  renderPosts("", "unpopular");
});

//Function For Sort From Newest Data Input
sortButtonNewest.addEventListener("click", async (e) => {
  renderPosts("", "newest");
});

//Function For Sort From Oldest Data Input
sortButtonOldest.addEventListener("click", async (e) => {
  renderPosts("", "oldest");
});

window.addEventListener("DOMContentLoaded", () => renderPosts());
