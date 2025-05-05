document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Token not found!");
        return;
    }


    const response = await fetch("/user/profile/data", {
        method: "GET",
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const userData = await response.json();
    const {userName, email, createdAt, updatedAt, avatar} = userData.user;


    const formattedCreated = new Date(createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    const formattedUpdated = updatedAt && updatedAt !== createdAt
        ? new Date(updatedAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        : null;


    document.querySelector("#username").textContent = userName;
    document.querySelector("#email").textContent = email;
    document.querySelector("#created-at").textContent = formattedCreated;

    // document.querySelector("#updated-at").textContent = formattedUpdated;
    if (formattedUpdated) {
        document.querySelector("#updated-at").textContent = formattedUpdated;
        document.querySelector("#updated-block").style.display = "block";
    }
    document.querySelector("#avatar-img").src = `/uploads/${avatar || 'anonymous-logo.png'}`;


    const editButton = document.querySelector(".edit-profile-button");
    const deleteButton = document.querySelector(".delete-profile-button");

    editButton.addEventListener("click", () => {
        window.location.href = `/user/profile/update`;
    });

    deleteButton.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this user?")) {
            const res = await fetch("/user/profile", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
            });
            if (res.ok) {
                alert("User successfully deleted!");
                localStorage.removeItem("token");
                window.location.href = "/user/login";
            } else {
                alert("Error deleting user");
            }
        }
    });
});
