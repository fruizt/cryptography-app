def encrypt_ceasar(text,s:int):
    result = ""
    # traverse text
    for i in range(len(text)):
        char = text[i]
        # Encrypt uppercase characters
        if (char.isupper()):
            result += chr((ord(char) + s-65) % 26 + 65)
        # Encrypt lowercase characters
        else:
            result += chr((ord(char) + s - 97) % 26 + 97)
    return result

#TODO:errores
def decrypt_ceasar(text,s:int):
    s = -s
    result = ""
    # traverse text
    for i in range(len(text)):
        char = text[i]
        # Encrypt uppercase characters
        if (char.isupper()):
            result += chr((ord(char) + s-65) % 26 + 65)
        # Encrypt lowercase characters
        else:
            result += chr((ord(char) + s - 97) % 26 + 97)
    return result

def analyse_ceasar(text):
    LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    answer = []
    for key in range(len(LETTERS)):
        translated = ''
        
        for symbol in text:
            if symbol in LETTERS:
                num = LETTERS.find(symbol)
                num = num - key
                
                if num < 0:
                    num = num + len(LETTERS)
                    
                translated = translated + LETTERS[num]
            
            else:
                translated = translated + symbol
    
        #print('Key #%s: %s' % (key, translated))
        answer.append({"translated":translated,"key":key})
    return answer

def verify_string(text):
    text_ = ''
    for element in text:
        if ord(element)>64 and ord(element)<91:
            text_ = text_ + element
    return text_