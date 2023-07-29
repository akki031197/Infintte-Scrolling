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
  }, 1000);
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
