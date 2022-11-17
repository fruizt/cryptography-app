from random import randint
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
import base64

class RsaSignature():
    def __init__(self):
        #generate initial key
        self.key=RSA.generate(2048)
        
        #self.alpha=self.key.pointQ
        #self.public=self.key.public_key()
        #self.a=self.key.d
        #self.beta=self.a*self.alpha
        self.public=self.key.public_key()

        self.n = self.key.n
        self.e = self.key.e
        self.d = self.key.d
        self.p = self.key.p
        self.q = self.key.q
        
        f = open('myprivatekeyRSA.pem','wb')
        f.write(self.key.export_key(format='PEM'))
        f.close()
        f = open('mypublickeyRSA.pem','wb')
        f.write(self.key.public_key().export_key(format='PEM'))
        f.close()
    
    #method to generate new keys
    def generateKeyRsa(self):
        self.key=RSA.generate(2048)
        self.public=self.key.public_key()
        f = open('myprivatekeyRSA.pem','wb')
        f.write(self.key.export_key(format='PEM'))
        f.close()
        f = open('mypublickeyRSA.pem','wb')
        f.write(self.key.public_key().export_key(format='PEM'))
        f.close()

        self.n = self.key.n
        self.e = self.key.e
        self.d = self.key.d
        self.p = self.key.p
        self.q = self.key.q

        # result={"public":{
        #             "n":self.n._value,
        #             "e":self.e._value
        #                 },
        #         "private":{
        #             "d":self.d._value,
        #             "p":self.p._value,
        #             "q":self.q._value   
        #                 }
        #         }
        return {}

    def setPublicKey(self,keyPublic):
        self.public = RSA.import_key(keyPublic)
        f = open('mypublickeyRSA.pem','wb')
        f.write(self.public.export_key(format='PEM'))
        f.close()
        return "succes"

    def setPrivateKey(self,keyPrivate):
        print(keyPrivate)
        self.key = RSA.import_key(keyPrivate)
        
        f = open('myprivatekeyRSA.pem','wb')
        f.write(self.key.export_key(format='PEM'))
        f.close()
        f = open('mypublickeyRSA.pem','wb')
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
        
        signature = pkcs1_15.new(self.key).sign(file_hash)
        

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
        verifyer = pkcs1_15.new(self.public)

        try:
            verifyer.verify(file_hash,signature)
            return "Valid"
        except:
            return "No valid"