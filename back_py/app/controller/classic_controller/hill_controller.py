import numpy as np
import random
from numpy import matrix
from numpy import linalg
from PIL import Image
import io
import sympy

def text_to_key(text):
  if(type(text) is np.ndarray):
    return text
  key = text.split(",")
  size = int(np.sqrt(len(key)))
  for i in range(0,len(key)):
    key[i] = int(key[i])
  return np.asarray(key).reshape(size,size)

def normal_numbers(x,n,state): 
  barisan = []
  for i in range(n):
    x = 3.9 * x * (1 - x) # 3.9 can be replaced by real number in (3.7, 4]
    barisan.append(int(x*1000%state)) # take 3 first digit after decimal point
  return barisan 

def random_key1(size,state):
  random_list = normal_numbers(0.0001,2000,state)
  random_list[random.randint(1000,2000-1)]

  key_rand = []

  for i in range(0,size*size):
    key_rand.append(random_list[random.randint(1000,2000-1)])

  key_rand  = np.asarray(key_rand).reshape(size,size)
  try:
    modMatInv(key_rand,state)
  except:
    key_rand = random_key1(size,state)
  
  return key_rand

def minor(A,i,j):    # Return matrix A with the ith row and jth column deleted
  A=np.array(A)
  minor=np.zeros(shape=(len(A)-1,len(A)-1))
  p=0
  for s in range(0,len(minor)):
    if p==i:
      p=p+1
    q=0
    for t in range(0,len(minor)):
      if q==j:
        q=q+1
      minor[s][t]=A[p][q]
      q=q+1
    p=p+1
  return minor

def modMatInv(A,p):       # Finds the inverse of matrix A mod p
  n=len(A)
  A=matrix(A)
  adj=np.zeros(shape=(n,n))
  for i in range(0,n):
    for j in range(0,n):
      adj[i][j]=((-1)**(i+j)*int(round(linalg.det(minor(A,j,i)))))%p
  return (modInv(int(round(linalg.det(A))),p)*adj)%p

def modInv(a,p):          # Finds the inverse of a mod p, if it exists
  for i in range(1,p):
    if (i*a)%p==1:
      return i
  raise ValueError(str(a)+" has no inverse mod "+str(p))

def Hill_encript_pic(size, key, file_name):
  key = text_to_key(key)
  img = Image.open(io.BytesIO(file_name)).convert("L")

  #img = cv2.imread(file_name, cv2.IMREAD_GRAYSCALE)
  img_num = np.array(img)
  img_size = img_num.shape[0]

  if np.linalg.det(key) == 0:
   raise Exception('matrix must have an inverse matrix')

  #img_num = np.asarray(img)
  img_num = img_num.flatten()

  if img_num.shape[0]%size != 0:
    img_num = np.append(img_num,np.zeros(size-(img_num.shape[0]%size)))
  img_num = img_num.reshape(int(img_num.shape[0]/size),size).swapaxes(0,1)

  img_res = np.matmul(key, img_num)
  img_res = np.remainder(img_res,256)

  img_res = img_res.swapaxes(0,1).flatten()

  if img_res.shape[0]%img_size != 0:
    img_res = np.append(img_res,np.zeros(img_size-(img_res.shape[0]%img_size)))

  img_res = img_res.reshape(int(img_res.shape[0]/img_size), img_size)
  img_res = img_res.astype(np.uint8)
  temporal = Image.fromarray(img_res).convert("L")
  temporal.save("encrypt.png")

  """ byte_io = io.BytesIO()
  temporal.save(byte_io, format = "PNG")
  png_buffer = byte_io.getvalue()
  byte_io.close() """

  return "a"

def Hill_decript_pic(size, key, file_name):
  key = text_to_key(key)
  img = Image.open(io.BytesIO(file_name)).convert("L")
  img = np.array(img)
  
  #img = cv2.imread(file_name, cv2.IMREAD_GRAYSCALE)

  img_num = img
  img_size = img_num.shape[0]
  
  key_inv = modMatInv(key,256)

  #img_num = np.asarray(img)
  img_num = img_num.flatten()

  if(img.shape[0] != img.shape[1]):
    val = img.shape[1]**2
    val = (size-(val%size))+val
    img_num = img_num[0:val]

  img_num = img_num.reshape(int(img_num.shape[0]/size),size).swapaxes(0,1)

  img_res = np.matmul(key_inv, img_num)
  img_res = np.remainder(img_res,256)

  img_res = img_res.swapaxes(0,1).flatten()

  if(img.shape[0] != img.shape[1]):
    img_res = img_res[0:1+val-(size-(val%size))]

  img_res = img_res.reshape(img.shape[1], img.shape[1])
  img_res = img_res.astype(np.uint8)
  
  temporal = Image.fromarray(img_res).convert("L")
  temporal.save("decrypt.png")

  """ byte_io = io.BytesIO()
  temporal.save(byte_io, format = "PNG")
  png_buffer = byte_io.getvalue()
  byte_io.close() """

  return "a"

