document.addEventListener('DOMContentLoaded', (event) => {
    const initialMessages = [
        "Hello there",
        "Why is it so dark here?",
        "Can you switch on the light??"
    ];

    const additionalMessages = [
        "Woah...!",
        "It's so pretty and purple here...",
        "Knock, Knock, knock..",
        "Open the door..."
    ];

    let messageIndex = 0;
    const messageElement = document.getElementById('message');
    const bulbContainer = document.getElementById('bulb-container');
    const bulbMessageElement = document.getElementById('bulb-message');
    const additionalMessageElement = document.getElementById('additional-message');
    const additionalMessagesContainer = document.getElementById('additional-messages');
    const doorContainer = document.getElementById('door-container');
    const finalMessageElement = document.getElementById('final-message');
    const videoElement = document.getElementById('birthday-video');
    const bodyElement = document.body;

    function showMessage(messages, callback) {
        if (messageIndex < messages.length) {
            messageElement.textContent = messages[messageIndex];
            messageElement.classList.remove('hidden');
            setTimeout(() => {
                messageElement.classList.add('hidden');
                messageIndex++;
                if (messageIndex < messages.length) {
                    setTimeout(() => showMessage(messages, callback), 1000);
                } else {
                    messageIndex = 0; // Reset index for additional messages
                    callback();
                }
            }, 3000);
        }
    }

    function showAdditionalMessages() {
        additionalMessagesContainer.classList.remove('hidden');
        if (messageIndex < additionalMessages.length) {
            additionalMessageElement.textContent = additionalMessages[messageIndex];
            additionalMessageElement.classList.remove('hidden');
            setTimeout(() => {
                additionalMessageElement.classList.add('hidden');
                messageIndex++;
                if (messageIndex < additionalMessages.length) {
                    setTimeout(showAdditionalMessages, 1000);
                } else {
                    additionalMessagesContainer.classList.add('hidden');
                    doorContainer.style.display = 'block';
                }
            }, 3000);
        }
    }

    function fadeBackgroundImage(newImageUrl, callback) {
        bodyElement.style.backgroundImage = `url('${newImageUrl}')`;
        setTimeout(callback, 1000); // Allow time for transition
    }

    setTimeout(() => showMessage(initialMessages, () => {
        bulbContainer.style.display = 'block';
        bulbMessageElement.classList.remove('hidden');
        bulbMessageElement.textContent = "Click on the army bomb";
        bodyElement.style.backgroundImage = 'url("image.png")'; // Initial background image
    }), 1000);

    document.getElementById('bulb').addEventListener('click', () => {
        bulbContainer.style.display = 'none';
        bulbMessageElement.classList.add('hidden');
        fadeBackgroundImage('bedroom.png', showAdditionalMessages); // Change to your new background image
    });

    document.getElementById('door').addEventListener('click', () => {
        doorContainer.style.display = 'none';
        bodyElement.style.backgroundImage = 'none';
        finalMessageElement.querySelector('p').textContent = "Bangtan wants to say something to you :)";
        finalMessageElement.classList.remove('hidden');
        videoElement.classList.remove('hidden');
        videoElement.style.display = 'block';
        videoElement.play();
        console.log("Video element visibility:", window.getComputedStyle(videoElement).display); 
        // console.log("Video element visibility:", window.getComputedStyle(videoElement).display); // Debug statement to check if the element is shown
    });
});    
