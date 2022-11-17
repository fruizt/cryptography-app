import random



primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
          101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197,
          199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313,
          317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439,
          443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571,
          577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691,
          701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829,
          839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977,
          983, 991, 997]
#


# n -> integer, return if n is prime or not
def isPrime(n):
    # Miller-Rabin Primality Test
    # 1. Factorize n - 1 as m * 2^k
    k = 0
    temp = n - 1
    while temp % 2 == 0:
        temp = temp // 2
        k += 1
    else:
        m = temp

    # 2. Primality Test
    # Test all entries in the 'primes' list
    for a in primes:
        x = [pow(a, m * (2 ** i), n) for i in range(0, k)]
        # If there is no -1 (n - 1) in the following blank, return 'composite'
        if pow(a, m, n) != 1 and none_in_x_is_n(x, n - 1):
            return False
        elif pow(a, m, n) == 1 or not none_in_x_is_n(x, n - 1):
            continue

    return True

def mod3(prime):
    if(prime % 4 == 3):
        return True
    else:
        return False 

# Genera primos ------------------------------------------
def generate_a_prime_number(num_of_bits):
    # keep creating a random 16-byte (128-bit) number until there is a prime number
    while 1:
        
        num = random.getrandbits(num_of_bits)
        if isPrime(num):
            if mod3(num):
                return num
            else:
                continue
        else:
            continue

            
def mulmod(a, b, mod):
 
    res = 0; # Initialize result
    a = a % mod
    while (b > 0):
     
        # If b is odd, add 'a' to result
        if (b % 2 == 1):
            res = (res + a) % mod
 
        # Multiply 'a' with 2
        a = (a * 2) % mod
 
        # Divide b by 2
        b //= 2
 
    # Return result
    return res % mod

def suggestKeyRabin(size):
    p=generate_a_prime_number(size)
    q=generate_a_prime_number(size)
    n=p*q
    B=random.randint(2**16,n)
    return {"public":{
                "n":str(n),
                "b": str(B)
            },
            "private":{
                "p":str(p),
                "q":str(q)
            }
            }

# Additional functions
def none_in_x_is_n(x, n):
    for i in x:
        if i == n:
            return False
    return True

#p y q son la parte secreta
def rabin_encryption(n,B, clearT):
    cyphtext = ""

    numbl = 5
    # Parte publica de la llave
    #n = p*q
    #B = random.randint(0, n-1)

    # Bloques de a 3:
    flag = True
    while flag == True:
        if(len(clearT) % numbl != 0):
            clearT = clearT + ' '
        else:
            flag = False
    
    # Convierto texto a número y le aplico funcion de encriptado ඞ
     
    iter = len(clearT)/numbl
    
    for i in range(int(iter)):
        block = clearT[i*numbl:(i*numbl)+numbl]

        x = int.from_bytes(bytes(block,'UTF-8'), "big")

        enc = (x*(x+B))%n

        cyphtext = cyphtext + "," + str(enc)
    
    return [cyphtext[1:],B]
        
        
def rabin_decryption(p, q, cyphT, B):
    
    cleartexts=[]
    dec_str = ''
    
    # Parte publica de la llave
    n = p*q
    it = [p,q]

    for i in (cyphT.split(",")):
        y_1 = (mulmod(pow(B,2,n), pow(4, -1, n), n) + int(i)) % n
        y_2 = mulmod(B,pow(2, -1, n),n)
        #mod p
        mod = []
        for j in it:
            for k in [1,-1]:
                imod = y_1
                cong = pow(imod,((j+1)//4),j)*k
                mod.append(cong)
        
        
        solv = []
        for j in mod[0:2]:
            for k in mod[2:4]:
                
                p_1 = mulmod((mulmod(j,q,n)) , pow(q,-1,p), n)
                p_2 = mulmod((mulmod(k,p,n)) , pow(p,-1,q), n) 

                pp = (p_1 + p_2) % n

                solv.append(pp)
        
        y = [(solv[i] - y_2)%n for i in range(len(solv))]

        
        for j in y:
            try:
                bytstr = j.to_bytes(5,"big")
                dec_str += bytstr.decode("utf-8")
                cleartexts.append()
            except:
                continue
    return dec_str