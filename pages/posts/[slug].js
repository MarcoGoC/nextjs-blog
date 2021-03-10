import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import { getPost } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {

  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout>
        <h1>Page is loading ...</h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.published_at} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.html }} />
      </article>
    </Layout>
  )
}


export async function getStaticPaths() {

  // paths -> slugs which are allowed
  // fallback -> true === try to fire getStaticProps anyways

  return {
    paths: [],
    fallback: true
  }
}


export async function getStaticProps({ params }) {
  const { postData, errorCode } = await getPost(params.slug)

  console.log(postData)

  return {
    props: {
      postData
    }
  }
}
