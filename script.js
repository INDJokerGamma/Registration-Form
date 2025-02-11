// JavaScript for Form Validation and Dark Mode Toggle

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const darkModeToggle = document.getElementById("toggleDarkMode");
    const body = document.body;
    const inputs = document.querySelectorAll("input, textarea, select");

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        inputs.forEach(input => input.classList.toggle("dark-mode-input"));
        localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
    });

    // Load Dark Mode State
    if (localStorage.getItem("dark-mode") === "true") {
        body.classList.add("dark-mode");
        inputs.forEach(input => input.classList.add("dark-mode-input"));
    }

    // Form Validation on Submit
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) {
            alert("Form submitted successfully!");
            form.reset();
        }
    });

    // Real-time Validation on Change
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            validateField(input);
        });
    });

    function validateForm() {
        let isValid = true;
        
        document.querySelectorAll("input").forEach(input => {
            if (input.value.trim() === "") {
                showError(input.id, "This field is required.");
                isValid = false;
            } else {
                hideError(input.id);
            }
        });

        // Confirm Password Validation
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (password !== confirmPassword) {
            showError("confirmPassword", "Passwords do not match.");
            isValid = false;
        }

        return isValid;
    }

    function validateField(input) {
        let isValid = true;
        const value = input.value.trim();
        
        switch (input.id) {
            case "name":
                isValid = value.length >= 5;
                break;
            case "email":
                isValid = value.includes("@");
                break;
            case "phone":
                isValid = value.length === 10 && value !== "123456789";
                break;
            case "password":
                isValid = value.length >= 8 && value.toLowerCase() !== "password" && value !== document.getElementById("name").value;
                break;
        }

        if (!isValid) {
            showError(input.id, getErrorMessage(input.id));
        } else {
            hideError(input.id);
        }
        return isValid;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    }

    function hideError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.style.display = "none";
        }
    }

    function getErrorMessage(field) {
        const messages = {
            "name": "Name must be at least 5 characters long.",
            "email": "Enter a valid email with '@'.",
            "phone": "Enter a valid 10-digit phone number.",
            "password": "Password must be at least 8 characters and cannot be 'password' or your name.",
            "confirmPassword": "Passwords must match."
        };
        return messages[field] || "Invalid input.";
    }
});
