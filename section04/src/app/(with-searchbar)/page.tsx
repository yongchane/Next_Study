import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// export const dynamic =''
//  특정 페이지으 유형을 강제로 static,dynamic 페이지로 설정해주는 그러한 옵션
//1. auto: 기본값, 아무것도 강제하지 않음
//2. force-dynamic 페이지를 강제로 dynamic 페이지로 설정
//3. force-static 페이지를 강제로 static 페이지로 설정 -> 동적 경로를 undefind로, 캐쉬를 기본 값으로
// 4. error 페이지를 강제로 static 페이지 설정 (static으로 설정하면 안되는 이유(페이지 즉 동적함수 사용,캐싱되지 않는 데이터 패칭 존재)가 있다면 페이지가 오류로 발생함)

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류 발생!</div>;
  }
  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류 발생!</div>;
  }
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <AllBooks />
      </section>
    </div>
  );
}
