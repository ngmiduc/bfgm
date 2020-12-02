# bfgm 

## website / application Project setup

1. Install NodeJs (best with installing NVM first and then installing a nodeJs version)
3. Installing Project Dependencies : `npm i`


### Compiles and hot-reloads for development

`npm run serve`

### Compiles and minifies for production

1. Installing Firebase CLI : `npm i -g firebase-tools`
2. Build project : `npm run build`
3. Login into firebase : `firebase login`
4. Deploy to hosting : `firebase deploy --only hosting`

## server setup

Server is deployed on Heroku Python

### run in development

0. Install `python` with `pip`, best with `pyenv`

1. Installing Heroku and Heorku CLI https://devcenter.heroku.com/articles/heroku-command-line
2. Login to Heroku : `heroku login`
3. Clone Heroku Git repo : `heroku git:clone -a bfgm`
4. cd into directoy : `cd bfgm`

5. Run virtual env : `source env/bin/activate`
6. Install dep : `pip install -r requirements.txt `
7. (optional) for freezing requirements.txt : `pip freeze > requirements.txt`


```
$ export FLASK_ENV=development
```

```
$ flask run
```



### Deploy to production

1. Commmit all changes
```
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```
2. Push to master heroku `git push heroku master`
