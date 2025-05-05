const messageContainer = document.querySelector("#message-container");

const registerForm = document.querySelector("#registerForm");
if (registerForm) {
  registerForm.onsubmit = async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        if (messageContainer) {
          messageContainer.classList.add("success-message");
          messageContainer.innerHTML = "Registration successful!, Sending you an email to verify your account.";
        }

        setTimeout(() => {
          window.location.href = "/user/login";
        }, 1500);
      } else {
        if (messageContainer) {
          messageContainer.classList.add("error-message");
          messageContainer.innerHTML = result.message;
        }
        if (result.fields) {
          for (const [field, message] of Object.entries(result.fields)) {
            const inputElement = document.querySelector(`[name="${field}"]`);
            if (inputElement) {
              const errorSpan = document.createElement("span");
              errorSpan.classList.add("error-text");
              errorSpan.textContent = message;
              inputElement.parentNode.appendChild(errorSpan);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const togglePasswordBtn = document.querySelector("#togglePassword");
const passwordInput = document.querySelector("#password");
const icon = togglePasswordBtn.querySelector("i");

if (togglePasswordBtn && passwordInput) {
  togglePasswordBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    if (isHidden) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }

    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
}
