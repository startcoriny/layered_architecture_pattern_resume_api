import typeorm from "typeorm";
import dotenv from "dotenv";
import entityResume from "./entity/resume.entity.js";
import entityUser from "./entity/user.entity.js";
dotenv.config();

const dataSource = new typeorm.DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "layered_architecture_pattern_db",
  synchronize: false,
  entities: [entityResume, entityUser],
});

// typeorm 초기화
dataSource.initialize();

export default dataSource;
