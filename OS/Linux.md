# Linux

## Redhat 계열
* Open Source -> Commercial
  * faster patches, reliable support
* Fedora
* CentOS

### CentOS
* Redhat Open Source 'minus' Redhat
  * redistribution of Redhat Enterprise Linux(RHEL)
* Community-driven
* 서버용 운영체제로 인기가 높다

## Debian 계열
* Community-driven
  * slower support, distribution
* Easier to use

### Ubuntu
* Easiest - good UI
* For personal use

## Kernel
* 리누스 토발즈는 커널만 개발함 (엄격한 의미의 Linux == Kernel)
* **H/W**(CPU, RAM 등) **)** **Kernel** **)** **Shell**(명령어 해석기) **)** **Application** => 베포판

## GNU Project
* 모두가 공유하는 소프트웨어
* GPL (General Public License) - 수정과 공유의 자유
  * monetizatin, redistribution 가능


# CentOS

## Server

### 보안설정
* selinux
* `su` (super user)

### package manager
* **apt-get**
* **yum**

## File System
* **a** - 정적 라이브러리(최종파일안에 묻어짐 static)
* **so** - 동적 라이브러리(프로그램실행후 필요할때 불려짐 similar to dll's)


## Commands

* `ps [aux]` - view all processes running
* `pgrep {process}` - search for a process
* `top`(`htop`) - view resource usage
* `kill pid`(`pkill {process name}`) - kill a process
* `service {process name} start/stop` - start/stop a process using `service`

* `<` - standard input
* `>`(`1>`) - standard output redirection
* `>>` - append to the file
* `2>` - standard error redirection
* `2>&1` - redirect standard error to standard output
```bash
cat < temp.txt 1> result.txt 2> error.log
```
* `cat` - concatenate to standard input
* `head [-n1]` - print the first *n* lines of a file
* `tail [-n1]` - print the last *n* lines of a file

* `where` - search for a file (binary, source, manual) from `$PATH`(환경변수)
* `locate` - search for a file (from database)
* `find` - search for a file (in a directory hierarchy)

* `fg [%n]`(foreground) - context switch to background program (switch to background by `ctrl` + `z`)
* `jobs` - view all background programs 
  * `kill -9 %n` - force close background program

* `cron` - periodically run files in background

## Terms
* Commandline Arguments (입력)
  * `argv`, `argc`


## Common Directories

* `/dev/null` - trash bin
* `/etc/` - system config files
  * `/etc/rc3.d` - CLI environment autostart links
  * `/etc/rc5.d` - GUI environment autostart links


### Daemon Programs
* Always-running background programs
* servers