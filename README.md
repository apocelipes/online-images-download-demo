# online-images-download

A demo shows creating zip files and downloading in web pages.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## using podman/docker to setup this demo

```bash
# podman
sudo podman build -t <your image name> .
sudo podman run -d --name <container name> -p 80:80 <your image name>

# docker
sudo docker build -t <your image name> .
sudo docker run -d --name <container name> -p 80:80 <your image name>
```
