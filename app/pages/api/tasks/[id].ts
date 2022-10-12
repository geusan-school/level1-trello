// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getOne } from "../../../server/tasks";

type Data = {
  name: string;
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
    case "put":
      // 수정 기능 호출
      res.status(200).json({ name: "수정 기능" });
      break;
    case "delete":
      // 삭제 기능 호출
      res.status(200).json({ name: "삭제 기능" });
      break;
    case "get":
      // 읽기 기능 호출
      const task = await getOne(Number(req.query.id));
      res.status(200).json(task);
      break;
  }
}
