import { ReactNode } from "react";
import style from "./index.module.css";
import SearchLayout from "@/component/search-layout";

export default function Home() {
  return <h1 className={style.h1}>인덱스</h1>;
}

// getLayout을 통해 특정 컴포넌트만 랜더링 원하는 컴포넌트를 선언하고 상위 컴포넌트에서 꺼내서 전역 설정이 가능하다
Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
