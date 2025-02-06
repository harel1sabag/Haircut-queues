document.addEventListener('DOMContentLoaded', function() {
    // Datetime local input handling
    const dateInput = document.querySelector('input[type="datetime-local"]');
    if (dateInput) {
        const now = new Date();
        const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        dateInput.min = localDateTime;
        dateInput.value = localDateTime;
    }

    // Form validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            const inputs = form.querySelectorAll('input, select');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                event.preventDefault();
                alert('אנא מלא את כל השדות הנדרשים');
            }
        });
    }
});
