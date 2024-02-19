import { EntitySchema } from "typeorm";
import { Post } from "../model/Post.js";
import { Category } from "../model/Category.js";

const PostSchema = new EntitySchema({
  name: "Post",
  target: Post,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    text: {
      type: "text",
    },
  },
  relations: {
    categories: {
      target: "Category",
      type: "many-to-many",
      joinTable: true,
      cascade: true,
    },
  },
});

export default PostSchema;
