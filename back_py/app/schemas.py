from pydantic import BaseModel, Field

class Item(BaseModel):
    text: str
    key: int | str | None = None 
    
class PermutationRequest(BaseModel):
    text: str
    key: str
    key_size: int = Field(gt=1, description="The key parameter")

class SuggestKeyRequest(BaseModel):
    m: int
    
class SubstitutionRequest(BaseModel):
    text: str
    key: str 
    
    