const postdatahandler = async (event) => {
  event.preventDefault();
  const postTitle = document.querySelector("#title").value.trim();
  const postContent = document.querySelector("#content").value.trim();
  if (postTitle && postContent) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        postTitle,
        postContent,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#submit-post")
  .addEventListener("click", postdatahandler);
