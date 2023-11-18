import os
import openai
from dotenv import dotenv_values

# Load config values
config_details = dotenv_values(".env")

openai.api_type = "azure"
openai.api_base = config_details['OPENAI_API_BASE']
openai.api_version = config_details['OPENAI_API_VERSION']
openai.api_key = os.getenv("OPENAI_API_KEY")

user_prompt = "Write a small tweet for twitter; on my Dosa Center. 1001 varities, home made spices, butter, and lots of love. I need 5 tweets."
# user_prompt = "Input: Please tell me two jokes on Software engineer"

response = openai.Completion.create(
    engine=config_details['OPENAI_ENGINE'],
    prompt=user_prompt,
    temperature=1,
    max_tokens=150,
    top_p=0.5,
    frequency_penalty=0,
    presence_penalty=0,
    stop=None)

print(response)
# print('Created: ', response['created'], 'Choices: ', response['choices'])
print(response.choices[0].text)
# print(response.choices[1].text)
# print(response.choices[2].text)
# print(response.choices[3].text)
# print(response.choices[4].text)

# print(type(response))
