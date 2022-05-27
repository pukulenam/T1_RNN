from flask import Flask, render_template, request
import pegasus

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/', methods=['POST'])
def getValue():
    text = request.form['news_sum']
    paraphrase_text = pegasus.paraphrase(text)
    return render_template('output.html', news_sum=text, paraphrase_text=paraphrase_text)

if __name__ == "__main__":
    app.run(debug=True)