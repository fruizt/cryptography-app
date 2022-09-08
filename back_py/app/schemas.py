from pydantic import BaseModel

class Item(BaseModel):
    text: str
    key: int | str | None = None 