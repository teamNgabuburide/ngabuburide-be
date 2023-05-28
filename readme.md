# <img width="50" src="https://raw.githubusercontent.com/teamNgabuburide/ngabuburide-frontend/main/public/favicon.ico" alt="display-documentation"> **RAZYR FURNITURE**

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
<br>

---

# **Introduction**

RAZYR FURNITURE is an ecommerce website.

---

## 𓆙 Table of Contents

- [Introduction](#Introduction)
- [Table of Contents](#𓆙-Table-of-Contents)
- [Requirement](#𓆙-Requirement)
- [Installation](#)
  - [Windows](#𓆙-Windows-Installation)
  - [Linux](#𓆙_Linux_Installation)
- [How to run](#𓆙-How-to-run)
- [Route](#𓆙-Documentation-Postman)
- [Documentation Postman](#𓆙-Documentation-Postman)
- [Related Project](#𓆙-Related-Project)
- [Contributor](#𓆙-Contributors)

## 𓆙 Requirement

This repo require a [NodeJS](https://nodejs.org/)

[ENV](#ENV) File

## 𓆙 Windows Installation

First of all, you need to install [Git](https://git-scm.com/download/win) & [NodeJS](https://nodejs.org/). Then open your git bash, and follow this:<br>

```sh
$ git clone https://github.com/teamNgabuburide/ngabuburide-be
$ cd ngabuburide-be
$ code .
$ npm i
```

## 𓆙 Linux Installation

```sh
$ apt-get update
$ apt-get install git-all
$ apt-get install nodejs-current
$ git clone https://github.com/teamNgabuburide/ngabuburide-be
$ cd ngabuburide-be
$ code .
$ npm i
```

## 𓆙 How to run

1. Install file using [WINDOWS](#Windows-Installation) OR [LINUX](Linux-Installation)

2. Add .env file at root folder, and add following

```sh
DB_HOST = ""
DB_NAME = ""
DB_PORT = ""
DB_USER = ""
DB_PWD = ""
SERVER_PORT = ""

JWT_SECRET = ""

CLOUD_NAME =  ""
CLOUD_KEY = ""
CLOUD_SECRET = ""
```

3. Starting application

```sh
$ npm run dev
```

## 𓆙 Route

| Endpoint                  |  Method  | Info         | Remark               |
| ------------------------- | :------: | :----------- | :------------------- |
| /auth                     |  `POST`  | Auth         | Login                |
| /auth/logout              | `PATCH`  | Auth         | LOGOUT               |
| /auth/register            |  `POST`  | Auth         | Register             |
| /auth                     | `PATCH`  | User         | Change Password      |
| /auth/otp                 | `PATCH`  | User         | get otp              |
| /auth/forgot              | `PATCH`  | User         | fotgot password      |
| /profile                  |  `GET`   | Profile      | Get Profile          |
| /profile                  | `PATCH`  | Profile      | Edit Profile         |
| /transactions/:id         |  `GET`   | Transactions | History Transaction  |
| /transactions/add         |  `POST`  | Transactions | Create Transaction   |
| /product/all              |  `GET`   | Products     | Get all product      |
| /product/add              |  `POST`  | Products     | Create product       |
| /product/:id              |  `GET`   | Products     | Get detail product   |
| /product/:productId       | `PATCH`  | Products     | Edit product         |
| /product/delete/:id       | `DELETE` | Products     | Delete product       |
| /product/categories       |  `GET`   | Products     | Get categories       |
| /product/categories/count |  `GET`   | Products     | Get categories count |
| /product/edit-images/:id  | `PATCH`  | Products     | Edit Images Product  |
| /favorit                  |  `GET`   | Favorite     | Get all Favorite     |
| /favorite                 |  `POST`  | Favorite     | Create Favorite      |
| /favorite/:id             | `DELETE` | Favorite     | Delete Favorite      |
| /promo/discount           |  `GET`   | Promo        | Get Promo            |
| /promo/:id                |  `GET`   | Promo        | Get Detail promo     |
| /promo/add                |  `POST`  | Promo        | Create promo         |
| /promo/edit/:id           | `PATCH`  | Promo        | Edit Promo           |
| /promo/delete/:id         | `DELETE` | Promo        | Delete Promo         |

## 𓆙 Documentation Postman

Click here [POSTMAN](https://documenter.postman.com/preview/22450553-eacc8fd4-ebd2-44b5-99d6-52ba7d5ba24a?environment=&versionTag=latest&apiName=CURRENT&version=latest&documentationLayout=classic-double-column&documentationTheme=light&logo=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&logoDark=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&right-sidebar=303030&top-bar=FFFFFF&highlight=FF6C37&right-sidebar-dark=303030&top-bar-dark=212121&highlight-dark=FF6C37)

Download json [POSTMAN](https://api.postman.com/collections/22450553-eacc8fd4-ebd2-44b5-99d6-52ba7d5ba24a?access_key=PMAT-01H1GYMKKMJ4ZGD3DQJF68ES2R)

<BR>
<BR>

## 𓆙 Related-Project

- [FRONT-END](https://razyr-store.vercel.app/)
- [BACK-END](https://ngabuburide-be.vercel.app/)

## 𓆙 Contributor

  <table>
    <tr>
      <td >
        <a href="https://github.com/redhadefinto">
          <img width="100" src="https://avatars.githubusercontent.com/u/66767762?s=400&u=00ad08bd394a1ba0fe65d9b61cbef4245df96fb4&v=4" alt=""><br/>
          <center><sub><b>Redha Definto </b></sub></center>
        </a>
        </td>
    </tr>
  </table>
<h1 align="center"> THANK FOR YOUR ATTENTION </h1>