def Hill_encript_str(size, key, string):
  key = text_to_key(key)
  string = string.replace(' ', '')
  string = string.replace(',', '')
  string = string.replace('.', '')
  string = string.replace('(', '')
  string = string.replace(')', '')
  string = string.replace(':', '')
  string = string.replace(';', '')
  string = string.replace('—', '')
  string = string.upper()
  str_num = []
  str_size = len(string)
  for i in range(0,str_size):
    str_num.append(ord(string[i])%65)

  if np.linalg.det(key) == 0:
   raise Exception('matrix must have an inverse matrix')

  str_num = np.asarray(str_num)

  if str_num.shape[0]%size != 0:
    str_num = np.append(str_num,np.zeros(size-(str_num.shape[0]%size)))
  str_num = str_num.reshape(int(str_num.shape[0]/size),size).swapaxes(0,1)

  str_res = np.matmul(key, str_num)

  str_res = np.remainder(str_res,26)

  str_res = str_res.swapaxes(0,1).flatten()

  str_final = []
  for i in range(0,str_res.shape[0]):
    str_final.append(chr(int(str_res[i]) + 65))
  return ''.join(str_final)

def Hill_decript_str(size, key, string):
  key = text_to_key(key)
  string = string.replace(' ', '')
  string = string.replace(',', '')
  string = string.replace('.', '')
  string = string.replace('(', '')
  string = string.replace(')', '')
  string = string.replace(':', '')
  string = string.replace(';', '')
  string = string.upper()
  str_num = []
  str_size = len(string)
  for i in range(0,str_size):
    str_num.append(ord(string[i])%65)

  key_inv = modMatInv(key,26)

  str_num = np.asarray(str_num)

  str_num = str_num.reshape(int(str_num.shape[0]/size),size).swapaxes(0,1)

  str_res = np.matmul(key_inv, str_num)

  str_res = np.remainder(str_res,26)

  str_res = str_res.swapaxes(0,1).flatten()

  str_final = []
  for i in range(0,str_res.shape[0]):
    str_final.append(chr(int(str_res[i]) + 65))
  return ''.join(str_final)

