import * as typeorm from "typeorm";
import { Post } from "../database/model/Post.js";
import { Category } from "../database/model/Category.js";
import PostSchema from "../database/entity/PostSchema.js";
import CategorySchema from "../database/entity/CategorySchema.js";

typeorm
  .createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [PostSchema, CategorySchema],
  })
  .then(function (connection) {
    console.log("DB에 연결되었습니다.");
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
