import GlobalLayout from "@/component/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  const getLatout = Component.getLayout ?? ((page: ReactNode) => page);
  //?? ((page: ReactNode) => page) 해당 부분을 통해 getLayout이 적용 안되는 컴포넌트는 page로 그냥 통과 시킴
  return <GlobalLayout>{getLatout(<Component {...pageProps} />)}</GlobalLayout>;
}
