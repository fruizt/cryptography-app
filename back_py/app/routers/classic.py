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
    text = verify_string(item.text.upper())
    return {"text":encrypt_ceasar(text,item.key)}

@router.post("/decrypt/ceasar")
async def ceasar_decypher(item:Item):
    text = verify_string(item.text.upper())
    return {"text":decrypt_ceasar(text,item.key)}

@router.post("/analyse/ceasar")
async def ceasar_decypher(item:Item):
    text = verify_string(item.text.upper())
    return {"text":analyse_ceasar(text)}


##vigenere
@router.post("/encrypt/vigenere")
async def vigenere_cypher(item:Item):
    text = verify_string(item.text.upper())
    key = verify_string(item.key.upper())
    return {"text":encrypt_vigenere(text,key)}

@router.post("/decrypt/vigenere")
async def vigenere_decypher(item:Item):
    text = verify_string(item.text.upper())
    key = verify_string(item.key.upper())
    return {"text":decrypt_vigenere(text,key)}

@router.post("/analyse/vigenere")
async def vigenere_analysis(item:Item):
    text = verify_string(item.text.upper())
    return {"text":analyse_vigenere(text)}


##permutation
@router.post("/encrypt/permutation")
def read_item(data : PermutationRequest):
    text_cript=permutation(data.text,data.key,len(data.key))
    return {"result":text_cript.upper()}

@router.post("/decrypt/permutation")
def read_item(data : PermutationRequest):
    text_cript=decrypt_permutation(data.text,data.key,int(data.key_size))
    return {"result":text_cript.upper()}

@router.post("/suggestKey/permutation")
def read_item(data : SuggestKeyRequest):
    key=suggestKey(int(data.m))
    return {"result":key}


##substitution
@router.post("/encrypt/substitution")
def read_item(data : SubstitutionRequest):
    text_cript=EncrSubstitution(data.text,data.key)
    return {"result":text_cript.upper()}

@router.post("/decrypt/substitution")
def read_item(data : SubstitutionRequest):
    text_cript=DecrSubstitutuon(data.text,data.key)
    return {"result":text_cript.upper()}

@router.post("/analyse/substitution")
def read_item(data : SubstitutionRequest):
    key=suggestKey(int(data.m))
    return {"result":key}


#############model
#https://www.geeksforgeeks.org/caesar-cipher-in-cryptography/
#https://stackoverflow.com/questions/40975199/caesar-cipher-without-knowing-the-key
#https://inventwithpython.com/hacking/chapter21.html
