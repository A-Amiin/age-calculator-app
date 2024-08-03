document.getElementById('btn').addEventListener('click', calculateAge);
document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        calculateAge();
    }
});

function calculateAge() {
    // Get input values
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    // Reset error messages
    resetErrorMessages();

    // Validate inputs
    if (!isValidDate(day, month, year)) {
        return;
    }

    // Get current date
    const today = new Date();
    let ageYears = today.getFullYear() - year;
    let ageMonths = today.getMonth() + 1 - month;
    let ageDays = today.getDate() - day;

    // Adjust values if days or months are negative
    if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += daysInMonth(today.getMonth(), today.getFullYear());
    }

    if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
    }

    // Display calculated age
    document.getElementById('years').textContent = ageYears;
    document.getElementById('months').textContent = ageMonths;
    document.getElementById('days').textContent = ageDays;
}

function isValidDate(day, month, year) {
    let valid = true;

    // Validate day
    if (day < 1 || day > 31) {
        showError('day', 'Please enter a valid day');
        valid = false;
    }

    // Validate month
    if (month < 1 || month > 12) {
        showError('month', 'Please enter a valid month');
        valid = false;
    }

    // Validate year
    const currentYear = new Date().getFullYear();
    if (year > currentYear || year < 1930) {
        showError('year', 'Please enter a valid year between 1930 and ' + currentYear);
        valid = false;
    }

    // Validate that the day exists in the specified month
    if (day > daysInMonth(month - 1, year)) {
        showError('day', 'Day does not exist in the given month');
        valid = false;
    }

    return valid;
}

function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.style.border = '2px solid red'; // Change border color to red
}

function resetErrorMessages() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });

    document.querySelectorAll('.form-group input').forEach(input => {
        input.style.border = '0.5px solid hsl(0, 0%, 86%)'; // Reset border color to default
    });
}

function daysInMonth(month, year) {
    // Calculate the number of days in a given month
    return new Date(year, month + 1, 0).getDate();
}