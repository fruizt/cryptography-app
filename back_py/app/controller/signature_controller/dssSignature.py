from random import randint
from Crypto.PublicKey import ECC
from Crypto.Signature import DSS
from Crypto.Hash import SHA256
import base64

class DssSignature():
    def __init__(self):
        #generate initial key
        self.key=ECC.generate(curve='NIST P-256')
        
        self.alpha=self.key.pointQ
        self.public=self.key.public_key()
        self.a=self.key.d
        self.beta=self.a*self.alpha
        
        f = open('myprivatekey.pem','wt')
        f.write(self.key.export_key(format='PEM'))
        f.close()
        f = open('mypublickey.pem','wt')
        f.write(self.key.public_key().export_key(format='PEM'))
        f.close()
    
    #method to generate new keys
    def generateKeyElliptic(self):
        self.key=ECC.generate(curve='NIST P-256')
        self.public=self.key.public_key()
        f = open('myprivatekey.pem','wt')
        f.write(self.key.export_key(format='PEM'))
        f.close()
        f = open('mypublickey.pem','wt')
        f.write(self.key.public_key().export_key(format='PEM'))
        f.close()
        self.alpha=self.key.pointQ
        self.a=self.key.d
        self.beta=self.a*self.alpha
        result={"public":{
                    "alpha":f"{self.alpha.x},{self.alpha.y}",
                    "beta":f"{self.beta.x},{self.beta.y}"
                        },
                "private":{
                    "a":self.a._value   
                        }
                }
        return result

    def setPublicKey(self,keyPublic):
        self.public = ECC.import_key(keyPublic)
        f = open('mypublickey.pem','wt')
        f.write(self.public.export_key(format='PEM'))
        f.close()
        return "succes"

    def setPrivateKey(self,keyPrivate):
        self.key = ECC.import_key(keyPrivate)
        
        f = open('myprivatekey.pem','wt')
        f.write(self.key.export_key(format='PEM'))
        f.close()
        f = open('mypublickey.pem','wt')
        f.write(self.key.public_key().export_key(format='PEM'))
        f.close()
        return "succes"
    #method to encrypt
    def signFile(self,f):
        
        BLOCK_SIZE = 65536 # The size of each read from the file

        file_hash = SHA256.new() # Create the hash object, can use something other than `.sha256()` if you wish
        
        fb = f.read(BLOCK_SIZE) # Read from the file. Take in the amount declared above
        while len(fb) > 0: # While there is still data being read from the file
            file_hash.update(fb) # Update the hash
            fb = f.read(BLOCK_SIZE) # Read the next block from the file

        #create key optional_____________
        #key=ECC.construct(curve="NIST P-256",d=self.a,point_x=self.alpha.x,point_y=self.alpha.y)
        
        signer = DSS.new(self.key, 'fips-186-3')
        signature = signer.sign(file_hash)

        sign_result=(base64.b64encode(signature)).decode("utf-8")

        return sign_result
    def verifyFile(self,signature,f):
        
        BLOCK_SIZE = 65536 # The size of each read from the file

        file_hash = SHA256.new() # Create the hash object, can use something other than `.sha256()` if you wish
        
        fb = f.read(BLOCK_SIZE) # Read from the file. Take in the amount declared above
        while len(fb) > 0: # While there is still data being read from the file
            file_hash.update(fb) # Update the hash
            fb = f.read(BLOCK_SIZE)
        
        #decode signature
        signature=base64.b64decode(signature)

        #construct public key ------optional
        #public_key=ECC.construct(curve="NIST P-256",point_x=self.alpha.x,point_y=self.alpha.y)
        
        #create object to verify
        verifyer=DSS.new(self.public,'fips-186-3')

        try:
            verifyer.verify(file_hash,signature)
            return "Valid"
        except:
            return "No valid"

        

