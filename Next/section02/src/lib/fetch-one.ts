import { BookData } from "@/types";

//<BookData | null> 실패하면 null값이 반환 될 수 있기 떄문에

export default async function fetchone(id: number): Promise<BookData | null> {
  const url = `http://localhost:12345/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return null; // 찾는데 없으면 null값을 반환하게 함
  }
}
