const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}%20&_page=${page}`
  );
  const data = await res.json();
  return data;
}

async function addBlogToDom() {
  const posts = await getPosts();
  posts.map((post) => {
    const item = document.createElement("div");
    item.classList.add("post");
    item.innerHTML = `<div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
          ${post.body}
        </p>
      </div>`;

    postsContainer.appendChild(item);
  });
}

// Show loader & fetch more posts
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      addBlogToDom();
    }, 300);
  }, 500);
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  //   console.log("scroll", document.documentElement);
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop === clientHeight) {
    showLoading();
  }
});

//to inital post
addBlogToDom();

filter.addEventListener("input", filterPosts);
