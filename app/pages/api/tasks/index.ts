// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createOne, getList } from "../../../server/tasks";

type Data = {
  name: string;
  body: any;
};

/**
 * RESTful API 디자인
 * 1. 생성: POST /tasks
 * 2. 리스트 읽기: GET /tasks
 * 3. 수정하기: PUT /tasks/[id]
 * 4. 삭제하기: DELETE  /tasks/[id]
 * 5. 하나만 읽기: GET /tasks/[id]
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method?.toLowerCase()) {
    case 'post':
      // 생성 기능 호출
      const taskData = JSON.parse(req.body);
      const data = await createOne(taskData);
      res.status(200).json({ name: "생성 기능", body: data });
      break;
    case 'get':
      // 리스트 읽기 기능 호출
      const tasks = await getList();
      res.status(200).json(tasks);
      break;
  }
}
