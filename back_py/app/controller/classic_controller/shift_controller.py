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
    text = text.lower()
    LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    letters = 'abcdefghijklmnopqrstuvwxyz'
    answer = []
    for key in range(len(letters)):
        translated = ''
        
        for symbol in text:
            if symbol in letters:
                num = letters.find(symbol)
                num = num - key
                
                if num < 0:
                    num = num + len(letters)
                    
                translated = translated + letters[num]
            
            else:
                translated = translated + symbol
    
        #print('Key #%s: %s' % (key, translated))
        answer.append({"translated":translated,"key":key})
    return answer