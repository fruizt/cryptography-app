import json
from PIL import Image
import io
import numpy as np
from base64 import b64encode
from base64 import b64decode
from Crypto.Cipher import AES
from Crypto.Cipher import DES
from Crypto.Cipher import DES3
from Crypto.Util.Padding import pad
from Crypto.Util.Padding import unpad
from Crypto.Random import get_random_bytes
import cv2

def AES_pic_encript(file_name,key,mode):

  key = key.encode('utf-8')

  pil_image = Image.open(io.BytesIO(file_name))
  imageOrig = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
  rowOrig, columnOrig, depthOrig = imageOrig.shape

  if mode == 1:
    ivSize = 0
  else:
    ivSize = AES.block_size

  minWidth = (AES.block_size + AES.block_size) // depthOrig + 1

  imageOrigBytes = imageOrig.tobytes()

  iv = get_random_bytes(ivSize)

  if mode == 1:
    cipher = AES.new(key, mode)
  elif mode == 6:
    cipher = AES.new(key, mode, nonce=b'', initial_value=iv)
  else:
    cipher = AES.new(key, mode, iv) 
   

  imageOrigBytesPadded = pad(imageOrigBytes, AES.block_size)
  ciphertext = cipher.encrypt(imageOrigBytesPadded)
  #print(ciphertext)

  paddedSize = len(imageOrigBytesPadded) - len(imageOrigBytes)
  void = columnOrig * depthOrig - ivSize - paddedSize
  ivCiphertextVoid = iv + ciphertext + bytes(void)
  imageEncrypted = np.frombuffer(ivCiphertextVoid, dtype = imageOrig.dtype).reshape(rowOrig + 1, columnOrig, depthOrig)

  cv2.imwrite("topsecretEnc.bmp", imageEncrypted)


#rand_key = get_random_bytes(16)
#rand_key = b64encode(rand_key).decode('utf-8')

#AES_pic_encript(byteImg,rand_key,6)



def AES_pic_decript(file_name,key, mode):
  key = key.encode('utf-8')

  #pil_image = Image.open(io.BytesIO(file_name))
  #imageEncrypted = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

  imageEncrypted = cv2.imread(file_name)

  if mode == 1:
    ivSize = 0
  else:
    ivSize = AES.block_size

  rowEncrypted, columnOrig, depthOrig = imageEncrypted.shape 
  rowOrig = rowEncrypted - 1
  encryptedBytes = imageEncrypted.tobytes()
  iv = encryptedBytes[:ivSize]
  imageOrigBytesSize = rowOrig * columnOrig * depthOrig
  paddedSize = (imageOrigBytesSize // AES.block_size + 1) * AES.block_size - imageOrigBytesSize
  encrypted = encryptedBytes[ivSize : ivSize + imageOrigBytesSize + paddedSize]
  
  # Decrypt
  if mode == 1:
    cipher = AES.new(key, mode)
  elif mode == 6:
    cipher = AES.new(key, mode, nonce=b'', initial_value=iv)
  else:
    cipher = AES.new(key, mode, iv) 
  decryptedImageBytesPadded = cipher.decrypt(encrypted)
  decryptedImageBytes = unpad(decryptedImageBytesPadded, AES.block_size)

  # Convert bytes to decrypted image data
  decryptedImage = np.frombuffer(decryptedImageBytes, imageEncrypted.dtype).reshape(rowOrig, columnOrig, depthOrig)

  cv2.imwrite("decripted.bmp", decryptedImage)


#AES_pic_decript("show.bmp",rand_key,6)

#text

def AES_encript( key, to_encript, mode):
  key = key.encode('utf-8')
  data = to_encript.encode('utf-8')
  
  cipher = AES.new(key, mode)

  if( mode == 6 ):
    ct_bytes = cipher.encrypt(pad(data, AES.block_size))
    iv = b64encode(cipher.nonce).decode('utf-8')
    ct = b64encode(ct_bytes).decode('utf-8')
    return iv, ct
  elif (mode == 1):
    ct_bytes = cipher.encrypt(pad(data, AES.block_size))
    ct = b64encode(ct_bytes).decode('utf-8')
    return "",ct
  else:
    ct_bytes = cipher.encrypt(pad(data, AES.block_size))
    iv = b64encode(cipher.iv).decode('utf-8')
    ct = b64encode(ct_bytes).decode('utf-8')
    return iv, ct

def AES_decript(key,ct , mode, iv = ''):
  key = key.encode('utf-8')

  iv = b64decode(iv)
  ct = b64decode(ct)

  if (mode == 1):
    cipher = AES.new(key, mode)
    pt = unpad(cipher.decrypt(ct), AES.block_size)
  elif (mode == 6):
    cipher = AES.new(key, mode, nonce = iv)
    pt = unpad(cipher.decrypt(ct), AES.block_size)
  else:

    cipher = AES.new(key, mode, iv)
    pt = unpad(cipher.decrypt(ct), AES.block_size)

  return pt.decode('UTF-8')