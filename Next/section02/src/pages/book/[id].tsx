import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchone from "@/lib/fetch-one";
import { useRouter } from "next/router";

// 동적 경로는 사전 렌더링 전에 경로를 지정함(getStaticPaths를 통해)으로서 필요한 페이지 수 만큼 ssg 시킨다
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } }, // url 파라미터는 반드시 문자열로
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // 대비책으로 위에서 미리 설정하지 않은 페이지로 접속시 대비책을 설정,
    // false로 지정하지 않은 페이지는 Not found됌
    // "blocking"은 미리 지정하지 않는 경로가 실행시 ssr 로 실행이 됨
    // true는 먼저 getstaticprops를 실행하지 않는 페이지를 반환하고 그리고 getstaticprops를 적용하여 렌더링 시킴
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; //!로 undefind가 안일어나게 막음
  const book = await fetchone(Number(id));

  // book이 전달되지 않았으면 404 페이지로 연결시킴
  if (!book) {
    return {
      notFound: true,
    };
  }
  console.log(id);
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // page 컴포넌트가 아직 서버로부터 데이터를 받지 못한 상태를 fallback상태라고 한다
  if (router.isFallback) return "로딩중 입니다."; // fallback 상태일때 즉 로딩중일때

  if (!book) return "다시 시도해주세요"; // 오류일때
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
