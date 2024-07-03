

!pip install cleantext
!pip install sinling

import os
import re
import sys
import nltk
import string
import itertools
import numpy as np 
import pandas as pd 
import seaborn as sns
from sklearn import tree
from sklearn.svm import SVC
from joblib import dump, load
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from nltk.corpus import stopwords
from cleantext import clean
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
from sinling import SinhalaTokenizer
tokenizer = SinhalaTokenizer()
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
from keras.models import Sequential,Model
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import LabelEncoder
from keras.utils.np_utils import to_categorical
from sklearn.ensemble import AdaBoostClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from keras.layers import Dense,LSTM, SpatialDropout1D, Embedding

def prepocess_comment(comment):
    stop_set = list(string.punctuation)
    regrex_pattern = re.compile(pattern="["
                                u"\U0001F600-\U0001F64F"  # emoticons
                                u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                                u"\U0001F680-\U0001F6FF"  # transport & map symbols
                                u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                                "]+", flags=re.UNICODE)

    processed_comment = re.sub('@[^\s]+', '', comment)
    processed_comment = re.sub(r'@\w+', '', processed_comment)
    processed_comment = regrex_pattern.sub(r'', processed_comment)
    processed_comment = re.sub('http[^\s]+', '', processed_comment)
    processed_comment = ''.join(
        c for c in processed_comment if not c.isnumeric())
    processed_comment = ' '.join(
        [i for i in tokenizer.tokenize(processed_comment) if i not in stop_set])
    # processed_comment = clean(processed_comment, to_ascii=False, lower=False, normalize_whitespace=True, no_line_breaks=True, strip_lines=True, keep_two_line_breaks=False, no_urls=True, no_emails=True, no_phone_numbers=True, no_numbers=True,
    #                           no_digits=True, no_currency_symbols=True, no_punct=True, no_emoji=True, replace_with_url='', replace_with_email='', replace_with_phone_number='', replace_with_number='', replace_with_digit='', replace_with_currency_symbol='', replace_with_punct='')

    return processed_comment



def plot_confusion_matrix(cm, classes,
                          normalize=False,
                          title='Confusion matrix',
                              cmap=plt.cm.Greens):
    plt.figure(figsize=(50, 20), dpi=130)
    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]

    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, cm[i, j],
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')

import pandas as pd

# Load dataset
df = pd.read_excel("/content/english.xlsx")

print(df.isnull().sum())
nltk.download('wordnet')
nltk.download('stopwords')

# df['cleaned'] = df['topic'].apply(lambda x: prepocess_comment(x))
df['cleaned'] = df['topic'].apply(lambda x:x.lower())
for i in range(len(df)):
    lw=[]
    for j in df['cleaned'][i].split():
        if len(j)>=3:                  
            lw.append(j)
    df['cleaned'][i]=" ".join(lw)
ps = list(";?.:!,")

df['cleaned'] = df['cleaned']

for p in ps:   
    df['cleaned'] = df['cleaned'].str.replace(p, '')

df['cleaned'] = df['cleaned'].str.replace("    ", " ")
df['cleaned'] = df['cleaned'].str.replace('"', '')
df['cleaned'] = df['cleaned'].apply(lambda x: x.replace('\t', ' '))
df['cleaned'] = df['cleaned'].str.replace("'s", "")
df['cleaned'] = df['cleaned'].apply(lambda x: x.replace('\n', ' '))

wl = WordNetLemmatizer()
nr = len(df)
lis = []
for r in range(0, nr):
    ll = []
    t = df.loc[r]['cleaned']
    tw = str(t).split(" ")
    for w in tw:
        ll.append(wl.lemmatize(w, pos="v"))
    lt = " ".join(ll)
    lis.append(lt)

df['cleaned'] = lis

sw = list(stopwords.words('english'))
for s in sw:
    rs = r"\b" + s + r"\b"
    df['cleaned'] = df['cleaned'].str.replace(rs, '')

print(df['cleaned'].values)

# Import necessary libraries
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import SGDClassifier
import pickle


# Separate questions and answers
questions = df['cleaned'].values
answers = df['explanation'].values

# print(type(questions))
# print(answers)

# # Initialize vectorizer and classifier
vectorizer = TfidfVectorizer()
classifier = SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3, random_state=42)

# Vectorize questions
X = vectorizer.fit_transform(questions)

# # Train classifier
classifier.fit(X, answers)
yp=classifier.predict(X)
acc = accuracy_score(answers, yp)
print("accuracy is: ",acc)

#Save model and vectorizer
with open('model.pkl', 'wb') as f:
    pickle.dump(classifier, f)
    
with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)


CM = confusion_matrix(answers, yp)
plot_confusion_matrix(CM, classes = range(len(answers)),cmap=plt.cm.Reds)
print(classification_report(answers, yp))

    



