from fastapi import APIRouter
from app.schemas import *
from app.controller.public_controller.elGamal import *
from app.controller.public_controller.elGamalMenezes import *


router = APIRouter(
    prefix="/public",
    tags=["Public"]
)

#----------- ElGamal ----------#
curve=Elliptic()
@router.post("/suggest/keyGamal")
async def keyGamalSugest():
    key=generateKeyGamal()
    print(key)
    return key

@router.post("/encrypt/elGamal")
async def encrpytGamal(data : ElGamalEncryptModel):
    encrypt_text=encryptGamal(data.text,data)
    return {"encrypt":encrypt_text}
    
@router.post("/decrypt/elGamal")
async def encrpytGamal(data : ElGamalDecryptModel):
    encrypt_text=decryptGamal(data.text,data)
    return {"encrypt":encrypt_text}

#----------- ElGamal--Menezes ----------#
@router.post("/suggest/keyGamalMenezes")
async def keyGamalSugest():
    key=curve.generateKeyElliptic()
    print(key)
    return key

@router.post("/encrypt/elGamalMenezes")
async def encrpytGamal(data : ElGamalv2EncryptModel):
    encrypt_text=curve.encryptElliptic(data.text)
    return {"encrypt":encrypt_text}
    
@router.post("/decrypt/elGamalMenezes")
async def encrpytGamal(data : ElGamalv2EncryptModel):
    encrypt_text=curve.decryptElliptic(data.text)
    return {"encrypt":encrypt_text}
