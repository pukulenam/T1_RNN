import cgi, cgitb
import pandas as pd
from sentence_splitter import SentenceSplitter
import torch
from transformers import PegasusForConditionalGeneration, PegasusTokenizer

name = 'tuner007/pegasus_paraphrase'
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model_tokenizer = PegasusTokenizer.from_pretrained(name)
model = PegasusForConditionalGeneration.from_pretrained(name).to(device)

#setting up the model
def paraphrase_sentence(sentence, num_return_sequences):
  seq_batch = model_tokenizer.prepare_seq2seq_batch(
    [sentence], 
    truncation=True, 
    padding='longest', 
    max_length=60, 
    return_tensors="pt"
  ).to(device)

  generated_sequence = model.generate(**seq_batch,
                                      max_length=60,
                                      num_beams=10, 
                                      num_return_sequences=num_return_sequences, 
                                      temperature=1.5)
  
  paraphrased_sentence = model_tokenizer.batch_decode(generated_sequence, skip_special_tokens=True)

  return paraphrased_sentence

splitter = SentenceSplitter(language='en')

#defining the paraphrase function
def paraphrase(text):
  sentence_list = splitter.split(text)
  paraphrased_list = []

  for sentence in sentence_list:
    a = paraphrase_sentence(sentence, 1)
    paraphrased_list.append(a)

  paraphrased_sentences = [' '.join(x) for x in paraphrased_list]
  paraphrased_text = [' '.join(x for x in paraphrased_sentences) ]
  paraphrased_text = str(paraphrased_text).strip("\"'[]")
  
  return paraphrased_text