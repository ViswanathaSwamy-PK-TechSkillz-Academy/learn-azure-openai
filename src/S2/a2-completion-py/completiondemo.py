import os
import requests
from dotenv import dotenv_values

# Load config values
config_details = dotenv_values(".env")

# Request URL
api_url = f"{config_details['OPENAI_API_BASE']}/openai/deployments/{config_details['OPENAI_ENGINE']}/completions?api-version={config_details['OPENAI_API_VERSION']}"

# Example prompt for request payload
prompt = "Tell me two jokes on intelligent people"
# prompt = "Give me a single-liner tweet for my 1001 dosa center homemade spices with love"
# prompt = "Input: Please tell me two jokes on Software engineer"

# Json payload
# To know more about the parameters, checkout this documentation: https://learn.microsoft.com/en-us/azure/cognitive-services/openai/reference
json_data = {
    "prompt": prompt,
    "temperature": 0,
    "max_tokens": 100,
    "echo": True,
}

# Including the api-key in HTTP headers
headers = {"api-key": os.getenv("OPENAI_API_KEY")}

try:
    # Request for creating a completion for the provided prompt and parameters
    response = requests.post(api_url, json=json_data, headers=headers)
    completion = response.json()

    # print the completion
    print(completion['choices'][0]['text'])

    # Here indicating if the response is filtered
    if completion['choices'][0]['finish_reason'] == "content_filter":
        print("The generated content is filtered.")
except:
    print("An exception has occurred. \n")
    print("Error Message:", completion['error']['message'])
