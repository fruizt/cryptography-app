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
    size: int
    key: str
    file:  bytes = File(...)

class HillTextRequest(BaseModel):
    size: int
    key: str
    string: str

class HillAttackRequest(BaseModel):
    size: int
    unknown: str
    known: str