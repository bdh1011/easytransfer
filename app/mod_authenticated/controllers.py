# -*- coding: utf-8 -*-
from flask import Flask, Blueprint, request, jsonify, make_response, render_template, flash, redirect, url_for, session, escape, g
from flask.ext.login import login_required

authenticated = Blueprint('authenticated', __name__, url_prefix='/authenticated', template_folder='authenticated')

# Add CSS sheet only for unauthenticated urls
@authenticated.context_processor
def css_processor():
    return dict(css='/static/css/authenticated.css')

# @login_required
def index():
    return render_template('authenticated/index.html')


@login_required
def send():
    return render_template('authenticated/send.html')

@login_required
def send_money():
	if request.method == 'POST':
	    send_info = request.get_json()['send_info']
	    print send_info
	    session['send_info'] = send_info
	    return jsonify({'code':'200'})


@login_required
def account():
	if request.method == 'GET':
		return render_template('authenticated/account.html')
	else:
		account = {}
		account_number = request.form['account_number']
		bank = request.form['bank']
		sender_name = request.form['sender_name']
		account['account_number'] = account_number
		account['bank'] = account_number
		account['sender_name'] = sender_name
		print account
		return redirect('authenticated/result')

@login_required
def result():
	return render_template('authenticated/result.html')



# URLs
authenticated.add_url_rule('/home/', 'index', index)
authenticated.add_url_rule('/send', 'send', send)
authenticated.add_url_rule('/send_money', 'send_money', send_money,methods=['GET','POST'])
authenticated.add_url_rule('/account', 'account', account,methods=['GET','POST'])
authenticated.add_url_rule('/result', 'result', result)
