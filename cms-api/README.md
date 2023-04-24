## Admin Panel API


## Description


## Installation

```bash
$ npm i -g @nestjs/cli
$ npm install
$ nest g module [PATH]/[MODULE_NAME]
$ nest g controller [PATH]/[MODULE_NAME]
$ SELECT setval('tbl_tbl_id_seq', max(tbl_id)) FROM tbl;
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## SQL
```sql
ALTER TABLE ONLY mst_temples ALTER COLUMN "templeId" SET DEFAULT nextval('"mst_temples_templeId_seq"'::regclass);
ALTER SEQUENCE "mst_temples_templeId_seq" RESTART WITH 16;

alter table mst_mandals
    add "createdIp" varchar(100) default null,
    add "modifiedIp" varchar(100) default null;

```

## Stay in touch

- Author - [Vishwakarma Vansh Suthar](https://kamilmysliwiec.com)
- Website - [https://vashwakarma.com](https://nestjs.com/)
- Twitter - [@vishwakarma](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
