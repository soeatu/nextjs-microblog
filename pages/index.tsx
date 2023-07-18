import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/posts";

import Link from "next/link";
//import Date from "../components/date";

interface PostData {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
}
interface HomeProps {
  allPostsData: PostData[];
}

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getSortedPostsData(); //mdファイルのid,titel,date,thumbnailを取得
  console.debug(allPostsData);
  return {
    props: {
      allPostsData, //これをHomeに渡す
    },
  };
}

//SSRの場合(contextにはrequestされたときのパラメータが入る)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

const Home: React.FC<HomeProps> = ({ allPostsData }) => {
  return (
    <Layout home>
      <Head>
        <title>siteTitle</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>ブログです。</p>
        {/* <Link href="/posts/first-post">最初の投稿はこちら</Link>  あとで外す*/}
      </section>

      {/* gridで表示したい */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>📝エンジニアのブログ</h2>
      </section>
      <div className={`${styles.grid}`}>
        {/* 1つ１つのブログをdivで生成してgrid適用させる */}
        {allPostsData.map(({ id, date, title, thumbnail }) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img
                src={`${thumbnail}`}
                className={`${styles.thumbnailImage}`}
              />
            </Link>
            <Link legacyBehavior href={`/posts/${id}`}>
              <a className={utilStyles.boldText}>{title}</a>
            </Link>
            {/* {title} */}
            <br />
            {/* {id}
              <br />
              {date} */}
            <small className={utilStyles.lightText}>
              {/* <Date dateString={date} /> */}
            </small>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
