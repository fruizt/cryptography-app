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
    return {"text cipher":encrypt_ceasar(text,item.key)}

@router.post("/decrypt/ceasar")
async def ceasar_decypher(item:Item):
    text = verify_string(item.text.upper())
    return {"text decipher":decrypt_ceasar(text,item.key)}

@router.post("/analyse/ceasar")
async def ceasar_decypher(item:Item):
    text = verify_string(item.text.upper())
    return {"text decipher":analyse_ceasar(text)}


##vigenere
@router.post("/encrypt/vigenere")
async def vigenere_cypher(item:Item):
    text = verify_string(item.text.upper())
    key = verify_string(item.key.upper())
    return {"text cipher":encrypt_vigenere(text,key)}

@router.post("/decrypt/vigenere")
async def vigenere_decypher(item:Item):
    text = verify_string(item.text.upper())
    key = verify_string(item.key.upper())
    return {"text decipher":decrypt_vigenere(text,key)}

@router.post("/analyse/vigenere")
async def vigenere_analysis(item:Item):
    text = verify_string(item.text.upper())
    return {"text decipher":analyse_vigenere(text)}


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
def read_item(data : SubstitutionAttackRequest):
    print("------------")
    text_cript=advancedAnalysis(data.text,data.iteration)
    return {"result":text_cript}

@router.post("/analyse/substitution/monograms")
def read_item(data : SubstitutionMonogramRequest):
    text_cript=FrecText(data.text)
    return {"result":text_cript}

##Hill
@router.post("/encrypt/hillimage")
def read_item(data : HillImageRequest):
    text_cript=Hill_encript_pic(data.size,data.key,data.file)
    return {"result":text_cript}

@router.post("/decrypt/hillimage")
def read_item(data : HillImageRequest):
    text_cript=Hill_decript_pic(data.size,data.key,data.file)
    return {"result":text_cript}

@router.post("/encrypt/hilltext")
def read_item(data : HillTextRequest):
    text_cript=Hill_encript_str(data.size,data.key,data.string)
    return {"result":text_cript.upper()}

@router.post("/decrypt/hilltext")
def read_item(data : HillTextRequest):
    text_cript=Hill_decript_str(data.size,data.key,data.string)
    return {"result":text_cript.upper()}

@router.post("/analyse/hilltext")
def read_item(data : HillAttackRequest):
    text_cript=Hill_attack(data.size,data.unknown,data.known)
    return {"result":text_cript}

#############model
#https://www.geeksforgeeks.org/caesar-cipher-in-cryptography/
#https://stackoverflow.com/questions/40975199/caesar-cipher-without-knowing-the-key
#https://inventwithpython.com/hacking/chapter21.html
