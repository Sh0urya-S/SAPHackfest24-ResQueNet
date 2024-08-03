import pyttsx3

info = []
def speak_hindi(text):
    engine=pyttsx3.init()
    voices=engine.getProperty('voices')
    engine.setProperty('voice',voices[1].id)
    engine.setProperty('rate',160)
    engine.say(text)
    engine.runAndWait()

def speak_english(text):
    engine = pyttsx3.init()
    slower_rate = 120
    engine.setProperty('rate', slower_rate)
    engine.say(text)
    engine.runAndWait()

def English():
    text = "How many people in need?"
    speak_english(text)

    num_user = input("Enter number of People: ")

    text = "Click 1 for Food 2 for Water 3 for Medics 4 for medical emergency"
    speak_english(text)
    requirement = input("Enter number of People: ")

    text = "We'll be there to help you shortly."
    speak_english(text)


def Hindi():
    text = "कितने लोगों को ज़रूरत है?"
    speak_hindi(text)

    num_user = input("लोगों की संख्या दर्ज करें: ")

    text = "भोजन के लिए 1 पर क्लिक करें पानी के लिए 2 पर क्लिक करें चिकित्सकों के लिए 3 पर क्लिक करें चिकित्सा आपात स्थिति के लिए 4 पर क्लिक करें"
    speak_hindi(text)
    requirement = input("लोगों की संख्या दर्ज करें: ")

    text = "हम शीघ्र ही आपकी सहायता के लिए उपस्थित होंगे।"
    speak_hindi(text)


text = "Welcome To Rescue net . Click 1 for English and 2 for Hindi"
speak_english(text)

lang_select = input("Enter Your Choice: ")

if lang_select == "1":
    English()
if lang_select == "2":
    Hindi()
