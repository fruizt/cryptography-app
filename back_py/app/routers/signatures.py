from fastapi import APIRouter,UploadFile
from fastapi.responses import FileResponse
from app.schemas import *
from app.controller.signature_controller.dssSignature import *
from app.controller.signature_controller.rsaSignature import *

router = APIRouter(
    prefix="/signatures",
    tags=["Signatures"]
)

#----------- DSS ----------#
sign=DssSignature()
#generate new key
@router.post("/suggestKey/dss")
async def keyGamalSugest():
    sign.generateKeyElliptic()
    return {}
#generate new key
@router.post("/setPublicKey/dss")
async def keyGamalSugest(file: UploadFile):
    contents = await file.read()
    sign.setPublicKey(contents)
    return {}

#generate new key
@router.post("/setPrivateKey/dss")
async def keyGamalSugest(file: UploadFile):
    contents = await file.read()
    sign.setPrivateKey(contents)
    return {}
#return public key
@router.post("/publicKey/dss")
async def keyGamalSugest():
    
    return FileResponse("mypublickey.pem")
#return private key
@router.post("/privateKey/dss")
async def keyGamalSugest():
    
    return FileResponse("myprivatekey.pem")

@router.post("/sign/dss")
async def keyGamalSugest(file: UploadFile):
    
    fil=sign.signFile(file.file)
    
    return fil

#verify a file
@router.post("/verify/dss")
async def keyGamalSugest(file: UploadFile,signText: str):
    fil=sign.verifyFile(signText,file.file)
    return fil

#----------- rsa ----------#
sign2=RsaSignature()
#generate new key
@router.post("/suggestKey/rsa")
async def keyGamalSugest():
    sign2.generateKeyRsa()
    return {}
#generate new key
@router.post("/setPublicKey/rsa")
async def keyGamalSugest(file: UploadFile):
    contents = await file.read()
    sign2.setPublicKey(contents)
    return {}

#generate new key
@router.post("/setPrivateKey/rsa")
async def keyGamalSugest(file: UploadFile):
    contents = await file.read()
    sign2.setPrivateKey(contents)
    return {}
#return public key
@router.post("/publicKey/rsa")
async def keyGamalSugest():
    
    return FileResponse("mypublickeyRSA.pem")
#return private key
@router.post("/privateKey/rsa")
async def keyGamalSugest():
    
    return FileResponse("myprivatekeyRSA.pem")

@router.post("/sign/rsa")
async def keyGamalSugest(file: UploadFile):
    
    fil=sign2.signFile(file.file)
    
    return fil

#verify a file
@router.post("/verify/rsa")
async def keyGamalSugest(file: UploadFile,signText: str):
    fil=sign2.verifyFile(signText,file.file)
    return fil


