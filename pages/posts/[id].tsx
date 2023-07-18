// /pages/posts/[id].jsページを作成。
//必要なもの(reactコンポーネント、getStaticPaths, getStaticProps)

import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

import Head from "next/head";
import Date from "../../components/date";

import utilStyles from "../../styles/utils.module.css";

interface GetStaticPropsParams {
  params: any;
}

interface PostData {
  id: string;
  contentHTML: string;
}

interface GetStaticPropsResult {
  props: {
    postData: PostData;
  };
}

interface PostDataMain {
  id: string;
  contentHTML: string;
  title: string;
  date: string;
  thumbnail: string;
}

interface postProps {
  postData: PostDataMain;
}

//動的ルーティング設定のための関数。pathsがルーティング設定になっている(開発環境なら毎回リクエスト時に実行される、本番環境ならビルド時だけ実行される。)。
//idがとりうる値のリストを返す
export async function getStaticPaths() {
  //ブログ投稿データのファイル名(id)を取得。
  const paths = getAllPostIds();

  return {
    paths, //どのパスが事前にレンダリングされるのか決める。
    fallback: false, //あとで説明。(falseにすると、上のpathsに含まれてないあらゆるパスはアクセスすると404ページになる。)
  };
}

//SSG(id(ファイル名)に基づいて必要なデータを取得)
export async function getStaticProps({ params }: GetStaticPropsParams) {
  const postData = await getPostData(params.id); //あとでasyncとawaitをつける。

  console.log(postData);
  return {
    props: {
      postData,
    },
  };
}

export default function Post(postDataArr: postProps) {
  return (
    <Layout>
      <Head>
        <title>{postDataArr.postData.title}</title>
      </Head>
      {/* ... */}

      {/* {postData.title}
      <br />
      {postData.id}
      <br /> */}
      {/* {postData.date} */}
      {/* <Date dateString={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} /> */}

      <article>
        <h1 className={utilStyles.headingXl}>{postDataArr.postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postDataArr.postData.date} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: postDataArr.postData.contentHTML }}
        />
      </article>
    </Layout>
  );
}
