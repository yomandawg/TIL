# Web Server
> HTTP response server
* browser(client) *request* &harr; web server *response*

## Apache
> Apache HTTP Server\
> `sudo apt-get install apache2`
### config
```bash
# /etc/apache2/apache2.conf
IncludeOptional sites-enabled/*.conf # include all the document configs
```
```bash
# /etc/apache2/sites-enabled/000-default.conf
DocumentRoot /var/www/html # `document root` location - 최상위 root document

# APACHE_LOG_DIR == /var/log/apache2 
ErrorLog ${APACHE_LOG_DIR}/error.log # Error log location
CustomLog ${APACHE_LOG_DIR}/access.log combined # User connection log
# easy monitoring of the logs by `tail -f`
``` 
```bash
# /var/www/html
index.html # searches for index.html
```

### Elinks
> Unix 기반 text-base Web Browser\
> `sudo apt-get install elinks`
* shell환경에서 web browser 사용
* `elinks [address]`


## IIS
> Internet Information Service


## Nginx
