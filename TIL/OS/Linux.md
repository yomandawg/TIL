# Linux

## Redhat 계열

- Open Source -> Commercial
  - faster patches, reliable support
- Fedora
- CentOS

### CentOS

- Redhat Open Source 'minus' Redhat
  - redistribution of Redhat Enterprise Linux(RHEL)
- Community-driven
- 서버용 운영체제로 인기가 높다

## Debian 계열

- Community-driven
  - slower support, distribution
- Easier to use

### Ubuntu

- Easiest - good UI
- For personal use

## Kernel

- 리누스 토발즈는 커널만 개발함 (엄격한 의미의 Linux == Kernel)
- **H/W**(CPU, RAM 등) **)** **Kernel** **)** **Shell**(명령어 해석기) **)** **Application** => 베포판

## GNU Project

- 모두가 공유하는 소프트웨어
- GPL (General Public License) - 수정과 공유의 자유
  - monetizatin, redistribution 가능

## Windows Subsystem for Linux

> native Linux 호환 Kernel Interface for Windows

### Installation

1. Register to [Windows Insider](https://insider.windows.com/en-us/register/) program
2. Link an Microsoft Account with Windows Insider Program
3. [Install WSL2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) - _Only available for Windows 10 x64_
4. Turn Windows features on
   1. Virtual Machine Platform
   2. Windows Subsystem for Linux
5. Install Linux distro from Store - Ubuntu

---

### 보안설정

- selinux
- `su` (super user)

### package manager

- **apt-get**
  - `sudo apt-cache search [package name]` - search for packages
  - `sudo apt-get update` - update all the packages
  - `sudo apt-get install [package name]` - install a package
  - `sudo apt-get remove [package name]` or `sudo apt-get purge [package name]` - remove only the program or remove completely
  - `/etc/apt/sources.list` - manage download server
- **yum**

## File System

- **a** - 정적 라이브러리(최종파일안에 묻어짐 static)
- **so** - 동적 라이브러리(프로그램실행후 필요할때 불려짐 similar to dll's)

## VI

- `/[search keyword]`
  - `n` - search next
  - `N` - search previous

## Commands

- `ps {aux}` - view all processes running
- `pgrep [process]` - search for a process
- `top`(`htop`) - view resource usage
- `kill pid`(`pkill [process name]`) - kill a process
- `service [process name] start/stop` - start/stop a process using `service`

- `who` or `whoami` or `echo $USER` or `id` or `groups` - view current user and group

- `<` - standard input
- `>`(`1>`) - standard output redirection
- `>>` - append to the file
- `2>` - standard error redirection
- `2>&1` - redirect standard error to standard output

```bash
cat < temp.txt 1> result.txt 2> error.log
```

- `cat` - concatenate to standard input
- `head [-n1]` - print the first _n_ lines of a file
- `tail [-n1]` - print the last _n_ lines of a file

  - `tail -f` - 실시간으로 추가된 내용 표시 (convenient for monitoring servers)

- `where` - search for a file (binary, source, manual) from `$PATH`(환경변수)
- `locate` - search for a file (from database)
- `find` - search for a file (in a directory hierarchy)

- `fg [%n]`(foreground) - context switch to background program (switch to background by `ctrl` + `z`)
- `jobs` - view all background programs

  - `kill -9 %n` - force close background program

- `cron` - periodically run files in background

- `id` - print user and group information
- `who` - show online users
- `su - [user]` - change users

- `-R` - recursive
- `{1..10}` - apply to multiple items

- `curl ipinfo.io/ip` - view public ip
- `ip addr` - view private ip

- `&&` - execute if 1
- `||` - execute if 0

- `wget {address}` - get contents from web server
- `tar [-xvfz] {filename}` - unzip

### File Properties

`-rwxrwxrwx 1 username groupname 0 Apr 15 16:26 temp.txt`
| type | access mode | links | owner | group | size | date | filename |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| - | rwxrwxrwx | 1 | username | groupname | 0 | Apr 15 16:26 | temp.txt |
| l/d... | u/g/o | | | |

- `chmod [access]±[mode] temp.txt` or `chmod xxx temp.txt`

### sh file

- executable file

```bash
# 해석기
!#/bin/bash
echo 'do something'
```

## Terms

- Commandline Arguments (입력)
  - `argv`, `argc`

## Common Files

- `/dev/null` - trash bin
- `/etc/` - program config files
  - `/etc/rc3.d` - CLI environment autostart links
  - `/etc/rc5.d` - GUI environment autostart links
- `~/.bashrc` - 새 터미널을 켤때마다 load
- `~/.bash_profile` - 시스템을 시작할 때마다 load
- `/root` - root directory (접근 permission need)
- `/home/[user]` - user directory
- `/etc/hosts` - host file
- `/etc/apt/sources.list` - apt-get package server

### Daemon Programs

- Always-running background programs
- servers

### SSH

> secure shell (RSA)

- remote access of ssh_server &harr; ssh_client
- `ssh [-p port] client@address`
  - ssh default port == 22
- `ssh-keygen` - 공개키, 비공개키 생성
  - `ssh-copy-id client@address` - add public keys to dest

```bash
# ~/.ssh
id_rsa # ssh private key - 철저히 비공개
id_rsa.pub # ssh public key - 공개키가 저장돼있는 컴퓨터에 로그인 없이 로그인 가능
```

### rsync

> remote sync

- 원격으로 존재하는 컴퓨터들을 sync (for backup and other uses)
- `rsync [-avzP] {src} {dest}`
  - `archive`, `view`, `zip`, `Progess`
- `rsync [options] {src} {user@address}:{dest}`
