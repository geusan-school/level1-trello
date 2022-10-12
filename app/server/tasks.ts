import mysql from "mysql";

const createConnect = (): Promise<mysql.Connection> => new Promise((resolve, reject) => {
  const connection = mysql.createConnection({
    host: "geusan-db.cvbvu7kjngtu.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "trello",
  });
  connection.connect((err) => {
    if (err) reject(err);
    resolve(connection);
  });
});

const query = (
  connection: mysql.Connection,
  sql: Parameters<mysql.QueryFunction>[0],
  data: Parameters<mysql.QueryFunction>[1]
): Promise<any> => new Promise((resolve, reject) => {
  connection.query(sql, data, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

type TTask = {
  title: string;
  description: string;
  id: number;
  section: number;
  priority: number;
};

function transform(item: any) {
  return {
    title: item.title,
    description: item.description,
    id: item.id,
    section: item.section,
    priority: item.priority,
  };
}

export async function getList() {
  const connection = await createConnect();
  const result = await query(connection, 'SELECT * FROM tasks', {});
  connection.destroy();
  const transformed = result.map(transform);
  console.log(transformed);
  return transformed;
}

export async function getOne(id: number) {
  const connection = await createConnect();
  const result = await query(connection, `SELECT * FROM tasks WHERE id = ${id}`, {});
  connection.destroy();
  const transformed = result.map(transform);
  return transformed[0];
}

export async function createOne(taskData: any) {
  const connection = await createConnect();
  const result = await query(
    connection,
    `INSERT INTO tasks (title, description, section, priority) VALUES ('${taskData.title}', '${taskData.description}', ${taskData.section}, 0)`,
    {}
  );
  connection.destroy();
  const created = await getOne(result.insertId);
  return transform(created);
}
