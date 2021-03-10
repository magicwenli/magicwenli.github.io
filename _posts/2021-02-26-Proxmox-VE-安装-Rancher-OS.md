---
title: Proxmox VE 安装 Rancher OS
tags: [PVE]
---

> 参考：https://gist.github.com/michaelstanton/601db367446ae7c11b5c34e11557d718

Rancher OS镜像的安装有很多种方法，这里使用从 ISO 镜像引导的方式。

<!--more-->

## 安装Rancher OS

#### 1. 下载镜像

在[官网地址](https://rancher.com/docs/os/v1.x/en/installation/workstation/boot-from-iso/)中看到Proxmox VE，点击下载镜像：https://releases.rancher.com/os/latest/proxmoxve/rancheros.iso

#### 2. 上传到PVE，local(pve)

![Snipaste_2021-02-26_15-55-50](/assets/images/2021-02-26-Proxmox-VE-安装-Rancher-OS/Snipaste_2021-02-26_15-55-50.png)

#### 3. 使用`rancheros.iso`安装VM

![Snipaste_2021-02-26_15-57-51](/assets/images/2021-02-26-Proxmox-VE-安装-Rancher-OS/Snipaste_2021-02-26_15-57-51.png)

注意内存要大于3GB，不然会启动失败。

#### 4. 启动VM

#### 5. 设置密码

进入控制台，设置新的密码

```bash
$ sudo bash
$ passwd rancher
```

#### 6. 通过SSH连接VM

用`ifconfig`命令查看VM的IP，再在本机上通过ssh连接到VM

```bash
$ ssh rancher@<IP>
```

#### 7. 使用putty gen或者其他工具生成`ssh key`

#### 8. 准备安装Rancher OS用到的配置文件

```bash
$ vi cloud-config.yml
```

下面是一个示例，全部配置可以参考[官方文档](https://rancher.com/docs/os/v1.x/en/)。

注意`ssh key`要用单行的形式填入。

```yaml
#cloud-config

hostname: rancheros
rancher:
  network:
    interfaces:
      br0:
        bridge: true
        dhcp: false
        address: 192.168.123.200/24
        gateway: 192.168.123.1
        mtu: 1500
      eth0:
        bridge: br0
    dns:
      nameservers:
      - 223.5.5.5
      - 223.6.6.6
  console: ubuntu
write_files:
  - path: /etc/rc.local
    permissions: "0755"
    owner: root
    content: |
      #!/bin/bash
      apt-get -y update
      apt-get -y install python
ssh_authorized_keys:
  - ssh-rsa <YOUR_SSH_SEY>
```

使用`:wq`保存退出

#### 9. 安装到硬盘

```bash
$ sudo ros config validate -i cloud-config.yml
$ sudo ros install -c cloud-config.yml -d /dev/sda
```

#### 10. 移除CD驱动器，然后重启

![Snipaste_2021-02-26_16-09-57](/assets/images/2021-02-26-Proxmox-VE-安装-Rancher-OS/Snipaste_2021-02-26_16-09-57.png)

#### 11. 重启后通过ssh私钥连接到VM

## 安装Rancher Web UI

```bash
$ sudo docker run -d --privilege --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
```

通过`ip`登录

![Snipaste_2021-02-26_15-27-20](/assets/images/2021-02-26-Proxmox-VE-安装-Rancher-OS/Snipaste_2021-02-26_15-27-20.png)