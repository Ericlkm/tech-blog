const logInHandler = async (event) => {
  event.preventDefault();
  const invalid = document.getElementById("invalid");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      invalid.textContent = "incorrect email or password";
      invalid.setAttribute("style", "color:red; text-align:center;");
    }
  }
};
document.querySelector(".login-form").addEventListener("submit", logInHandler);
