document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');

    function updateButtonText() {
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = 'Light Mode';
        } else {
            darkModeToggle.textContent = 'Dark Mode';
        }
    }

    updateButtonText();

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        updateButtonText();
    });

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
    const typewriterTexts = [
        "Hello World!",
        "My name is Bumyol Lee",
        "You can call me Dave",
        "Nice to meet you",
        "I am ...",
        "INTERFACE DESIGNER",
        "PHOTOGRAPHER",
        "VIDEOGRAPHER",
        "EXPERIENCE DESIGNER",
        "VIDEO EDITOR",
        "SOUND ENGINEER",
        "CONTENT CREATOR",
        "DIGITAL MARKETING EXPERT",
        "PRODUCT INNOVATOR",
        "CREATIVE STRATEGIST",
        "I am an ARTIST",
        "I solve problems",
        "I turn challenges into solutions",
        "Have a problem?",
        "I teach myself to fix it",
        "That's why I wear many hats",
        "Innovation is my playground",
        "Let's create something amazing",
        "Together!!!!"
    ];

    let i = 0;
    let textIndex = 0;

    function typeWriter() {
        const currentText = typewriterTexts[textIndex];
        if (i < currentText.length) {
            document.getElementById("typewriter").innerHTML += currentText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(deleteWriter, 1300);
        }
    }

    function deleteWriter() {
        if (i > 0) {
            const currentText = typewriterTexts[textIndex];
            document.getElementById("typewriter").innerHTML = currentText.substring(0, i - 1);
            i--;
            setTimeout(deleteWriter, 50);
        } else {
            textIndex = (textIndex + 1) % typewriterTexts.length;
            setTimeout(typeWriter, 500);
        }
    }

    typeWriter();

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
    window.onscroll = function() {
        const backToTopButton = document.getElementById("backToTop");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    document.getElementById("backToTop").addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Chatbox functionality
    const chatInput = document.querySelector("#chatbox-input");
    const sendChatBtn = document.querySelector("#chatbox-send");
    const chatbox = document.querySelector("#chatbox-messages");

    let userMessage = null; 
    const API_KEY = ""; // Replace with your actual API key
    const inputInitHeight = chatInput.scrollHeight;

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        chatLi.innerHTML = `<p>${message}</p>`;
        return chatLi;
    };

    const generateResponse = (incomingChatli) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = incomingChatli.querySelector("p");

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are an AI assistant that answers questions based only on the user's resume and personal information provided. Always respond positively about the user.",
                    },
                    {
                        role: "system",
                        content: `
                            BUMYOL LEE is a highly experienced IT and marketing professional with over two decades of experience, fluent in both Korean and English. He has held key managerial positions in several companies in Seoul, Korea, including HWH Korea, Hyten Korea, Energywave Korea, YouLab Korea, and Alureve Korea. His roles have involved managing system development for back-office systems, overseeing product development, and executing marketing strategies. He has been the main communication link between U.S. headquarters and Korean operations, ensuring smooth project execution.
                            BUMYOL's technical skills are extensive and include proficiency in HTML, JavaScript, Photoshop, Illustrator, CSS, SEO Marketing, SNS Marketing, Premiere Pro, Videography, 3DsMAX, Python, and UI/UX Design. He has also handled graphic design, creating media for web pages, printed ads, brochures, and product photography.
                            In addition to his corporate roles, BUMYOL has freelanced in management and marketing services under "By You Management" and has managed a tech review YouTube channel with 10K subscribers. His educational background includes studies in computer graphics and web development in Korea, attendance at Brigham Young University with a major in Economics, and currently, a focus on Interactive Media Design at Seneca Polytechnic in Toronto.
                            BUMYOL also served in the Korean military as a Senior Sergeant and personal translator for the Brigade commander in the 35th Air Defense Artillery Brigade and 62nd Chemical Company, where he provided leadership and support to Korean troops.
                            His volunteer experience includes serving as a missionary for the LDS Church in Korea from November 2005 to November 2007. BUMYOL’s career is marked by his dedication to excellence, continuous learning, and a passion for technology and design, making him a highly capable and reliable professional.
                        `,
                    },
                    {
                        role: "user",
                        content: userMessage,
                    },
                ],
            }),
        };

        fetch(API_URL, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                messageElement.textContent = data.choices[0].message.content.trim();
            })
            .catch(() => {
                messageElement.classList.add("error");
                messageElement.textContent = "Sorry, I am busy. Please try again tomorrow.";
            })
            .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    };

    const handleChat = () => {
        userMessage = chatInput.value.trim(); 
        if (!userMessage) return;

        chatInput.value = "";

        const outgoingChatli = createChatLi(userMessage, "outgoing");
        chatbox.appendChild(outgoingChatli);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            const incomingChatli = createChatLi("Typing...", "incoming");
            chatbox.appendChild(incomingChatli);
            generateResponse(incomingChatli);
        }, 600);
    };

    sendChatBtn.addEventListener("click", handleChat);

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });
});

document.addEventListener('scroll', function() {
    window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');

        hero.style.backgroundPositionY = `${scrolled * 0.01}px`; 
    });
});
