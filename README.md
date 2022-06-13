# express-app-lite
集成了身份验证、ORM、日志、api文档的express应用模板

## Feature

- typescript
- prisma ORM
- winston 日志
- yup 数据验证 
- jsonwebtoken 使用REA256验证token
- apidoc 自动生成api文档

## Usage

默认使用MySQL数据库，你应该在应用运行之前在本地安装MySQL并创建`express-demo`数据库，具体配置见`.env`文件

使用`yarn run api`可以生成最新的接口文档，静态文件在`./apidoc/`中，运行服务后可在`http://localhost:3000/apidoc`中查看

使用`yarn run version`后需要在文件`./CHANGELOG.md`中手动更新日志

## Script

```bash
# install
yarn

# run
yarn run dev

# build
yarn run build

# generate prisma client
yarn run generate

# generate database tables
yarn run setup:db

# generate api doc
yarn run api

# update CHANGELOG.md
yarn run version
```

## CHANGELOG

[CHANGELOG]('./CHANGELOG.md')