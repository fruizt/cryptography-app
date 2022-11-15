from fastapi import APIRouter,UploadFile
from app.schemas import *
from app.controller.signature_controller.dssSignature import *


router = APIRouter(
    prefix="/signatures",
    tags=["Signatures"]
)

#----------- DSS ----------#
sign=DssSignature()
#sign a file
@router.post("/sign/dss")
async def keyGamalSugest(data: UploadFile):
    fil=sign.signFile(data.file)
    
    return fil

#verify a file
@router.post("/verify/dss")
async def keyGamalSugest(data: UploadFile,signText: str):
    fil=sign.verifyFile(signText,data.file)
    return fil


