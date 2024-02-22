import typeorm from "typeorm";

const EntitySchema = typeorm.EntitySchema;

export default new EntitySchema({
  name: "resumes", //참조할 테이블이름
  tableName: "resumes", // 실제 테이블이름
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    user_id: {
      type: "int",
    },
    title: {
      type: "varchar",
    },
    context: {
      type: "varchar",
    },
    status: {
      type: "varchar",
      enum: ["APPLY", "DROP", "PASS", "INTERVIEW1", "INTERVIEW2", "FINAL_PASS"],
      default: "APPLY",
    },
    createdAt: {
      type: "datetime",
    },
    updatedAt: {
      type: "datetime",
    },
  },

  relations: {
    users: {
      target: "users", // 참조할 테이블 이름
      type: "many-to-one", // 관계설정 (n:1)
      joinColumn: { name: "id" },
      joinTable: true,
      cascade: true,
    },
  },
});
