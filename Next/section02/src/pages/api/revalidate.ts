import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("revalidate failed");
  }
}

// 해당 컴포넌트가 실행이 되면 "/"경로의 컴포넌트가 res.revalidate("/");를 통해 On-Demand ISR가 적용이 됨
