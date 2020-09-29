# Python

> Python Notes


## Python Project Structrue


## `setup.py` vs `requirements.txt`

### `setup.py`
* Python Library가 문제 없이 배포되도록, 일련의 메타데이터를 작성하는 명세 공간
```python
# 예시
from setuptools import setup

setup(
    name="MyLibrary",
    version="1.0",
    install_requires=[
        "requests",
        "bcrypt",
    ]
    # ...
)
```
* 위 명세에서 의존성을 어디서 가져와야 되는지는 적혀있지 않음
  * URL, 파일 경로 등이 없음
* 위 의존성의 정의가 duck typing 방식이라고 생각한다면, 이는 위 의존성처럼 보이는 `install_requires`만 갖고 있으면 된다는 것
  * 이는 너무 추상적이므로 문제 발생!

### `requirements.txt`
* Python Application은 일반적으로 배포를 위한 특정 설정 파일이 필요함
* 이 때 어플리케이션이 종속된 의존성 라이브러리의 구체적 정보를 확인해야 되는데, 이 정보를 저장하기 위해 `requirements`를 생성함
```bash
# 예시
--index-url https://pypi.python.org/simple/

MyPackage==1.0
requests==1.2.0
bcrypt==1.0.2
```


## Tox

> https://tox.readthedocs.io/en/latest/

* Tox is a generic virtualenv management and test command line tool for:
  * checking your package installs with different Python versions
  * running your tests in each of the environments
  * acting as a CI servers

### Example
* `pip install tox`
* basic project information & test environments > `tox.ini`
  * or generate automatically by `tox-quickstart`
```ini
# content of: tox.ini, put in same dir as setup.py
[tox]
envlist = py27, py36 # 테스트할 Python versions

[testenv]
# install pytest in the virtualenv where commands will be executed
deps = flask, pytest # 의존성
commands = pytest # 테스트 명령
```

&rarr; 각 Python version 별 의존성을 설치하고 배포 파일을 생상한 다음, 테스트 실행을 자동화