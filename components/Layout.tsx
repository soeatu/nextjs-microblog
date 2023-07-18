import styles from "./layout.module.css";
import React, { useState, useEffect, ReactNode } from "react";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Blogs";
export const siteTitle = "Next.js Blog";

type LayoutProps = {
  children: ReactNode;
  home?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {/* home画面のときは画像を大きくする */}
        {home ? (
          <>
            <img
              src="/images/cat.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <img
                src="/images/cat.jpg"
                alt=""
                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link legacyBehavior href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
