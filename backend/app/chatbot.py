from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class ChatMessage(BaseModel):
    role: str 
    content: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    new_message: str

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        conversation = [{"role": m.role, "parts": [{"text": m.content}]} 
                      for m in request.messages]
        
        conversation.append({"role": "user", "parts": [{"text": request.new_message}]})
        
        response = client.generate_content(
            model="gemini-1.5-flash",
            contents=conversation
        )
        
        return {"response": response.text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))