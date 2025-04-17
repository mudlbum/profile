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
    const chatWindow = document.getElementById("chat-window");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    
    const appendMessage = (sender, text) => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.innerHTML = `<span class="${sender}">${sender === "user" ? "You" : "Agent"}:</span> ${text}`;
      chatWindow.appendChild(messageDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the latest message
    };
    
    const sendMessage = async () => {
      const message = userInput.value.trim();
      if (!message) return;
    
      // Display the user's message
      appendMessage("user", message);
      userInput.value = ""; // Clear input
    
      try {
        const response = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
    
        if (response.ok) {
          const data = await response.json();
          appendMessage("Agent", data.response);
        } else {
          appendMessage("Agent", "Error: Failed to fetch response from the server.");
        }
      } catch (error) {
        console.error("Error:", error);
        appendMessage("Agent", "Error: Unable to connect to the server.");
      }
    };
    
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") sendMessage();
    });
    function handleResponse(response) {
        const chatBox = document.getElementById('chat-box');
        const inputField = document.getElementById('message-input');
      
        // Display the chatbot response
        chatBox.innerHTML += `<div class="bot-response">${response.response}</div>`;
      
        // Check if the chat is closed
        if (response.response.includes('The chat session has been closed')) {
          inputField.disabled = true; // Disable input field
          inputField.placeholder = 'Chat session has ended. Please refresh to start a new chat.';
        }
      }
      
document.addEventListener('scroll', function() {
    window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');

        hero.style.backgroundPositionY = `${scrolled * 0.01}px`; 
    });
});
