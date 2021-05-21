import os

from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp

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

@app.route("/", methods=["GET", "POST"])
def index():
    """"Fill out form"""
    if request.method == "POST":
        length = request.form.get("length")
        mc_count = request.form.get("mc_count")
        typet = request.form.get("typet")
        
        if not length or length == '0':
            sorry = "You didn't enter an exam length"
            return render_template("sorry.html", sorry=sorry)
        if not mc_count or mc_count == '0':
            sorry = "You didn't enter an amount of questions"
            return render_template("sorry.html", sorry=sorry)
            
        if (typet == 'manual'):
            return render_template("fancytimer.html", length=length, mc_count=mc_count)
        else:
            return render_template("regulartimer.html", length=length, mc_count=mc_count)
    else:
        return render_template("index.html")

@app.route("/sorry", methods=["GET", "POST"])
def sorry():
    if request.method == "POST":
        return redirect("/")
    else:
        return render_template("sorry.html")