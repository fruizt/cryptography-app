import numpy as np
import random
from numpy import matrix
from numpy import linalg

def text_to_key(text):
  if(type(text) is np.ndarray):
    return text
  key = text.split(",")
  size = int(np.sqrt(len(key)))
  for i in range(0,len(key)):
    key[i] = int(key[i])
  return np.asarray(key).reshape(size,size)

def normal_numbers(x,n,state = 256): 
  barisan = []
  for i in range(n):
    x = 3.9 * x * (1 - x) # 3.9 can be replaced by real number in (3.7, 4]
    barisan.append(int(x*1000%state)) # take 3 first digit after decimal point
  return barisan 

def random_key(size,state = 256):
  random_list = normal_numbers(0.0001,2000)
  random_list[random.randint(1000,2000-1)]

  key_rand = []

  for i in range(0,size*size):
    key_rand.append(random_list[random.randint(1000,2000-1)])

  key_rand  = np.asarray(key_rand).reshape(size,size)
  try:
    modMatInv(key_rand,state)
  except:
    key_rand = random_key(size,state)
  
  return key_rand

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