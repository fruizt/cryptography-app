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

def DES3_encript( key, to_encript, mode):
  key = key.encode('utf-8')
  data = to_encript.encode('utf-8')
  
  if( mode == 6 ):
    iv = get_random_bytes(8)
    cipher = DES3.new(key, mode, nonce=b'', initial_value=iv)
    iv = b64encode(iv).decode('utf-8')
    ct_bytes = cipher.encrypt(pad(data, DES3.block_size))
    ct = b64encode(ct_bytes).decode('utf-8')
    return iv, ct

  if (mode == 1):
    cipher = DES3.new(key, mode)

    ct_bytes = cipher.encrypt(pad(data, DES3.block_size))
    ct = b64encode(ct_bytes).decode('utf-8')
    return " " , ct
  else:
    cipher = DES3.new(key, mode)

    ct_bytes = cipher.encrypt(pad(data, DES3.block_size))
    iv = b64encode(cipher.iv).decode('utf-8')
    ct = b64encode(ct_bytes).decode('utf-8')
    return iv, ct

def DES_encript( key, to_encript, mode):
  key = key.encode('utf-8')
  data = to_encript.encode('utf-8')

  if( mode == 6 ):
    iv = get_random_bytes(8)
    cipher = DES.new(key, mode, nonce=b'', initial_value=iv)
    iv = b64encode(iv).decode('utf-8')
    ct_bytes = cipher.encrypt(pad(data, DES.block_size))
    ct = b64encode(ct_bytes).decode('utf-8')
    return iv, ct

  if (mode == 1):
    cipher = DES.new(key, mode)

    ct_bytes = cipher.encrypt(pad(data, DES.block_size))
    ct = b64encode(ct_bytes).decode('utf-8')
    return " ",ct
  else:
    cipher = DES.new(key, mode)

    ct_bytes = cipher.encrypt(pad(data, DES.block_size))
    iv = b64encode(cipher.iv).decode('utf-8')
    ct = b64encode(ct_bytes).decode('utf-8')
    return iv, ct

def DES3_decript(key,ct, mode, iv = ''):
  key = key.encode('utf-8')

  iv = b64decode(iv)
  ct = b64decode(ct)

  if (mode == 1):
    cipher = DES3.new(key, mode)
    pt = unpad(cipher.decrypt(ct), DES3.block_size)
  elif (mode == 6):
    cipher = DES3.new(key, mode, nonce=b'', initial_value=iv)
    pt = unpad(cipher.decrypt(ct), DES3.block_size)
  else:

    cipher = DES3.new(key, mode, iv)
    pt = unpad(cipher.decrypt(ct), DES3.block_size)

  return pt.decode('UTF-8')

def DES_decript(key,ct, mode, iv = ''):
  key = key.encode('utf-8')

  iv = b64decode(iv)
  ct = b64decode(ct)

  if (mode == 1):
    cipher = DES.new(key, mode)
    pt = unpad(cipher.decrypt(ct), DES.block_size)
  elif (mode == 6):
    cipher = DES.new(key, mode, nonce=b'', initial_value=iv)
    pt = unpad(cipher.decrypt(ct), DES.block_size)
  else:

    cipher = DES.new(key, mode, iv)
    pt = unpad(cipher.decrypt(ct), DES.block_size)

  return pt.decode('UTF-8')

def DES3_pic_encript(file_name,key,mode):
  key = key.encode('utf-8')

  pil_image = Image.open(io.BytesIO(file_name))
  imageOrig = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
  rowOrig, columnOrig, depthOrig = imageOrig.shape

  if mode == 1:
    ivSize = 0
  else:
    ivSize = DES3.block_size

  minWidth = (DES3.block_size + DES3.block_size) // depthOrig + 1

  imageOrigBytes = imageOrig.tobytes()

  iv = get_random_bytes(ivSize)

  if mode == 1:
    cipher = DES3.new(key, mode)
  elif mode == 6:
    cipher = DES3.new(key, mode, nonce=b'', initial_value=iv)
  else:
    cipher = DES3.new(key, mode, iv) 
   

  imageOrigBytesPadded = pad(imageOrigBytes, DES3.block_size)
  ciphertext = cipher.encrypt(imageOrigBytesPadded)
  #print(ciphertext)

  paddedSize = len(imageOrigBytesPadded) - len(imageOrigBytes)
  void = columnOrig * depthOrig - ivSize - paddedSize
  ivCiphertextVoid = iv + ciphertext + bytes(void)
  imageEncrypted = np.frombuffer(ivCiphertextVoid, dtype = imageOrig.dtype).reshape(rowOrig + 1, columnOrig, depthOrig)

  cv2.imwrite("topsecretEnc.bmp", imageEncrypted)

def DES3_pic_decript(file_name,key, mode):
  key = key.encode('utf-8')

  #pil_image = Image.open(io.BytesIO(file_name))
  #imageEncrypted = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

  imageEncrypted = cv2.imread(file_name)

  if mode == 1:
    ivSize = 0
  else:
    ivSize = DES3.block_size

  rowEncrypted, columnOrig, depthOrig = imageEncrypted.shape 
  rowOrig = rowEncrypted - 1
  encryptedBytes = imageEncrypted.tobytes()
  iv = encryptedBytes[:ivSize]
  imageOrigBytesSize = rowOrig * columnOrig * depthOrig
  paddedSize = (imageOrigBytesSize // DES3.block_size + 1) * DES3.block_size - imageOrigBytesSize
  encrypted = encryptedBytes[ivSize : ivSize + imageOrigBytesSize + paddedSize]

  # Decrypt
  if mode == 1:
    cipher = DES3.new(key, mode)
  elif mode == 6:
    cipher = DES3.new(key, mode, nonce=b'', initial_value=iv)
  else:
    cipher = DES3.new(key, mode, iv) 
  decryptedImageBytesPadded = cipher.decrypt(encrypted)
  decryptedImageBytes = unpad(decryptedImageBytesPadded, DES3.block_size)

  # Convert bytes to decrypted image data
  decryptedImage = np.frombuffer(decryptedImageBytes, imageEncrypted.dtype).reshape(rowOrig, columnOrig, depthOrig)

  cv2.imwrite("decripted.bmp", decryptedImage)