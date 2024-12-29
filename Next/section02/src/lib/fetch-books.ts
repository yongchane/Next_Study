import { BookData } from "@/types";
// promise 비동기 반환 함수 받는 타입/ bookdata[] -> bookdata를 여러개 받기 위해서
export default async function fetchbook(q?: string): Promise<BookData[]> {
  let url = `http://localhost:12345/book`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    console.log("응답", response);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
