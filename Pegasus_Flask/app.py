from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from wtforms.validators import InputRequired
from werkzeug.utils import secure_filename

import os
import pegasus
import LSA

class UploadFileForm(FlaskForm):
    file = FileField("file", validators=[InputRequired()])
    submit = SubmitField("Upload File")

def remove_escape_char(text):
    """Removing escape character from a given text."""
    result = bytes(text, 'utf-8').decode('unicode_escape')
    return result  

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'uploaded_files'

@app.route('/home', methods=['GET', 'POST'])
def home():
    return render_template('index.html')
@app.route('/lsa', methods=['GET', 'POST'])
def lsa():
    form = UploadFileForm()        
    if form.validate_on_submit():
        file = form.file.data
        path = os.path.join(os.path.abspath(os.path.dirname(__file__)), app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(path)
        text = LSA.LSA(path)
        return render_template('output_lsa.html', news_sum=text)
    return render_template('index2.html', form=form)

@app.route('/lsa+pegasus', methods=['GET', 'POST'])
def lsa_pegasus():
    form = UploadFileForm()        
    if form.validate_on_submit():
        file = form.file.data
        path = os.path.join(os.path.abspath(os.path.dirname(__file__)), app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(path)
        text = LSA.LSA(path)
        paraphrase_text = pegasus.paraphrase(text)
        return render_template('output_lsa_pegasus.html', news_sum=text, paraphrase_text=remove_escape_char(paraphrase_text))
    return render_template('index2.html', form=form)

if __name__ == "__main__":
    app.run(debug=True)