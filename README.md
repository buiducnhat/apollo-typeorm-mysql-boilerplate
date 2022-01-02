# Boilerplate for NodeJs with Express, Typeorm, Mysql (using Typescript)

This is a base source code for continue developing other project.

This code still have some comments for explaination, remove them if not necessary.

The entities current has: User. All of theme have only some sample fields and relations so I could write a fews API for Signin and Signup (containning some middlewares).

---

## Main tech

- `Node.js` with `NPM`, `yarn` for dependencies management.
- `Express` framework for building a RESTful API server
- `Typeorm` for work easier with database
- `Mysql`
- `Typescript` language (support build to js files with absolute path)
- `Winston` for logger (already installed with Vietnamese timezone)

---

## Development

### Clone repository

```
git clone git@github.com:gerpann/gerpan-express-typeorm-boilerplate.git
```

### Prepare

I used `node` version `14.17.0` (The `lts` version at the time I write this), but you can also install other `lts` version

```
nvm install 14.9.0
```

or

```
nvm install lts
```

I _recommend_ you to install `yarn` at global scope before install dependencies of this source code

```
npm install -g yarn
```

The first time, you will need to run this script to install dependencies.

```
yarn
```

For run with database (I used Mysql), you can config it in `.env` file and some files in folder `src/config`.

Normally, you have to create a schema before run any code relate with database.

**Script to build source code to JS:**

```
yarn build
```

**Then just start the server wit**

```
yarn start
```

_To see some other scripts you can open file `package.json` for detail._

---

## Generate tables for new (empty) schema

- Make sure your schema has just been created or does not have any tables.
- Next, open file `package.json` and find in the script `migration:generate` where `-n Gerpan` and replace them with your favourite name (don't think too much because this just for make migrations data)
- Then run script following script to generate script for create table in the future

```
yarn migration:generate
```

- After the previous step, you will see a file have name like `1625156147394-XXX.ts` (timestamp-yourname.ts), it contains data to make tables for schema.
- Finally, run the below script to apply this to your schema.

```
yarn migration:run
```

---

## Project Structure

```
gerpan-express-typeorm-boilerplate
.
├── .circleci
├── .env.example
├── .prettierrc
├── .prettierignore
├── .gitignore
├── LICENSE
├── nodemon.json
├── package.json
├── README.md
├── tsconfig.json
├── yarn.lock
├── src
│   ├── api
│   │   ├── middlewares
│   │   ├── routes
│   │   └── index.ts
│   ├── config
│   │   ├── index.ts
│   │   └── ormconfig.ts
│   ├── decorators
│   ├── entity
│   ├── interfaces
│   ├── jobs
│   ├── loaders
│   │   ├── database.ts
│   │   ├── dependencyInjector.ts
│   │   ├── events.ts
│   │   ├── express.ts
│   │   ├── index.ts
│   │   └── logger.ts
│   ├── migration
│   ├── services
│   ├── subcribers
│   ├── types
│   ├── utils
│   └── app.ts
└── tests
```

---

## API Validation

By using [celebrate](https://github.com/arb/celebrate), the req.body schema becomes cleary defined at route level, so even frontend devs can read what an API endpoint expects without needing to write documentation that can get outdated quickly.

```js
  signUp: celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
```

**Example error**

```json
{
  "errors": {
    "message": "child \"email\" fails because [\"email\" is required]"
  }
}
```
