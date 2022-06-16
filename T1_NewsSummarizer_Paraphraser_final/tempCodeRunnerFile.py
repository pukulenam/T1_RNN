
class UploadFileForm(FlaskForm):
    file = FileField("file", validators=[InputRequired()])
    submit = SubmitField("Upload File")