# Simple Chat App

This repository for example simple chat app with react and typescript

## Live demo

[Gabut Chat App](https://gabut-chat-app.herokuapp.com/)

## How to use

First, you need to creact `.env` file in root folder and inside folder client. Then in file `.env` in root folder you need to insert this variable

```
PORT=your port want to use
DB_URL=your mongodb url cluster
```

and file `.env` inside folder client you need to insert this variable.

```
REACT_APP_SOCKET_URL=http://localhost:your port
```

Second, you need to start the socket server with this command in root folder

```
npm start
```

Then, start the react app inside folder client with this command

```
npm start
```

Done! don't forget to click star button above. haha.
