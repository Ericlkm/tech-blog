const deleteHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("failed to delete post!");
    }
  }
};

document
  .querySelector(".delete-button")
  .addEventListener("click", deleteHandler);
