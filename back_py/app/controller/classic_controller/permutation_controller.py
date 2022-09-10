import numpy as np

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
    new_text=text+"a"*((m-n%m)%m)
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