from random import randint
from Crypto.PublicKey import ECC


class Elliptic():
    def __init__(self):
        #generate initial key
        self.key=ECC.generate(curve='ed25519')
        self.alpha=self.key.pointQ
        self.p=2**255 - 19
        self.a=self.key.d
        self.beta=self.a*self.alpha
        self.k=randint(2**32,2**252)
    
    #method to generate new keys
    def generateKeyElliptic(self):
        self.key=ECC.generate(curve='ed25519')
        self.alpha=self.key.pointQ
        self.a=self.key.d
        self.beta=self.a*self.alpha
        result={"public":{
                    "alpha":f"{self.alpha.x},{self.alpha.y}",
                    "beta":f"{self.beta.x},{self.beta.y}"
                        },
                "private":{
                    "a":str(self.a)   
                        }
                }
        return result

    def setPublicKey(self,alpha,beta):
        x1,y1=alpha.split(",")
        x2,y2=beta.split(",")
        self.alpha=ECC.EccPoint(int(x1), int(y1), curve='ed25519')
        self.beta=ECC.EccPoint(int(x2), int(y2), curve='ed25519')

    def setPrivateKey(self,key):
        self.a=int(key)
        
    #method to encrypt
    def encryptElliptic(self,text):
        text+=" "*(6-len(text)%6)
        num_iter = len(text)/6
        enc_str =[]
        for i in range(0,int(num_iter)):
            block_text=text[i*6:(i*6)+6]
            x_cord = block_text[:3]
            y_cord = block_text[3:]
            
            #print(type(temp_three))
            x1=int.from_bytes(bytes(x_cord,'UTF-8'), "big")
            x2=int.from_bytes(bytes(y_cord,'UTF-8'), "big")
            c=self.k*self.beta
            c1=c.x
            c2=c.y
            y0=self.k*self.alpha
            
            y1=(c1*x1)%self.p
            y2=(c2*x2)%self.p

            enc_str.append(f"(({y0.x},{y0.y}),{y1},{y2})")
        return "-".join(enc_str)
#method to decrypt
    def decryptElliptic(self,text):
        cast_text=text.split("-")
        enc_str=[]
        for ttx in cast_text:
            a=ttx
            a=a.replace("(","")
            a=a.replace(")","")
            point=list(map(int,a.split(",")))
            y0=ECC.EccPoint(point[0], point[1], curve='ed25519')
            enc_str.append([y0,point[2],point[3]])
        decr=""
        for i in enc_str:
            c=self.a*i[0]
            c1=c.x
            c2=c.y
            exp1=pow(int(c1),-1,int(self.p))
            d1=(i[1]*exp1)%self.p
            d2=(i[2]*pow(int(c2),-1,int(self.p)))%self.p
            int2str_d1=d1.to_bytes(3,"big")
            int2str_d2=d2.to_bytes(3,"big")
            decr+=int2str_d1.decode("utf-8")+int2str_d2.decode("utf-8")
        return decr
              

