
def parse(string):
    newsentence = ''
    for char in string:
        letter = ''
        if char == 'a': letter = 'O'
        if char == 'b': letter = 'C'
        if char == 'c': letter = '7'
        newsentence += letter
    return newsentence

def getinput():
    inputstring = input('Enter your text: ')
    translation = parse(inputstring)
    print(translation)

getinput()