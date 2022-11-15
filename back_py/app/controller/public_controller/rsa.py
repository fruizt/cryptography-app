import rsa
from base64 import b64encode
from base64 import b64decode
from rsa import key, common

def int_to_bytes(x: int) -> bytes:
    return x.to_bytes((x.bit_length() + 7) // 8, 'big')
    
def int_from_bytes(xbytes: bytes) -> int:
    return int.from_bytes(xbytes, 'big')

#generate random key, two classes one is public and the other private, the attributes are the prime numbers.
def random_keygen_rsa(size):
  return key.newkeys(size)

#encrypt with rsa using the class public key from rsa
def encrypt_rsa(pub_key,string):
  flag = True
  while flag == True:
    if(len(string) % 3 != 0):
      string = string + ' '
    else:
      flag = False

  num_iter = len(string)/3

  enc_str = ''


  for i in range(0,int(num_iter)):
    temp_three = string[i*3:(i*3)+3]

    temp_enc = rsa.encrypt(bytes(temp_three,'UTF-8'),pub_key)
    
    if(i != 0):
      enc_str = enc_str + ',' + str(int_from_bytes(temp_enc))
    else:
      enc_str = enc_str + str(int_from_bytes(temp_enc))

  return enc_str


#decrypt with rsa using the class private key from rsa
def decrypt_rsa(priv_key, enc_str):
  decript_list = enc_str.split(',')

  dec_str = ''
  for i in decript_list:
    temp_i = int(i)
    temp_dec = int_to_bytes(temp_i)

    dec_str = dec_str + rsa.decrypt(temp_dec, priv_key).decode('utf-8')

  return dec_str