from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from wtforms.validators import InputRequired
from werkzeug.utils import secure_filename

import os
import pegasus
import LSAbaru

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'static/files'

@app.route('/')
def index():
    return render_template("index.html")

class UploadFileForm(FlaskForm):
    file = FileField("file", validators=[InputRequired()])
    submit = SubmitField("Upload File")

@app.route('/index', methods=['POST'])
def getValue():
    form = UploadFileForm()        
    if form.validate_on_submit():
        file = form.file.data # First grab the file
        path = os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))
        file.save(path)
    # text = request.form['news_sum']
        text = LSAbaru.LSA(path)
        paraphrase_text = pegasus.paraphrase(text)
        return render_template('output.html', news_sum=text, paraphrase_text=paraphrase_text)
    return render_template('index.html', form=form)

if __name__ == "__main__":
    app.run(debug=True)