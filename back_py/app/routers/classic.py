from fastapi import APIRouter
from app.schemas import *

from app.controller.classic_controller_ import *

router = APIRouter(
    prefix="/classic",
    tags=["Classic"]
)


##ceasar
@router.post("/encrypt/ceasar")
async def ceasar_cypher(item:Item):
    return {"text cipher":decrypt_ceasar(item.text,item.key)}

@router.post("/decrypt/ceasar")
async def ceasar_decypher(item:Item):
    return {"text decipher":decrypt_ceasar(item.text,item.key)}

@router.post("/analyse/ceasar")
async def ceasar_decypher(item:Item):
    return {"text decipher":analyse_ceasar(item.text)}


##vigenere
@router.post("/encrypt/vigenere")
async def vigenere_cypher(item:Item):
    return {"text cipher":encrypt_vigenere(item.text,item.key)}

@router.post("/decrypt/vigenere")
async def ceasar_decypher(item:Item):
    return {"text decipher":analyse_ceasar(item.text)}

@router.post("/analyse/vigenere")
async def ceasar_decypher(item:Item):
    return {"text decipher":analyse_ceasar(item.text)}


##permutation
@router.post("/permutation/encrypt/")
def read_item(data : PermutationRequest):
    text_cript=permutation(data.text,data.key,int(data.key_size))
    return {"result":text_cript.upper()}

@router.post("/permutation/decrypt/")
def read_item(data : PermutationRequest):
    text_cript=decrypt_permutation(data.text,data.key,int(data.key_size))
    return {"result":text_cript.upper()}

@router.post("/permutation/suggestKey/")
def read_item(data : SuggestKeyRequest):
    key=suggestKey(int(data.m))
    return {"result":key}


##substitution
@router.post("/encrypt/substitution")
def read_item(data : PermutationRequest):
    text_cript=permutation(data.text,data.key,int(data.key_size))
    return {"result":text_cript.upper()}

@router.post("/decrypt/substitution")
def read_item(data : PermutationRequest):
    text_cript=decrypt_permutation(data.text,data.key,int(data.key_size))
    return {"result":text_cript.upper()}

@router.post("/analyse/substitution")
def read_item(data : SuggestKeyRequest):
    key=suggestKey(int(data.m))
    return {"result":key}


#############model
#https://www.geeksforgeeks.org/caesar-cipher-in-cryptography/
#https://stackoverflow.com/questions/40975199/caesar-cipher-without-knowing-the-key
#https://inventwithpython.com/hacking/chapter21.html
