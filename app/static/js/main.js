document.addEventListener('DOMContentLoaded', function() {
    // Datetime local input handling with Hebrew localization
    const dateInput = document.querySelector('input[type="datetime-local"]');
    if (dateInput) {
        const now = new Date();
        const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        dateInput.min = localDateTime;
        dateInput.value = localDateTime;

        // Add Hebrew placeholder
        dateInput.setAttribute('placeholder', 'בחר תאריך ושעה');
    }

    // Advanced Form Validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            const inputs = form.querySelectorAll('input, select');
            
            inputs.forEach(input => {
                // Remove previous error states
                input.classList.remove('is-invalid');
                
                // Check for empty fields
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }

                // Specific validations
                switch(input.name) {
                    case 'phone':
                        const phoneRegex = /^(0[2-9]\d{8}|[1-9]\d{7})$/;
                        if (!phoneRegex.test(input.value)) {
                            input.classList.add('is-invalid');
                            isValid = false;
                        }
                        break;
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            input.classList.add('is-invalid');
                            isValid = false;
                        }
                        break;
                }
            });

            // Prevent form submission if validation fails
            if (!isValid) {
                event.preventDefault();
                alert('אנא מלא את כל השדות בצורה תקינה');
            }
        });
    }

    // Smooth scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '&#9650;';
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: none;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 24px;
        z-index: 1000;
    `;
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
