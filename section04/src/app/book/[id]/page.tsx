import { notFound } from "next/navigation";
import style from "./page.module.css";

// export const dynamicParams =false; -> 아래에 generateStaticParams로 선언하지 않은 페이지에 접속하명 404 페이지가 되게 설정, 기본 값은 true임

// 정적 페이지를 선언함으로서 빌드 타임에 미리 생성하게 만듬 (풀 라우트 캐시를 이용하기 위해)
// 안에 문자열로 적어야하고, 해당 선언한 페이지는 정적인 페이지로 설정이 됨
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`
  );

  if (!response.ok) {
    if (response.status == 404) {
      notFound();
    }
    return <div>오류 발생!</div>;
  }

  const book = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
