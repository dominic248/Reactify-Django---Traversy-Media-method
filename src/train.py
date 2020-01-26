from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from mysite import settings
from chatterbot.trainers import ChatterBotCorpusTrainer


chatterbot = ChatBot(**settings.CHATTERBOT)

trainer = ListTrainer(chatterbot)
trainer.train([
    "I would like to book a flight.",
    "Your flight has been booked."
])
trainer.train([
    "Hi",
    "Hey"
])

trainer = ChatterBotCorpusTrainer(chatterbot)
trainer.train(
    "chatterbot.corpus.english.greetings",
    "chatterbot.corpus.english.conversations"
)