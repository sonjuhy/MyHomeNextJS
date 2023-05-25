import styles from "./SideBar.module.css";
import Link from "next/link"

export default function RootLayout() {
  return (
    <div>
        <div className={`${styles.sidebar}`}>
            <Link href="/">Home</Link>
            <Link href="/news">News</Link>
            <Link href="/contact">Contact</Link>
        </div>
        <div className={`${styles.content}`}>
            <h1>Page</h1>
          {/* {Component} */}
        </div>
    </div>
  )
}