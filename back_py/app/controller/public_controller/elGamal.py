
from random import randint
from Crypto import Random
from Crypto.PublicKey import ElGamal


def generateKeyGamal(size=256):
    key = ElGamal.generate(size, Random.new().read)
    p=int(key.p)
    generator=int(key.g)
    beta=int(key.y)
    x=int(key.x)
    k=randint(2**16,2**32)
    return {"p":p,"generator":generator,"beta":beta,"x":x,"k":k}

def encryptGamal(text,K):
    
    text+=" "*(5-len(text)%5)
    num_iter = len(text)/5
    generator=K.generator
    k=K.k
    p=K.p
    beta=K.beta
    enc_str =[]
    for i in range(0,int(num_iter)):
        
        temp_three = text[i*5:(i*5)+5]
        #print(type(temp_three))
       
        str2int=int.from_bytes(bytes(temp_three,'UTF-8'), "big")
        y1=pow(generator, k,p)
        y2=(str2int*(pow(beta, k, p)))%p
        
        enc_str.append(f"({y1},{y2})")
    return "-".join(enc_str)
 
def decryptGamal(text,K):
#print(crypto)
    cast_text=[i.replace("(","") for i in text.split("-")]
    cast_text=[i.replace(")","") for i in cast_text]
    enc_str=[list(map(int,i.split(","))) for i in cast_text]
    
    p=K.p
    x=K.x
    print(p,x)
    dec_str=''
    for i in enc_str:
        print(i)
        d=pow(i[0],x,p)
        c=pow(d,-1,p)
        y1=1
        decrypt=(i[1]*c)%p
        int2str=decrypt.to_bytes(5,"big")
        dec_str+=int2str.decode("utf-8")
    return dec_str
