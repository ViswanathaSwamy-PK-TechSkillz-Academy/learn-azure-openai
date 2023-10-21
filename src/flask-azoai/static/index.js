function generateResponseFromAOAI() {
    const userInput = document.getElementById("userInput").value;
    const currentResponse = document.getElementById("current-response");
    const chatMessagesHistory = document.getElementById("chat-messages-history");

    // Append the user's input to the chat
    chatMessagesHistory.innerHTML += `<li class="list-group-useritem"><b>You:</b> ${userInput}</li>`;

    // Make an API request to your Flask API
    fetch("/api/get?userinput=" + userInput)
        .then(response => response.text())
        .then(data => {
            data = processResponse(data);

            // Append the AI's response to the chat Messages History
            chatMessagesHistory.innerHTML += `<li class="list-group-azoaiitem"><b>OpenAI:</b> ${data}</li>`;
            console.log("Success:", data);
            currentResponse.innerText = data;
        })
        .catch(error => {
            console.error("An error occurred:", error);
            currentResponse.innerText = "An error occurred while processing the request.";
            chatMessagesHistory.innerHTML += `<li class="list-group-azoaiitem"><b>OpenAI:</b> An error occurred while processing the request.</li>`;
        });
}

// Process the API response and remove unwanted <br> tags
function processResponse(data) {
    data = data.replace(/^<br>/g, '').trim();
    return data;
}