import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "../../../Next/section02/src/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }
  const books: BookData[] = await response.json();

  const bookNum = books.length;

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookNum}</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
