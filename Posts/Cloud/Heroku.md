# Heroku

## Deploying
```bash
heroku create yoman-task-manager
heroku git:remote -a yoman-task-manager # link directory to existing app
heroku config:set key=value -a yoman-task-manager
heroku config # view all config vars
```