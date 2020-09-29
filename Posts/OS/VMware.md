# VMware

## Settings

### Process
* `virtualize intel vt-x/ept or amd-v/rvi`

### Hard-drive
* IDE
* SCSI
  * 서버에서 많이 사용
* SATA
* NVMe

### BIOS

### Virtual Network
* Host IP 또한 192.168.default.0/24에 포함시켜 가상 게이트웨이에서 할당되는 것처럼 보이게 한다
* vmnetcfg - virtual network 설정 툴

## CentOS 7.0

### Partition
> CentOS 사용을 위해 최소 2개의 분할 파티션이 필요함
* 마운트 지점
  * */*: 최상위 파티션
  * *swap*: 가상메모리 공간 (실제 메모리가 부족할 때 사용)
* Partition 설정
  * 표준 파티션
  * LVM
  * LVM Thin Provisioning

### X-Window

### Gnome



## 기능

### Snapshot

### ISO

### Kdump
* 커널 충돌 덤프 기술
* 시스템 충돌시 원인을 파악하는 시스템 정보 캡처

