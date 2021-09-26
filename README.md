# Web chat with React Js, Node.js and Docker

<br>

## Table of Contents

1. [Steps](#Steps)
2. [Front-End](#Front-End)
3. [Back-End](#Back-End)
4. [Docker-Container](#Docker-Container)
5. [How to install and run this project?](##how-to-install-and-run-this-project)

### 1 - Steps

There are three steps to build this project, like we can see in this image below. How we can see the core of this project are: React Js, Node.js and Docker Container.

<br>
<br>

<div align="center">
    <kbd>
        <img src="./static/mind-map-chat-app.jpeg"
        alt="chat-react-node.js"
        style="float: center; margin-right: 10px; align="center" />
    </kbd>
</div>

##

The front-end and the back-end are developed in parallel, and finally the docker image are built to run the three containers.

All the dependencies are in each dir in package.json file

### Front-End

#### Authentication Guard System
The AuthGuard protect the pages that need the user sign in, redirecting to login page.

To verify the user state was implemented a context and to store the user data I use React-Redux.

The main folders of "AuthGuard System" are: contexts, hooks, store and utils.

#### Pages

* Register page;

### Back-End

Behind the scene activities, we need a database to keep our data safe and available. The endpoints (routes) to serve the requests from the front-end are distributed in:

* Routes of register and password recovery:
    - user register;
    - reset password;
    - verify code (two factors authentications).
* Login routes:
    - Verify password;
    - Verify code.
* Contacts routes:
    - search users;
    - add contact;
    - contacts list.
* Chat routes:
    - chat-private-room;
    - chats list.
* Socket.io events:
    - send message;
    - send notification.
...

### Docker-Container

...
### How to install and run this project?

...