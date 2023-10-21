from datetime import datetime
import os
import openai
from flask import Flask, request, render_template
from dotenv import dotenv_values

# Load config values
config_details = dotenv_values(".env")

openai.api_type = "azure"
openai.api_base = config_details['OPENAI_API_BASE']
openai.api_version = config_details['OPENAI_API_VERSION']
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__, static_url_path='/static')


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api", methods=['GET'])
def get_api_welcome():
    return {"message": "Welcome to the Azure Open AI API", "status": "success", "processed_at": datetime.now()}


@app.route("/api/get")
def get_completion_response():
    userText = request.args.get('msg')
    print("User Text: ", userText)
    response = generate_response(userText)
    return str(response)


def generate_response(user_input):
    # Include user input in the prompt
    user_prompt = f"User Input: {user_input}\n\n"
    try:
        response = openai.Completion.create(
            engine=config_details['COMPLETIONS_MODEL'],
            prompt=user_prompt,
            temperature=1,
            max_tokens=150,
            top_p=0.5,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None
        )
        answer = response.choices[0].text
        return answer
    except Exception as e:
        # Proper error handling and logging
        print("An exception has occurred:", str(e))
        return "An error occurred while processing the request."


if __name__ == "__main__":
    app.run()
