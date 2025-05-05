const messageContainer = document.querySelector("#message-container");

const registerForm = document.querySelector("#events-form");
if (registerForm) {
    registerForm.onsubmit = async function (event) {
        const token = localStorage.getItem("token");

        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/users/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
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
                    window.location.href = "/user/profile";
                }, 1500);
            } else {
                if (messageContainer) {
                    messageContainer.classList.add("error-message");
                    messageContainer.innerHTML = result.message;
                }
                // if (result.fields) {
                //     for (const [field, message] of Object.entries(result.fields)) {
                //         const inputElement = document.querySelector(`[name="${field}"]`);
                //         if (inputElement) {
                //             const errorSpan = document.createElement("span");
                //             errorSpan.classList.add("error-text");
                //             errorSpan.textContent = message;
                //             inputElement.parentNode.appendChild(errorSpan);
                //         }
                //     }
                // }
            }
        } catch (error) {
            console.log(error);
        }
    };
}