def Hill_attack(size,unknown,known):
  #encrypted
  unknown = unknown.upper()
  #decrypted
  known = known.upper()
  
  u_list = unknown.split(",")
  k_list = known.split(",")
  if(size == 2):
    result = [[0,0],[0,0]]
    a_1 = list(k_list[0])
    a_2 = list(k_list[1])
    b_1 = list(u_list[0])
    b_2 = list(u_list[1])
    A_1 = []
    A_2 = []
    B_1 = []
    B_2 = []
    A_f = []
    for i in a_1:
      A_1.append(ord(i)%65)
    for i in a_2:
      A_2.append(ord(i)%65)
    B_1.append(ord(b_1[0])%65)
    B_1.append(ord(b_2[0])%65)
    B_2.append(ord(b_1[1])%65)
    B_2.append(ord(b_2[1])%65)
    A_f.append(A_1)
    A_f.append(A_2)
    ans = modInv(int(sympy.Matrix(A_f).det()), 26) * sympy.Matrix(A_f).adjugate() @ sympy.Matrix(B_1)%26
    result[0][0] = ans[0]
    result[0][1] = ans[1]
    ans = modInv(int(sympy.Matrix(A_f).det()), 26) * sympy.Matrix(A_f).adjugate() @ sympy.Matrix(B_2)%26
    result[1][0] = ans[0]
    result[1][1] = ans[1]
    return ','.join(str(x) for x in result)
  if(size == 3):
    result = [[0,0,0],[0,0,0],[0,0,0]]
    a_1 = list(k_list[0])
    a_2 = list(k_list[1])
    a_3 = list(k_list[2])
    b_1 = list(u_list[0])
    b_2 = list(u_list[1])
    b_3 = list(u_list[2])
    A_1 = []
    A_2 = []
    A_3 = []
    B_1 = []
    B_2 = []
    B_3 = []
    A_f = []
    for i in a_1:
      A_1.append(ord(i)%65)
    for i in a_2:
      A_2.append(ord(i)%65)
    for i in a_3:
      A_3.append(ord(i)%65)
    B_1.append(ord(b_1[0])%65)
    B_1.append(ord(b_2[0])%65)
    B_1.append(ord(b_3[0])%65)
    B_2.append(ord(b_1[1])%65)
    B_2.append(ord(b_2[1])%65)
    B_2.append(ord(b_3[1])%65)
    B_3.append(ord(b_1[2])%65)
    B_3.append(ord(b_2[2])%65)
    B_3.append(ord(b_3[2])%65)
    A_f.append(A_1)
    A_f.append(A_2)
    A_f.append(A_3)
    ans = modInv(int(sympy.Matrix(A_f).det()), 26) * sympy.Matrix(A_f).adjugate() @ sympy.Matrix(B_1)%26
    result[0][0] = ans[0]
    result[0][1] = ans[1]
    result[0][2] = ans[2]
    ans = modInv(int(sympy.Matrix(A_f).det()), 26) * sympy.Matrix(A_f).adjugate() @ sympy.Matrix(B_2)%26
    result[1][0] = ans[0]
    result[1][1] = ans[1]
    result[1][2] = ans[2]
    ans = modInv(int(sympy.Matrix(A_f).det()), 26) * sympy.Matrix(A_f).adjugate() @ sympy.Matrix(B_3)%26
    result[2][0] = ans[0]
    result[2][1] = ans[1]
    result[2][2] = ans[2]

    return ','.join(str(x) for x in result)
  if(size == 4):
    result = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    a_1 = list(k_list[0])
    a_2 = list(k_list[1])
    a_3 = list(k_list[2])
    a_4 = list(k_list[3])
    b_1 = list(u_list[0])
    b_2 = list(u_list[1])
    b_3 = list(u_list[2])
    b_4 = list(u_list[3])
    A_1 = []
    A_2 = []
    A_3 = []
    A_4 = []
    B_1 = []
    B_2 = []
    B_3 = []
    B_4 = []
    A_f = []
    for i in a_1:
      A_1.append(ord(i)%65)
    for i in a_2:
      A_2.append(ord(i)%65)
    for i in a_3:
      A_3.append(ord(i)%65)
    for i in a_4:
      A_4.append(ord(i)%65)
    B_1.append(ord(b_1[0])%65)
    B_1.append(ord(b_2[0])%65)
    B_1.append(ord(b_3[0])%65)
    B_1.append(ord(b_4[0])%65)
    B_2.append(ord(b_1[1])%65)
    B_2.append(ord(b_2[1])%65)
    B_2.append(ord(b_3[1])%65)
    B_2.append(ord(b_4[1])%65)
    B_3.append(ord(b_1[2])%65)
    B_3.append(ord(b_2[2])%65)
    B_3.append(ord(b_3[2])%65)
    B_3.append(ord(b_4[2])%65)
    B_4.append(ord(b_1[3])%65)
    B_4.append(ord(b_2[3])%65)
    B_4.append(ord(b_3[3])%65)
    B_4.append(ord(b_4[3])%65)
    A_f.append(A_1)
    A_f.append(A_2)
    A_f.append(A_3)
    A_f.append(A_4)
    ans = modInv(int(sympy.Matrix(A_f).det()), 26) * sympy.Matrix(A_f).adjugate() @ sympy.Matrix(B_1)%26
    result[0][0] = ans[0]
    result[0][1] = ans[1]
    result[0][2] = ans[2]
    result[0][3] = ans[3]
    ans = modInv(int(sympy.Matrix(A_f).det()), 26) * sympy.Matrix(A_f).adjugate() @ sympy.Matrix(B_2)%26
    result[1][0] = ans[0]
    result[1][1] = ans[1]
    result[1][2] = ans[2]
    result[1][3] = ans[3]
    ans = modInv(int(sympy.Matrix(A_f).det()), 26) * sympy.Matrix(A_f).adjugate() @ sympy.Matrix(B_3)%26
    result[2][0] = ans[0]
    result[2][1] = ans[1]
    result[2][2] = ans[2]
    result[2][3] = ans[3]
    ans = modInv(int(sympy.Matrix(A_f).det()), 26) * sympy.Matrix(A_f).adjugate() @ sympy.Matrix(B_4)%26
    result[3][0] = ans[0]
    result[3][1] = ans[1]
    result[3][2] = ans[2]
    result[3][3] = ans[3]

    return ','.join(str(x) for x in result)

