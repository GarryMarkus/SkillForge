from langchain.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAI, ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from dotenv import load_dotenv
import os
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY or GOOGLE_API_KEY is missing. Set it in your .env file.")
model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",   
    api_key=API_KEY
)



module_prompt = PromptTemplate(
    input_variables=["topic", "level"],
    template="""
You are an expert educator.

Create a learning module.

Topic: {topic}
Level: {level}

Return ONLY JSON:

{{
  "content": "full markdown module text",
  "metadata": {{
      "difficulty": "{level}",
      "estimated_hours": number,
      "tags": ["tag1","tag2"],
      "prerequisites": ["item1","item2"]
  }}
}}
"""
)


parser = StrOutputParser()


module_chain = module_prompt | model | parser


def generate_learning_module(topic: str, level: str):
    return module_chain.invoke({
        "topic": topic,
        "level": level
    })
