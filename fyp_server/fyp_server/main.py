import pickle
from transformers import pipeline

import pyrebase
import pandas as pd

config = {
  "apiKey": "AIzaSyCiu0Xs_NTNNgrR0LCjR7nefFc8aDNNSMw",
  "authDomain": "final-judgment-prediction.firebaseapp.com",
  "databaseURL": "https://final-judgment-prediction-default-rtdb.firebaseio.com",
  "projectId": "final-judgment-prediction",
  "storageBucket": "final-judgment-prediction.appspot.com",
  "messagingSenderId": "750356639618",
  "appId": "1:750356639618:web:bc1e7d869ee83c455aa99b"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

print("Server  Starining.............")
while True:
  new_question = db.child("react").child("question").get().val()
  if new_question != "":
    df = pd.read_excel("english.xlsx")
    check = False
    for QA in df["topic"].values:
      print(QA)
      if QA == new_question:
        check = True
        break
      else:
        check = False

    if check:
      print("Ml Starining.............")
      vectorizer = pickle.load(open("vectorizer.pkl", 'rb'))
      new_question_vec = vectorizer.transform([new_question])
      load_model = pickle.load(open("model.pkl", 'rb'))
      prediced_answer = load_model.predict(new_question_vec)
      print("Normal Answers: ")
      answer01=prediced_answer[0]
      print(answer01)
      print()

      print("Gpt Answers: ")
      generator = pipeline('text-generation', model='gpt2')
      answer02=generator(str(new_question), max_length=100, num_return_sequences=1)[0]['generated_text']
      print(answer02)
      print()
      print()
      data ={ "question": "",
              "answer01": str(answer01),
              "answer02":str(answer02)}
      db.child("react").set(data)
    else:
      data ={ "question": "",
              "answer01": str("Your question not have datasets......"),
              "answer02":str("Please try again.................")}
      db.child("react").set(data)
  else:
    print("Please send your question")





  # # Save model and vectorizer
  # # with open('model.pkl', 'wb') as f:
  # #     pickle.dump(classifier, f)
  #
  # # with open('vectorizer.pkl', 'wb') as f:
  # #     pickle.dump(vectorizer, f)
