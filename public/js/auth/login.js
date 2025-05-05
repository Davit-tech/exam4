const messageContainer = document.querySelector("#message-container");

const loginForm = document.querySelector("#loginForm");
if (loginForm) {
    loginForm.onsubmit = async function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem("token", result.token);
                setTimeout(() => {
                    window.location.href = "/user/profile";
                }, 1000);
                if (messageContainer) {
                    messageContainer.classList.add("success-message");
                    messageContainer.innerHTML = result.message;
                }
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
        } catch (err) {
            console.error(err);
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
