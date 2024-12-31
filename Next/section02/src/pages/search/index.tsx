import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import BookItem from "@/components/book-item";
import fetchbook from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";
//context라는 매개변수에는 현재 브라우저로부터 받은 요청에 대한 모든 정보가 다 포함이 되어있음 -> 검색 결과 q를 불러올거임
// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const q = context.query.q;  //ssg는 빌드 타임에 사전 렌더링 되므로 GetStaticPropsContext에서 query속성이 없다
//   const books = await fetchbook(q as string);
//   return {
//     props: { books },
//   };
// };

// 기본적으로 next는 ssr,ssg를 선언하지 않으면 정적페이지로 정의하기 떄문에 해당 페이지는 ssg방식으로 동작이 됨 -> num run build시 static이라고 선언됨

export default function Page() {
  const [books, setBooks] = useState<BookData[]>();

  const router = useRouter();
  const q = router.query.q;

  const fetchBooks = async () => {
    const data = await fetchbook(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchBooks();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입 북스 - 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 북스 -검색 결과" />
        <meta property="og:title" content="한입 북스 도서를 만나보세요" />
      </Head>
      {books?.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
