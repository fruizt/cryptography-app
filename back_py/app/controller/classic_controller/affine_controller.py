import numpy as np

inverse={1: 1, 3: 9, 5: 21, 7: 15, 9: 3, 11: 19, 15: 7, 17: 23, 19: 11, 21: 5, 23: 17, 25: 25}
frecuentLetters=[[4,19],[4,0],[4,14],[4,8],[4,18],[4,7],[4,17]]
def affin(text,a,b):
    text=''.join(e for e in text if e.isalnum())
    text=text.lower()
    textCiph=[ord(letter)-97 for letter in text]

    encrypt=[chr((a*letter+b)%26+97) for letter in textCiph ]
    return "".join(encrypt)

def decryptAffin(text,a,b):
    text=''.join(e for e in text if e.isalnum())
    text=text.lower()
    textCiph=[ord(letter)-97 for letter in text]

    encrypt=[chr((inverse[a]*(letter-b))%26+97) for letter in textCiph ]
    return "".join(encrypt)

def suggestKeyAffine():
    a=np.random.choice(list(inverse.keys()))
    b=np.random.choice(list(range(26)))
    print(a,b)
    return f"a:{a} ,b:{b}"

def completeAnalysisAffine(text):
    result=""
    for i in list(inverse.keys()):
        for j in range(26):
            result+=f"\n ********* key:({i},{j}) *********\n"
            result+=decryptAffin(text,i,j)
    return result

#print(completeAnalysis(affin("hola mund",5,4)))

def smartAnalysisAffine(text):
    text=''.join(e for e in text if e.isalnum())
    text=text.lower()
    letters=[[i] for i in range(26)]
    results=[]
    for i in letters:
        i.append(text.count(chr(i[0]+97)))
    letters.sort(key=lambda x: x[1],reverse=True)
    listValid=list(inverse.keys())
    for option in frecuentLetters:
        x1=option[0]
        x2=option[1]
        y1=letters[0][0]
        y2=letters[1][0]

        for lt in inverse:
            for i in range(26):
                if (x1*lt+i)%26==y1 and (x2*lt+i)%26==y2:
                    results.append(f"key a:{lt},b:{i} \n {decryptAffin(text,lt,i)}\n ")    
          
            
    return "\n".join(results)

