import typeorm from "typeorm";

const EntitySchema = typeorm.EntitySchema;

export default new EntitySchema({
  name: "users", //참조할 테이블이름
  tableName: "users", // 실제 테이블이름
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    userName: {
      type: "varchar",
    },
    role: {
      type: "varchar",
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    token: {
      type: "varchar",
      nullable: true,
    },
  },
});
