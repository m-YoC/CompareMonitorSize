# scaffold-ts-scss
This repository is one scaffold of frontend development using TypeScript and SCSS (Docker environment).

## Tech. and Lang.

- Docker
- Webpack
- TypeScript
- SASS, SCSS
- YAML
- (Vue.js 3: option)

## Install

If you will use not `docker-compose` command but `docker compose` subcommand, 
update `docker-compose` to `docker compose` in [Makefile](./Makefile).

```
xxx$ make docker-build
xxx$ make docker-up

<<Into Docker container...>>

xxx/frontend$ ./finit.sh [--vue.js] [--refresh]

```

`--refresh` option deletes all files and directories in the app directory prior to initialization.  
For safety, you must type `delete-XXXX` containing the random string `XXXX`.

## Webpack Rules

Check [`webpack.rules.js`](./default_files/config/webpack.rules.js)

## Option: Vue.js 3

### Rules

Check [`webpack.vue.js`](./default_files/config/vue.js/webpack.vue.js)
