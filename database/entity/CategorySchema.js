import { EntitySchema } from "typeorm";
import { Category } from "../model/Category.js";

const CategorySchema = new EntitySchema({
  name: "Category",
  target: Category,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
});

export default CategorySchema;
