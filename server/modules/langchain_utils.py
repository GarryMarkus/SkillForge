import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

_model = None

def get_model():
    """
    Lazily initialize and return the Gemini ChatGoogleGenerativeAI client.
    Prevents runtime startup crashes when GEMINI_API_KEY is not configured.
    """
    global _model
    if _model is None:
        api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY or GOOGLE_API_KEY is missing. Set it in your .env file.")
        _model = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            api_key=api_key
        )
    return _model


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


def generate_learning_module(topic: str, level: str) -> str:
    """Generate structured educational markdown content and metadata for a given topic and skill level."""
    chain = module_prompt | get_model() | parser
    return chain.invoke({
        "topic": topic,
        "level": level
    })
