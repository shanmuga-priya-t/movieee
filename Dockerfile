# Nginx base image (lightweight version)
FROM nginx:alpine

# Unga project files-ah Nginx default HTML folder-kku copy panrom
COPY . /usr/share/nginx/html

# Port 80-ah open panrom (Standard for Web)
EXPOSE 80

# Nginx automatic-ah start aagidum, so extra CMD thevai illai