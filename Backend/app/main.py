from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import booking, checkout, service_bot, validator, test, chat

app = FastAPI(title="Snack Overflow API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://35.228.227.23:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(booking.router) #/booking
app.include_router(checkout.router) #/checkout
app.include_router(service_bot.router) #/service
app.include_router(validator.router) #/validate
app.include_router(chat.router) #/chat

@app.get("/")
def root():
    return {"message": "Backend OK"}
