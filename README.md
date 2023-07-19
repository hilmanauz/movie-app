# Movie-App

## Competencies
- React.JS
- Next.JS
- Tailwind CSS
- Axios
- PWA with offline mode
- Docker

## How to run the program (Docker mode):
1. Go to the directory, and make sure you have installed the latest version of docker.
2. After that, you can run this command to build a docker container with your container name:
  ### `docker build -t <container-name> .`
3. It took around 10 minutes to finish. After that, you can run the container and set the port you wanna use for this project.
  ### `docker run -dp <port>:3000 <container-name>`
5. Go to your localhost with the port that you set it before.

## How to run the program (Dev mode):
1. Go to the directory, and install the package:
  ### `npm run install`
2. Build the project with:
  ### `npm run build`
3. After that, run your project to get PWA with offline mode function:
  ### `npm run start`
4. set the network to offline to see how offline mode works in PWA.
