from fastapi import APIRouter
from app.schemas import *
from app.controller.public_controller.elGamal import *
from app.controller.public_controller.elGamalMenezes import *
from app.controller.public_controller.rabin import *
from app.controller.public_controller.rsa import *


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
    return {"decrypt":encrypt_text}

#----------- ElGamal--Menezes ----------#
@router.post("/suggest/keyGamalMenezes")
async def keyGamalSugest():
    key=curve.generateKeyElliptic()
   
    return key

@router.post("/encrypt/elGamalMenezes")
async def encrpytGamal(data : ElGamalv2EncryptModel):
    curve.setPublicKey(data.alpha,data.beta)
    encrypt_text=curve.encryptElliptic(data.text)
    return {"encrypt":encrypt_text}
    
@router.post("/decrypt/elGamalMenezes")
async def encrpytGamal(data : ElGamalv2DecryptModel):
    curve.setPrivateKey(data.a)
    encrypt_text=curve.decryptElliptic(data.text)
    return {"decrypt":encrypt_text}


#Rabin ---------------------
@router.post("/suggest/keyrabin")
async def keyRabinSugest():
    key=suggestKeyRabin(128)
    print(key)
    return key

@router.post("/encrypt/rabin")
async def encrpytRabin(data : RabinEncryptModel):
    encrypt_text=rabin_encryption(int(data.n),int(data.B),data.text)
    return {"encrypt":encrypt_text[0]}
    
@router.post("/decrypt/rabin")
async def decrpytRabin(data : RabinDecryptModel):
    decrypt_text=rabin_decryption(int(data.p),int(data.q),data.text,int(data.b))
    return {"decrypt":decrypt_text}

#RSA ---------------------
@router.post("/suggest/keyrsa")
async def keyRabinSugest():
    key=random_keygen_rsa(256)
    print(key)
    return key

@router.post("/encrypt/rsa")
async def encrpytRabin(data : RSAEncryptModel):
    encrypt_text=encrypt_rsa(int(data.n),int(data.e),data.text)
    return {"encrypt":encrypt_text}
    
@router.post("/decrypt/rsa")
async def decrpytRabin(data : RSADecryptModel):
    decrypt_text=decrypt_rsa(int(data.d),int(data.p),int(data.q),int(data.e),data.text)
    return {"decrypt":decrypt_text}