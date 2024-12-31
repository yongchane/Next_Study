// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";

import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchbook from "@/lib/fetch-books";
import fetchrandom from "@/lib/fetch-random";

// next에서 약속한 함수로 ssr을 수행하기 위한 컴포넌트
// ->해당home컴포넌트보다 먼저 실행이 되서 필요한 데이터를 미리 불러옴
// 1. 해당 경로로 요청이 들어왔을때
// 2. getServerSideProps가 작동을해서 필요 데이터를 가져옴
// 3. 해당 page 컴포넌트가 실행이 됨
export const getStaticProps = async () => {
  // getServerSideProps는 사전 렌더링을 하는 그과정에서 딱 한번만 실행이 됨(오직 서버측에서만 실행)
  // window와 같은 브라우저에서 실행되는건 안됌
  //getServerSideProps는 객체를 반환 해야하는데 Props를 통해 반환함
  console.log("인덱스 페이지");
  const [allbooks, recombooks] = await Promise.all([
    fetchbook(),
    fetchrandom(),
  ]);
  // const allbooks = await fetchbook()가 아닌 위와 같이 병렬로 코드 수정함

  return {
    props: { allbooks, recombooks },
    // revalidate는 재검증하다는 뜻으로 isr을 적용시키는 코드임 몇초 주기인지 명시해서 사용함
  };
};

// Next의 경우 사전 렌더링 때문에 서버,브라우저 통 2번 렌더링 됨
// 그래서 window와 같은 브라우저에서만 실행되는걸 원하면 useEffect를 사용
// InferGetServerSidePropsType<typeof getServerSideProps> -> getServerSideProps의 타입
// InferGetServerSidePropsType로 데이터 타입을 자동으로 추론 가능
export default function Home({
  allbooks,
  recombooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("책들", allbooks);
  useEffect(() => {}, []);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recombooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allbooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
