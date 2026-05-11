---
title: "KodeKloud Engineer Day 16: Install and Configure Nginx as Load Balancer"
date: 2026-05-11
modified: 2026-05-11
description: "Complete step-by-step guide to install and configure Nginx as a load balancer for the Nautilus infrastructure. Learn how to set up upstream servers and proxy pass configuration."
tags:
  - KodeKloud Engineer
  - Nginx
  - Load Balancer
  - DevOps
  - Linux
  - System Administration
categories:
  - DevOps
  - Tutorials
keywords:
  - nginx load balancer
  - reverse proxy
  - http upstream
  - kodekloud engineer
  - nautilus infrastructure
author: "Eurus DevSec"
TocOpen: true
comments: true
slug: "kodekloud-engineer-day-16-nginx-load-balancer"
---

## Overview

![Kodekloud Engineer Lab](./Pasted%20image%2020260511101410.png)

This guide walks you through configuring Nginx as a load balancer for the Nautilus infrastructure in the KodeKloud Engineer platform. You'll learn how to distribute traffic across multiple application servers using Nginx reverse proxy capabilities.

## Prerequisites

Before starting this lab, familiarize yourself with the infrastructure:

- **Reference Documentation**: [Nautilus Infrastructure Details](https://kodekloudhub.github.io/kodekloud-engineer/docs/projects/nautilus#infrastructure-details)
- Three Application Servers (stapp01, stapp02, stapp03)
- One Load Balancer Server (stlb01)
- All running on the Nautilus infrastructure

## Step 1: Verify Application Servers

First, check that each Application Server is running Apache HTTP Server on the correct ports.

### Access App Server 1

![Infrastructure Overview](./Pasted%20image%2020260511101533.png)

Connect to the first application server:

```bash
ssh tony@stapp01
```

When prompted:

- Type `yes` to accept the host key
- Enter password when prompted: `Ir0nM@n`

![SSH Connection](./Pasted%20image%2020260511101634.png)

### Verify Apache Status

Check if Apache HTTP Server is running:

```bash
sudo systemctl status httpd
```

![Apache Status](./Pasted%20image%2020260511101901.png)

You should see `active (running)` status, indicating Apache is operational.

### Check Apache Port Configuration

Find which port Apache is listening on:

```bash
sudo ss -tulnp | grep httpd
```

![Port Configuration](./Pasted%20image%2020260511102129.png)

> **Important**: Note that httpd is listening on port **8082**. The same applies to stapp02 and stapp03.

Exit the SSH session:

```bash
exit
```

![Exit App Server](./Pasted%20image%2020260511102618.png)

---

## Step 2: Install Nginx on Load Balancer

Connect to the load balancer server and install Nginx:

```bash
# SSH into the load balancer (password: Mischi3f)
ssh loki@stlb01

# Install Nginx
sudo yum install -y nginx

# Verify installation
sudo systemctl status nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Start Nginx
sudo systemctl start nginx
```

![Nginx Installation](./Pasted%20image%2020260511102806.png)

Nginx is now installed and running on the load balancer server.

---

## Step 3: Configure Nginx Load Balancer

### Modify Nginx Configuration File

The main Nginx configuration file is located at `/etc/nginx/nginx.conf`. We need to modify it to add load balancing rules.

**First, change file permissions:**

```bash
# Allow editing of the nginx.conf file
sudo chmod 777 /etc/nginx/nginx.conf

# Verify the permissions were changed
ls -la /etc/nginx/nginx.conf
```

![File Permissions](./Pasted%20image%2020260511103225.png)

### Edit the Configuration

Open the Nginx configuration file in nano:

```bash
sudo nano /etc/nginx/nginx.conf
```

![Nano Editor](./Pasted%20image%2020260511103347.png)

### Configure Upstream Servers

Navigate to the `http {}` block and add an upstream group. Add the following configuration:

```nginx
http {
    # Define upstream server group for load balancing
    upstream nautilus_app {
        server stapp01:8082;
        server stapp02:8082;
        server stapp03:8082;
    }

    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Proxy requests to upstream group
        location / {
            proxy_pass http://nautilus_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

![Nginx Configuration](./Pasted%20image%2020260511104056.png)

**Configuration Explanation:**

- `upstream nautilus_app`: Defines a group of backend servers
- `server stapp0X:8082`: Each application server with its listening port
- `location /`: Matches all incoming requests
- `proxy_pass http://nautilus_app`: Forwards requests to the upstream group (load balanced)
- `proxy_set_header`: Preserves client information in proxy headers

### Save and Exit

Save the configuration file:

- Press `Ctrl + S` to save
- Press `Ctrl + X` to exit nano

### Verify and Apply Configuration

Test the Nginx configuration syntax:

```bash
# Test configuration syntax
sudo nginx -t

# Restart Nginx to apply changes
sudo systemctl restart nginx
```

![Configuration Test](./Pasted%20image%2020260511104745.png)

You should see:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

---

## Step 4: Verify Load Balancer

Test the load balancer by accessing it from the terminal:

```bash
curl http://stlb01:80
```

![Curl Test](./Pasted%20image%2020260511104853.png)

If you receive the response:

```
Welcome to xFusionCorp Industries!
```

**Congratulations! 🎉** You have successfully configured Nginx as a load balancer!

![Success Completion](./Pasted%20image%2020260511105035.png)

![Lab Completed](./Pasted%20image%2020260511105046.png)

---

## Summary

In this lab, you:

1. ✅ Verified application servers were running Apache on port 8082
2. ✅ Installed Nginx on the load balancer server
3. ✅ Configured upstream servers for load balancing
4. ✅ Set up proxy pass rules to distribute traffic
5. ✅ Tested the load balancer configuration

The Nginx load balancer is now actively distributing incoming HTTP requests across the three application servers in a round-robin fashion, providing high availability and improved performance for the Nautilus infrastructure.

---

## Key Concepts

### Load Balancing

Load balancing distributes network traffic across multiple servers to improve:

- **Availability**: If one server fails, others handle the traffic
- **Performance**: Requests are distributed based on server capacity
- **Scalability**: Easy to add or remove backend servers

### Nginx Upstream

The `upstream` directive defines a group of servers. Nginx uses round-robin by default to distribute requests equally among healthy servers.

### Reverse Proxy

A reverse proxy like Nginx intercepts client requests and forwards them to backend servers, hiding the backend architecture from clients.
