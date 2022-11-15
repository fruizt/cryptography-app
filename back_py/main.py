from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from app.routers import classic,modern,public,signatures
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.include_router(classic.router)
app.include_router(modern.router)
app.include_router(public.router)
app.include_router(signatures.router)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "https://cryptography.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message":"Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app",port=8000,reload=True,timeout_keep_alive=500)