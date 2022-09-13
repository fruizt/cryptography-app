import numpy as np
alpahbet=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
##PERMUTATION
def suggestKey(m):
    key=list(range(1,m+1))
    return "".join(map(str,np.random.permutation(key)))

def permutation(text,key,m):
    if len(key)!=m:
        key=list(range(1,m+1))
        key=np.random.permutation(key)
    else:
        key=[int(letter) for letter in key]

    #delete spaces and convert to lowercase
    text=''.join(e for e in text if e.isalnum())
    text=text.lower()

    n=len(text)
    other="" if (m-n%m)%m==0 else "".join(np.random.choice(alpahbet, (m-n%m)%m))
    
    new_text=text+other
    block = [new_text[i:i+m] for i in range(0,len(new_text),m)]

    result=[]
    for bl in block:
        result_prev=[0]*m
        for index in range(m):
            new_pos=key[index]
            result_prev[new_pos-1]=bl[index]
        result.append("".join(result_prev))
    result_fin="".join(result)

    return result_fin

def decrypt_permutation(text,key,m):
    key=[int(letter) for letter in key]
    m=len(key)
    #delete spaces and convert to lowercase
    text=''.join(e for e in text if e.isalnum())
    text=text.lower()
    n=len(text)
    block=[text[i-m:i] for i in range(m,n+1,m) ]
  
    result=[]
    for bl in block:
        result_prev=[0]*m
        for index in range(m):
            actual_pos=key[index]
            result_prev[index]=bl[actual_pos-1]
        result.append("".join(result_prev))
    result_fin="".join(result)

    return result_fin
def convertKeyMatrix(key):
    m=len(key)
    matrixKey=[["0"]*m for i in range(m)]
    for i in range(m):
        k=int(key[i])
        matrixKey[k-1][i]="1"
    result=""
    for i in matrixKey:
        result+=",".join(i)+","
    result=result[:-1]
    return result
def convertMatrixKey(key):
    key=key.replace(",","")
    m=int(len(key)**0.5)
    block = [key[i:i+m] for i in range(0,len(key),m)]
    
    rest=[["0"]*m for i in range(m)]
    for i in range(m):
        for j in range(m):
            rest[j][i]=block[i][j]
    
    keyMatix=""
    for i in rest:
        keyMatix+=str(i.index("1")+1)

    return keyMatix

        
