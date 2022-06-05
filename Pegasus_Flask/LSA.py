import nltk
import csv
import pandas as pd
import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse.linalg import svds

nltk.download('punkt')
nltk.download('stopwords')

def LSA(file):
    f = open(file, 'r')
    DOCUMENT = f.read()

    DOCUMENT = re.sub(r'\n|\r', ' ', str(DOCUMENT))
    DOCUMENT = re.sub(r' +', ' ', str(DOCUMENT))
    DOCUMENT = DOCUMENT.strip()

    #Tahap memisahkan kalimat yang ada di dokumen
    sentences = nltk.sent_tokenize(str(DOCUMENT)) #pisah perkalimat pake koma
    # print(sentences)

    #Memasukkan fungsi stopwords ke variabel stop_words
    stop_words = nltk.corpus.stopwords.words('english')

    #Menormalisasi dokumen
    def normalize_document(DOCUMENT):
        # lower case and remove special characters\whitespaces
        isi_document = re.sub(r'[^a-zA-Z\s]', '', DOCUMENT, re.I|re.A)
        isi_document = isi_document.lower()
        isi_document = isi_document.strip()
        # tokenize document
        tokens = nltk.word_tokenize(isi_document)
        # Menyaring stopwords yang ada di dokumen
        filtered_tokens = [token for token in tokens if token not in stop_words]
        # Membuat kembali dokumen dari hasil normalisasi dokumen 
        DOCUMENT = ' '.join(filtered_tokens)
        return DOCUMENT

    #Mengambil kata yang penting di dalam kalimat
    normalize_corpus = np.vectorize(normalize_document)

    #Mengubah kata dan kalimat penting tadi ke dalam matrix
    normalize_sentences = normalize_corpus(sentences)
    normalize_sentences[:3]

    #Menghitung seberapa sering munculnya kata di dalam kalimat
    tfidVector = TfidfVectorizer(min_df=0., max_df=1., use_idf=True)
    dt_matrix = tfidVector.fit_transform(normalize_sentences)
    dt_matrix = dt_matrix.toarray()
    vocab = tfidVector.get_feature_names()
    td_matrix = dt_matrix.T
    # print(td_matrix.shape)
    pd.DataFrame(np.round(td_matrix, 2), index=vocab).head(10)

    #Mengurai matrix dalam bentuk yang sederhana untuk mempermudah pengolahan data
    def low_rank_svd(matrix, singular_count=2):
        u, s, vt = svds(matrix, k=singular_count)
        return u, s, vt

    number_sentences = round(len(sentences) * 0.3) # diambil 30% dari total kalimat
    number_topics = 3 #ini k nya

    u, s, vt = low_rank_svd(td_matrix, singular_count=number_topics)  
    # print(u.shape, s.shape, vt.shape)
    term_topic_mat, singular_values, topic_document_mat = u, s, vt

    # Menghilangkan Nilai Singular di bawah ambang batas                                     
    sv_threshold = 0.5
    min_sigma_value = max(singular_values) * sv_threshold
    singular_values[singular_values < min_sigma_value] = 0

    salience_scores = np.sqrt(np.dot(np.square(singular_values), 
                                    np.square(topic_document_mat)))
    salience_scores

    top_sentence_indices = (-salience_scores).argsort()[:number_sentences]
    top_sentence_indices.sort()

    words = '\n'.join(np.array(sentences)[top_sentence_indices])
    #print(words.replace("\\", ""))

    return words.replace("\\", "")
