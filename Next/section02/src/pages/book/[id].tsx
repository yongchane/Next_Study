import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchone from "@/lib/fetch-one";

// 동적 경로는 사전 렌더링 전에 경로를 지정함(getStaticPaths를 통해)으로서 필요한 페이지 수 만큼 ssg 시킨다
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } }, // url 파라미터는 반드시 문자열로
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false, // 대비책으로 위에서 미리 설정하지 않은 페이지로 접속시 대비책을 설정, false로 지정하지 않은 페이지는 Not found됌
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; //!로 undefind가 안일어나게 막음
  const book = await fetchone(Number(id));
  console.log(id);
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) return "다시 시도해주세요";
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
