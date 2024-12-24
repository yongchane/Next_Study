import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./search.module.css";
export default function SearchLayout({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  // React.ChangeEvent<HTMLInputElement> 리액트에서 발생한 채인지 이벤트인데 html input 태그에서 발생한 이벤트 타입
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  // as string 으로 q의 타입 지정
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      onSubmit();
    }
  };
  return (
    <div>
      <div className={style.container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어 입력"
        ></input>
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
