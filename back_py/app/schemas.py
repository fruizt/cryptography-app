from cgitb import text
from pydantic import BaseModel, Field
from fastapi import File,UploadFile
class Item(BaseModel):
    text: str
    # key: int | str | None = None 
    key: int
    
class VigenereRequest(BaseModel):
    text: str
    key: str
    
class PermutationRequest(BaseModel):
    text: str
    key: str
    key_size: int = Field(gt=1, description="The key parameter")

class SuggestKeyRequest(BaseModel):
    m: int
    
class SubstitutionRequest(BaseModel):
    text: str
    key: str 
class SubstitutionAttackRequest(BaseModel):
    text: str
    iteration: int 

class SubstitutionMonogramRequest(BaseModel):
    text: str

class HillImageRequest(BaseModel):
    file:  bytes = File(...)
    size: int
    key: str
    

class HillTextRequest(BaseModel):
    size: int
    key: str
    string: str

class HillAttackRequest(BaseModel):
    size: int
    unknown: str
    known: str

class AffineRequest(BaseModel):
    text: str
    # key: int | str | None = None 
    key: int
    ky: int

class GammaPentagonalRequest(BaseModel):
    permutation: str
    text: str
    init: str

class AESImageRequest(BaseModel):
    file:  bytes = File(...)

class AESRequest(BaseModel):
    key: str
    encrypt: str
    mode: str
class AESDecryptRequest(BaseModel):
    key: str
    encrypt: str
    mode: str
    iv: str
class SDESRequest(BaseModel):
    key: str
    encrypt: str
    permutation: str
    
#ELgamal --------------
class ElGamalEncryptModel(BaseModel):
    text: str
    p: int 
    generator: int 
    beta: int
    k: int
class ElGamalDecryptModel(BaseModel):
    text: str
    p: int 
    x: int 
class ElGamalv2EncryptModel(BaseModel):
    text: str
    beta:str
    alpha: str
class ElGamalv2DecryptModel(BaseModel):
    text: str
    a:int
    



#Rabin --------------
class RabinEncryptModel(BaseModel):
    text: str
    n: int 
    B: int 
class RabinDecryptModel(BaseModel):
    text: str
    p: int 
    q: int
    b: int 

#RSA --------------
class RSAEncryptModel(BaseModel):
    text: str
    n: int 
    e: int 
class RSADecryptModel(BaseModel):
    text: str
    p: int 
    q: int
    e: int
    d: int 

