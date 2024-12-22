import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/test");
  };

  useEffect(
    () => {
      router.prefetch("/test");
    } // 어떤 페이지를 prefetch할건지 정해주면 됌
  );

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        <Link href={"/search"}>search</Link>
      </header>
      <button onClick={onClickHandler}> 클릭</button>
      &nbsp;
      <Component {...pageProps} />
    </>
  );
}
