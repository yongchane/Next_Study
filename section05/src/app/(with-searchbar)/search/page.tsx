import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류 발생!</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <Suspense key={searchParams.q || ""} fallback={<div>로딩중</div>}>
      {" "}
      {/* key 값에 따라 로딩 상태로 돌아가게 선언 */}
      <SearchResult q={searchParams.q || ""} />{" "}
      {/*  스트리밍할 수 있게 react suspense를 사용하여 만듬 */}
    </Suspense>
  );
}
