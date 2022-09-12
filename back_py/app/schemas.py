from pydantic import BaseModel, Field

class Item(BaseModel):
    text: str
    # key: int | str | None = None 
    key: int
    
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

    
    