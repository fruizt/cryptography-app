from fastapi import APIRouter
from app.schemas import *
from app.controller.modern_controller.gammaPentagonal_controller import *
from app.controller.modern_controller.generateRandomKey import *
from app.controller.modern_controller.aes import *
from app.controller.modern_controller.des import *
from app.controller.modern_controller.sdes import *
import base64

router = APIRouter(
    prefix="/modern",
    tags=["Modern"]
)

##Gamma Pentagonal
#define flag deafult permutation
@router.post("/encrypt/gamma_graph")
async def ceasar_cypher(data : GammaPentagonalRequest):
    permutation=list(map(int,data.permutation.split("-")))
    init=list(map(int,data.init.split(",")))
    system=GammaPentagonal(init,permutation,4,10)

    return {"scatterPlot":system.scatter_plot,"linePlot":system.lines_plot,"matrixPlot":system.matrix_plot}

@router.post("/encrypt/gamma_pentagonal")
async def ceasar_cypher(data : GammaPentagonalRequest):
    permutation=list(map(int,data.permutation.split("-")))
    init=list(map(int,data.init.split(",")))
    system=GammaPentagonal(init,permutation,4,10)
    encrypt_text=system.encryptGammaPentagonal(data.text)
    return {"encryptText":f"{encrypt_text}"[1:-1]}

@router.post("/decrypt/gamma_pentagonal")
async def ceasar_cypher(data : GammaPentagonalRequest):
    permutation=list(map(int,data.permutation.split("-")))
    init=list(map(int,data.init.split(",")))
    system=GammaPentagonal(init,permutation,4,10)
    lista = data.text.replace('[','')
    lista = lista.replace(' ','')
    lista = lista.split(']')
    lista = [i.lstrip(',') for i in lista]
    if (lista[-1] == ""): lista = lista[:-1]
    lista = [list(map(int,i.split(','))) for i in lista]
    encrypt_text=system.decryptGammaPentagonal(lista)
    return {"encryptText":encrypt_text.upper()}

@router.post("/generateKeyBits")
async def generate_key(data: SuggestKeyRequest):
    a=generateRandomKeyBits(data.m)

    return {"result":a}

@router.post("/showImageAES")
def read_item(file : bytes = File(...)):
    temporal=Image.open(io.BytesIO(file))
    temporal.save("show.bmp")

    encoded = base64.b64encode(open("show.bmp", "rb").read())
    
    return {"filename": "photo.bmp", "filedata": 'data:image/bmp;base64,{}'.format(encoded.decode())}
@router.post("/aes/encryptImages")
def read_item(file:  bytes = File(...),size=16,key="",mode=1):
    #print(file)
    encrypt=AES_pic_encript(file,key,int(mode))
    encoded = base64.b64encode(open("topsecretEnc.bmp", "rb").read())
    
    #temporal=Image.open(io.BytesIO(file))
    #temporal.save("show.bmp")
    return {"filename": "encrypt.bmp", "filedata": 'data:image/bmp;base64,{}'.format(encoded.decode())}

@router.post("/aes/decryptImages")
def read_item(file:  bytes = File(...),size=16,key="",mode=1):
    print(mode)
    temporal=Image.open(io.BytesIO(file))
    temporal.save("decrypt.bmp")
    decrypt=AES_pic_decript("decrypt.bmp",key,int(mode))
    encoded = base64.b64encode(open("decripted.bmp", "rb").read())
    return {"filename": "decrypted.bmp", "filedata": 'data:image/bmp;base64,{}'.format(encoded.decode())}

@router.post("/aes/encrypt")
def read_item(data:AESRequest):
    iv,encrypt=AES_encript(data.key,data.encrypt,int(data.mode))
    return {"encrypt": encrypt, "iv": iv}

@router.post("/aes/decrypt")
def read_item(data:AESDecryptRequest):
    decrypt=AES_decript(data.key,data.encrypt,int(data.mode),data.iv)
    
    return {"decrypt": decrypt}

@router.post("/tdes/encryptImages")
def read_item(file:  bytes = File(...),size=16,key="",mode=1):
    #print(file)
    encrypt=DES3_pic_encript(file,key,int(mode))
    encoded = base64.b64encode(open("topsecretEnc.bmp", "rb").read())
    
    #temporal=Image.open(io.BytesIO(file))
    #temporal.save("show.bmp")
    return {"filename": "encrypt.bmp", "filedata": 'data:image/bmp;base64,{}'.format(encoded.decode())}

@router.post("/tdes/decryptImages")
def read_item(file:  bytes = File(...),size=16,key="",mode=1):
    print(mode)
    temporal=Image.open(io.BytesIO(file))
    temporal.save("decrypt.bmp")
    decrypt=DES3_pic_decript("decrypt.bmp",key,int(mode))
    encoded = base64.b64encode(open("decripted.bmp", "rb").read())
    return {"filename": "decrypted.bmp", "filedata": 'data:image/bmp;base64,{}'.format(encoded.decode())}

@router.post("/tdes/encrypt")
def read_item(data:AESRequest):
    iv,encrypt=DES3_encript(data.key,data.encrypt,int(data.mode))
    return {"encrypt": encrypt, "iv": iv}

@router.post("/tdes/decrypt")
def read_item(data:AESDecryptRequest):
    decrypt=DES3_decript(data.key,data.encrypt,int(data.mode),data.iv)
    
    return {"decrypt": decrypt}

@router.post("/sdes/encrypt")
def read_item(data:SDESRequest):
    
    permutation=[int(x) for x in data.permutation]
    encrypt=S_DESEncript(data.encrypt,data.key,permutation)
    return {"encrypt": encrypt}

@router.post("/sdes/decrypt")
def read_item(data:SDESRequest):
    permutation=[int(x) for x in data.permutation]
    print(data)
    decrypt=S_DESDecript(data.encrypt,data.key,permutation)
    
    return {"decrypt": decrypt}

@router.post("/sdes/suggestKey")
def read_item():
    
    permutation2=Suggest()
    permutation="".join(map(str,permutation2))
    key=SuggestK()
    

    return {"permutation": permutation,"key":key}
    