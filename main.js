document.addEventListener('DOMContentLoaded', () => {
    // ===============================
    // 1. HEADER & MOBILE MENU TOGGLE
    // Fulfills: Mobile Menu (Hamburger) requirement
    // ================================
    const menuBtn  = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggles for menu visibility and the hamburger icon animation class
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Toggles CSS class to slide menu in/out
        menuBtn.classList.toggle('open');    // Toggles CSS class to animate the hamburger icon (X)
    }) ;

    // Close menu when a navigation link is clicked (improves mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });

    // ====================================
    // 2. THEME SWITCH (Dark/Light Mode)
    // Fulfills: Dark/Light Mode Switch requirement
    // ====================================
    const themeToggle = document.getElementById('theme-toggle');

    // Function to set the theme based on local storage or system preference
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        // If theme is saved as 'dark', apply it
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.checked = true;
        } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // If no theme is saved, check system preference
            document.body.classList.add('dark-theme');
            themeToggle.checked = true;
        }
    }

    // Listener to handle the toggle action and save preference
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    initializeTheme(); // Run on page load

    // ====================================
    // 3. TYPEWRITER EFFECT
    // Fulfills: Interactive/Animated Headline requirement
    // ====================================
    const typewriterElement = document.getElementById('typewriter-text');
    // Words must be updated if you change the "UX Designer", "Creative Coder", etc. roles
    const words = ["UX Designer", "Frontend Engineer", "Creative Coder", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!typewriterElement) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typewriterElement.textContent = currentWord.substring(0, charIndex);

        let typingSpeed = 150; 
        
        if (isDeleting) {
            typingSpeed /= 2; // Delete faster
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at the end of a word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to the next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter(); // Start the animation

    // ====================================
    // 4. SCROLL ANIMATIONS (Intersection Observer)
    // Fulfills: Scroll-to-view/fade-in animation requirement
    // ====================================
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Adds CSS class to fade in/move up
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Triggers when 10% of the element is visible
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // ====================================
    // 5. ANIMATED SKILL BARS
    // Fulfills: Animated Skill Bars requirement
    // ====================================
    const skillBars = document.querySelectorAll('.skill-bar-inner');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute('data-percentage');
                // Sets width dynamically to trigger the CSS transition (animation)
                bar.style.width = percentage + '%'; 
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.8 // Triggers when 80% of the skill bar is visible
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // ====================================
    // 6. PROJECT FILTERING LOGIC
    // Fulfills: Project Filtering Functionality requirement
    // ====================================
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ====================================
    // 7. FOOTER YEAR UPDATE
    // Fulfills: Footer with auto-updating year requirement
    // ====================================
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});