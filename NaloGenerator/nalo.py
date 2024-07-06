class Word:
    type = ''
    words = []
    subjects = []
    objects = []

pronoun = Word()
pronoun.words = ['I', 'you']

animals = Word()
animals.words = ['cat', 'dog', 'mouse']

house = Word()
house.words = ['table', 'chair', 'couch', 'wall']

verb = Word()
verb.type = 'verb'
verb.words = ['talk', 'walk', 'hit']
verb.subjects = [pronoun]
verb.objects = [animals]

sentenceverb = verb.words[1]
sentencepronoun = verb.subjects[0].words[0]
sentenceobject = verb.objects[0].words[1]

sentence = sentencepronoun + ' ' + sentenceverb + ' ' + sentenceobject + '.'

print(sentence)

# print('what the heck')