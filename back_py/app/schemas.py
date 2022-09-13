from pydantic import BaseModel, Field
from fastapi import File
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
    

