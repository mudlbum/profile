document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // window.addEventListener('scroll', () => {
    //     let scrollPosition = window.scrollY;
    //     let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    //     let scrollPercentage = (scrollPosition / documentHeight) * 100;

    //     let red = Math.min(255, (scrollPercentage * 2.55)).toFixed();
    //     let green = (255 - red).toFixed();
    //     let blue = 150;

    //     document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    //     // Show/hide back-to-top button
    //     const backToTopButton = document.getElementById('backToTop');
    //     if (scrollPosition > 300) {
    //         backToTopButton.style.display = 'block';
    //     } else {
    //         backToTopButton.style.display = 'none';
    //     }
    // });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Typewriter effect
    const typewriterText = "Interactive Media Design Student at Seneca College";
    let i = 0;
    function typeWriter() {
        if (i < typewriterText.length) {
            document.getElementById("typewriter").innerHTML += typewriterText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();

    // Carousel
    let slideIndex = 0;
    showSlides(slideIndex);

    function showSlides(index) {
        const slides = document.querySelectorAll('.carousel-inner img');
        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;
        slides.forEach((slide, i) => {
            slide.style.display = (i === slideIndex) ? 'block' : 'none';
        });
    }

    window.nextSlide = function() {
        slideIndex++;
        showSlides(slideIndex);
    }

    window.prevSlide = function() {
        slideIndex--;
        showSlides(slideIndex);
    }

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    window.addEventListener('scroll', () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (barTop < windowHeight) {
                bar.style.width = bar.getAttribute('data-percentage');
            }
        });
    });

    // Back-to-top button function
    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
