import itertools
import string
from sys import maxsize
import sys
import textwrap
##VIGENERE
def encrypt_vigenere(plaintext, key:str):
    key_length = len(key)
    key_as_int = [ord(i) for i in key]
    print(">>key as int",key_as_int)
    plaintext_int = [ord(i) for i in plaintext]
    ciphertext = ''
    for i in range(len(plaintext_int)):
        value = (plaintext_int[i] + key_as_int[i % key_length]) % 26
        ciphertext += chr(value + 65)
    return ciphertext

def decrypt_vigenere(plaintext, key:str):
    key_length = len(key)
    key_as_int = [ord(i) for i in key]
    print(">>key as int",key_as_int)
    plaintext_int = [ord(i) for i in plaintext]
    ciphertext = ''
    for i in range(len(plaintext_int)):
        value = (plaintext_int[i] - key_as_int[i % key_length]) % 26
        ciphertext += chr(value + 65)
    return ciphertext

def analyse_vigenere(text):
    return

###############VIGENERE ANALYSIS

def _decypher(cyphertext, key):
    letters = string.ascii_uppercase
    shifts = [letters.index(letter) for letter in key]
    blocks = get_blocks(text=cyphertext,size=len(key))
    cols = get_columns(blocks)
    decyphered_blocks = to_blocks([shift_(col, shift) for col, shift in zip(cols, shifts)])
    decyphered = ''.join(decyphered_blocks)
    return decyphered


def attack(text):
    # with open(file) as f:
    cyphertext = [text]
    print(cyphertext)
    key_len = 0
    # if method == 'kasiski':
    #     print('Applying kasiski examination\n')       
    #     key_len = kasiski.find_key_length(cyphertext=cyphertext[0], seq_len=SEQ_LEN, max_key_len=MAX_KEY_LEN)
    # elif method == 'ic':
    print('Applying index of coincidence examination\n')
    key_len = find_key_length(cyphertext=cyphertext[0], max_key_len=MAX_KEY_LEN)
    key = restore_key(cyphertext[0], key_len)
    decyphered = _decypher(cyphertext[0], key)
    
    print('Chosen key length: '+str(key_len))
    print('Restored key: '+str(key))
    print('Plaintext: '+str(decyphered))
    
    return {"decyphered":decyphered,"key":key}

def _ic(letter_counts):
    numerator = sum([letter_counts[l]*(letter_counts[l]-1) for l in string.ascii_uppercase])
    text_size = sum(occurrences for occurrences in letter_counts.values())
    denominator = text_size*(text_size-1)
    return numerator/denominator


def find_key_length(cyphertext, max_key_len):
    min_diff = maxsize
    key_len = 0
    for candidate_length in range(1, max_key_len + 1):
        groups = get_blocks(text=cyphertext, size=candidate_length)
        columns = get_columns(groups)
        ics = [_ic(letter_counts=get_letter_counts(text=column)) for column in columns]
        delta_bar_ic = sum(ics) / len(ics)
        if EN_IC-delta_bar_ic < min_diff:
            min_diff = EN_IC-delta_bar_ic
            key_len = candidate_length
        print('KEY_LENGTH: ' + str(candidate_length) + '\n')
        print('IC by column: '+str(ics))
        print('delta bar IC: '+str(delta_bar_ic)+'\n')
    return key_len


def get_blocks(text, size):
    blocks = [text[i:i+size] for i in range(0, len(text)-size, size)]
    return blocks


def get_columns(text_blocks):
    group_size = len(text_blocks[0])
    columns = []
    for letter_count in range(group_size):
        column = ''
        for group_count in range(len(text_blocks)):
            column += text_blocks[group_count][letter_count]
        columns.append(column)
    return columns


def to_blocks(cols):
    col_size = len(cols[0])
    blocks = []
    for letter in range(col_size):
        block = ''
        for col in range(len(cols)):
            block += cols[col][letter]
        blocks.append(block)
    return blocks

MAX_KEY_LEN = 8
EN_IC = 0.67
EN_REL_FREQ = {'A': 0.08167, 'B': 0.01492, 'C': 0.02782, 'D': 0.04253, 'E': 0.12702, 'F': 0.02228, 'G': 0.02015,
               'H': 0.06094, 'I': 0.06966, 'J': 0.00153, 'K': 0.00772, 'L': 0.04025, 'M': 0.02406, 'N': 0.06749,
               'O': 0.07507, 'P': 0.01929, 'Q': 0.00095, 'R': 0.05987, 'S': 0.06327, 'T': 0.09056, 'U': 0.02758,
               'V': 0.00978, 'W': 0.02360, 'X': 0.00150, 'Y': 0.01974, 'Z': 0.00074}


def get_letter_counts(text):
    text_upper = text.upper()
    letter_counts = {}
    for index, letter in enumerate(string.ascii_uppercase):
        letter_counts[letter] = text_upper.count(letter)
    return letter_counts


def _get_letter_frequencies(text):
    letter_counts = get_letter_counts(text)
    frequencies = {letter: count/len(text) for letter, count in letter_counts.items()}
    return frequencies


def shift_(text, amount):
    shifted = ''
    letters = string.ascii_uppercase
    for letter in text:
        shifted += letters[(letters.index(letter)-amount) % len(letters)]
    return shifted


def _corr(text, lf):
    return sum([(lf[letter]*EN_REL_FREQ[letter]) for letter in text])


def _find_key_letter(text, lf):
    key_letter = ''
    max_corr = 0
    for count, letter in enumerate(string.ascii_uppercase):
        shifted = shift_(text=text, amount=count)
        corr = _corr(text=shifted, lf=lf)
        if corr > max_corr:
            max_corr = corr
            key_letter = letter
    return key_letter


def restore_key(cyphertext, key_len):
    key = ''
    blocks = get_blocks(text=cyphertext, size=key_len)
    columns = get_columns(blocks)
    frequencies = _get_letter_frequencies(text=cyphertext)
    for column in columns:
        key += _find_key_letter(text=column, lf=frequencies)
    return key