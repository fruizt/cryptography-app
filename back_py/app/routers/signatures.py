from fastapi import APIRouter,UploadFile
from fastapi.responses import FileResponse
from app.schemas import *
from app.controller.signature_controller.dssSignature import *


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


