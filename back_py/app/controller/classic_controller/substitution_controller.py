import sys

#ENCRIPTA CON KEY
def EncrSubstitution(text, key):
    if (len(key) != 26): return 'key no valida'
    enc = ''
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    text = text.upper()
    key = key.upper()
    for lett in text:
        if lett in alphabet:
            #Concatena
            enc += key[alphabet.index(lett)]
        else:
            enc += lett
    return enc

#DESENCRIPTA CON KEY
def DecrSubstitutuon(text, key):
    if (len(key) != 26): return 'key no valida'
    dec = ''
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    text = text.upper()
    key = key.upper()
    for lett in text:
        if lett in alphabet:
            #Concatena
            dec += alphabet[key.index(lett)]
        else:
            dec += lett
    return dec
