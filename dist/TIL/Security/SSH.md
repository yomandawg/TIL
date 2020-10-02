# Secure Shell

```bash
$ ls -al ~/.ssh # empty

$ ssh-keygen -t rsa -b 4096 -C "yoyoyo"
```

```bash
Enter file in which to save the key (/c/Users/bluek/.ssh/id_rsa): # default
Enter passphrase (empty for no passphrase): # default

$ ls -al ~/.ssh
total 24
drwxr-xr-x 1 asdf 197609    0  6월 12 22:58 .
drwxr-xr-x 1 asdf 197609    0  6월 12 17:01 ..
-rw-r--r-- 1 asdf 197609 3389  6월 12 22:58 id_rsa # secret key
-rw-r--r-- 1 asdf 197609  749  6월 12 22:58 id_rsa.pub # public key
```

```bash
# `eval` execute arguments as shell command
$ eval "$(ssh-agent -s)"

ssh-add -K ~/.ssh/id_rsa

cat ~/.ssh/id_rsa.pub

# add the ssh-rsa sequence to github

ssh -T git@github.com
```
