from fastapi import APIRouter
from app.schemas import Item

router = APIRouter(
    prefix="/classic",
    tags=["Classic"]
)

##ceasar
@router.post("/ceasar")
async def ceasar_cypher(item:Item):
    return {"text cipher":encrypt_ceasar(item.text,item.key)}

@router.post("/analysis/ceasar")
async def ceasar_decypher(item:Item):
    return {"text decipher":decrypt(item.text)}

##vigenere
@router.post("/vigenere")
async def vigenere_cypher(item:Item):
    return {"text cipher":encrypt_vigenere(item.text,item.key)}

@router.post("/decrypt/vigenere")
async def ceasar_decypher(item:Item):
    return {"text decipher":decrypt(item.text)}

#############model
#https://www.geeksforgeeks.org/caesar-cipher-in-cryptography/
#https://stackoverflow.com/questions/40975199/caesar-cipher-without-knowing-the-key
#https://inventwithpython.com/hacking/chapter21.html
def encrypt_ceasar(text,s:int):
    result = ""
    # traverse text
    for i in range(len(text)):
        char = text[i]
        # Encrypt uppercase characters
        if (char.isupper()):
            result += chr((ord(char) + s-65) % 26 + 65)
        # Encrypt lowercase characters
        else:
            result += chr((ord(char) + s - 97) % 26 + 97)
  
    return result

def encrypt_vigenere(plaintext, key:str):
    key_length = len(key)
    key_as_int = [ord(i) for i in key]
    print(">>key as int",key_as_int)
    plaintext_int = [ord(i) for i in plaintext]
    ciphertext = ''
    for i in range(len(plaintext_int)):
        value = (plaintext_int[i] + key_as_int[i % key_length]) % 26
        ciphertext += chr(value + 65)
    return ciphertext

def decrypt(text):
    text = text.lower()
    LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    letters = 'abcdefghijklmnopqrstuvwxyz'
    answer = []
    for key in range(len(letters)):
        translated = ''
        
        for symbol in text:
            if symbol in letters:
                num = letters.find(symbol)
                num = num - key
                
                if num < 0:
                    num = num + len(letters)
                    
                translated = translated + letters[num]
            
            else:
                translated = translated + symbol
    
        #print('Key #%s: %s' % (key, translated))
        answer.append({"translated":translated,"key":key})
    return answer