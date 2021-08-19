import Head from "next/head";
import styles from "../styles/modules/layout.module.css";

const siteTitle = "Tic Tac Toe"

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <main className={styles.layout}>
                {children}
            </main>
        </>
    );
}