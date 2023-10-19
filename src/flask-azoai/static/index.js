function generateResponse() {
    const userInput = document.getElementById("userInput").value;
    const responseContainer = document.getElementById("response");
    const chatList = document.getElementById("chat-list");

    // Append the user's input to the chat
    chatList.innerHTML += `<li class="list-group-useritem"><b>You:</b> ${userInput}</li>`;

    // Make an API request to your Flask API
    fetch("/api/get?msg=" + userInput)
        .then(response => response.text())
        .then(data => {
            // Process the response to remove <br> tags
            data = processResponse(data);

            // Append the AI's response to the chat
            chatList.innerHTML += `<li class="list-group-azoaiitem"><b>OpenAI:</b> ${data}</li>`;
            console.log("Success:", data);
            responseContainer.innerText = data;
        })
        .catch(error => {
            console.error("An error occurred:", error);
            responseContainer.innerText = "An error occurred while processing the request.";
            chatList.innerHTML += `<li class="list-group-azoaiitem"><b>OpenAI:</b> An error occurred while processing the request.</li>`;
        });
}

// Process the API response and remove unwanted <br> tags
function processResponse(data) {
    // Remove leading <br> tags and trim the response
    data = data.replace(/^<br>/g, '').trim();
    return data;
}