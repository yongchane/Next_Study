import SearchLayout from "@/component/search-layout";
import { ReactNode } from "react";

export default function Page() {
  return <h1>search</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
