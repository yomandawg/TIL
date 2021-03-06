# Web Server

> HTTP response server

- browser(client) _request_ &harr; web server _response_

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

- **virtualhost**
  - `sudo a2ensite default-ssl`

```bash
# set ssl files
# /etc/apache2/sites-available/default-ssl
SSLCertificateFile {custom directory}/ssl.crt # 서버 private key
SSLCertificateKeyFile {custom directory}/ssl.key # 인증서 정보 + public key
SSLCertificateChainFile {custom directory}/sub.class1.server.ca.pem # hierarchial CA chain file
SSLCACertificateFile {custom directory}/ca.pem # root CA 인증서
```

### Elinks

> Unix 기반 text-base Web Browser\
> `sudo apt-get install elinks`

- shell환경에서 web browser 사용
- `elinks [address]`

### ApacheBench

> measure performance of HTTP web servers

- `ab -n <number of total requests> -c <number of concurrent requests> <URL>`

## IIS

> Internet Information Service

## Nginx

> lightweight and resource efficient web server

### installation

```bash
# For custom managing download server for apt-get
# /etc/apt/sources.list
# Replace $release with the corresponding Ubuntu release
deb https://nginx.org/packages/ubuntu/ $release nginx
deb-src https://nginx.org/packages/ubuntu/ $release nginx
```

### config

- document root - `/usr/share/nginx/html/`
- configuration - `/etc/nginx/`

### settings

---

## Proxy

- Anonymity
- Caching
- Blocking unwanted sites
- Geo-fencing
- vs. Virtual Private Network - 보안문제

## Reverse Proxy

- Load-balancing
- Caching
- Isolating internal traffic (DMZ)
- Logging
- Canary Deployment (Testing)
  - 시범운영 테스트
