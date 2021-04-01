# BFGM E.V. DRESDEN NEUSTADT

![alt text](https://github.com/ngmiduc/bfgm/blob/master/doc/home.png)

## Website / application project setup

1. Install NodeJs (best with installing NVM (https://github.com/nvm-sh/nvm) first and then installing a nodeJs version)
2. Cd into the project 
3. Installing Project Dependencies : `npm i`

### Run locally in development

`npm run serve`

## Server / setup

Server is deployed on Heroku Python

### run in development

0. Install `python` with `pip`, best with `pyenv`

4. cd into directoy : `cd server`

5. Run virtual env : `. .venv/bin/activate`
6. Install dep : `pip install -r requirements.txt `
7. Export flask-env for development debugging

```
$ export FLASK_ENV=development
```
8. Start server

```
$ flask run or via python .venv/bin/flask run
```



### Deploy to production

Push to master will auto deploy all changes to production level!
