import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True


# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///timer.db")

@app.route("/", methods=["GET", "POST"])
def index():
    """"Fill out form"""
    if request.method == "POST":
        exam_name = request.form.get("exam_name")
        length = request.form.get("length")
        mc_count = request.form.get("mc_count")
        sa_count = request.form.get("sa_count")
        la_count = request.form.get("la_count")
        typet = request.form.get("typet")
        print("typet")
        print(typet)
        
        if not length:
            return render_template("sorry.html")
        if not (mc_count or sa_count or la_count):
            return render_template("sorry.html")
        
        if (typet == 'yes'):
            return render_template("fancytimer.html", exam_name=exam_name, length=length, mc_count=mc_count, sa_count=sa_count, la_count=la_count)
        else:
            return render_template("regulartimer.html", exam_name=exam_name, length=length, mc_count=mc_count, sa_count=sa_count, la_count=la_count)
    else:
        return render_template("index.html")
        
@app.route("/timer", methods=["GET"])
def timer():
    """Show timer"""
    return render_template("timer.html")