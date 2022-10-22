from Crypto.Random import get_random_bytes
from base64 import b64encode
from base64 import b64decode

def generateRandomKeyBits(n_bytes):
    key=get_random_bytes(n_bytes)
    result=b64encode(key).decode('utf-8')
    
    return result

    