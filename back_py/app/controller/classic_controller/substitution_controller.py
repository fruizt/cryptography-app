from math import log10
from pycipher import SimpleSubstitution as SimpleSub
from collections import Counter
import random
import re

class ngram_score(object):
    def __init__(self,ngramfile,sep=' '):
        ''' load a file containing ngrams and counts, calculate log probabilities '''
        self.ngrams = {}
        for line in open(ngramfile):
            key,count = line.split(sep) 
            self.ngrams[key] = int(count)
        self.L = len(key)
        self.N = sum(self.ngrams.values())
        #calculate log probabilities
        for key in self.ngrams.keys():
            self.ngrams[key] = log10(float(self.ngrams[key])/self.N)
        self.floor = log10(0.01/self.N)

    def score(self,text):
        ''' compute the score of text '''
        score = 0
        ngrams = self.ngrams.__getitem__
        for i in range(len(text)-self.L+1):
            if text[i:i+self.L] in self.ngrams: score += ngrams(text[i:i+self.L])
            else: score += self.floor          
        return score

def advancedAnalysis(text, numberIter):
    text = re.sub('[^A-Z]','',text.upper())
    fitness = ngram_score('quadgram.txt') # load our quadgram statistics
    maxkey = list('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    maxscore = -99e9
    parentscore,parentkey = maxscore,maxkey[:]
    # print("Substitution Cipher solver, you may have to wait several iterations")
    # print("for the correct result. Press ctrl+c to exit program.")
    # keep going until we are killed by the user
    i = 0
    while(i < numberIter):
        i = i+1
        random.shuffle(parentkey)
        deciphered = SimpleSub(parentkey).decipher(text)
        parentscore = fitness.score(deciphered)
        count = 0
        while count < 1000:
            a = random.randint(0,25)
            b = random.randint(0,25)
            child = parentkey[:]
            # swap two characters in the child
            child[a],child[b] = child[b],child[a]
            deciphered = SimpleSub(child).decipher(text)
            score = fitness.score(deciphered)
            # if the child was better, replace the parent with it
            if score > parentscore:
                parentscore = score
                parentkey = child[:]
                count = 0
            count = count+1
        # keep track of best score seen so far
        if parentscore>maxscore:
            maxscore,maxkey = parentscore,parentkey[:]
            #print('\nbest score so far:',maxscore,'on iteration',i)
            ss = SimpleSub(maxkey)
            #print('    best key: '+''.join(maxkey))
            #print('    plaintext: '+ss.decipher(text))

    #maxkey Inverso
    normalO = list('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    dic = {maxkey[i]:normalO[i] for i in range(len(maxkey))}
    inversekey = [dic[normalO[i]] for i in range(len(maxkey))]

    return f"key:{''.join(inversekey)} \n {ss.decipher(text)}"


def FrecText(text):
    MonoRes = {}
  
    for i in text:
        if i in MonoRes:
            MonoRes[i] += 1
        else:
            MonoRes[i] = 1

    # return MonoRes 
    MonoRes = {k: v for k, v in sorted(MonoRes.items(), key=lambda item: item[1], reverse=True)}

    BigramRes = Counter(text[idx : idx + 2] for idx in range(len(text) - 1))
    BigramRes = {k: v for k, v in sorted(BigramRes.items(), key=lambda item: item[1], reverse=True)}

    TrigramRes = Counter(text[idx : idx + 3] for idx in range(len(text) - 2))
    TrigramRes = {k: v for k, v in sorted(TrigramRes.items(), key=lambda item: item[1], reverse=True)}
    
    MonoStr = '>> Monograms: '
    BigramStr = '>> Bigrams: '
    TrigramStr = '>> Trigrams: '

    for i in MonoRes:
        MonoStr += str(i) + ': ' + str(MonoRes[i]) + ', '

    for i in BigramRes:
        BigramStr += str(i) + ': ' + str(BigramRes[i]) + ', '

    for i in TrigramRes:
        TrigramStr += str(i) + ': ' + str(TrigramRes[i]) + ', '

    #print(">> Monograms: ", MonoStr)
    #print(">> Bigrams: ", BigramStr)
    #print(">> Trigrams: ", TrigramStr)
    return "\n".join([MonoStr, BigramStr, TrigramStr])

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
