import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getPosts } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        {/* <h2 className={utilStyles.headingLg}>DTS Ghost Test Blog</h2> */}

        <ul className={utilStyles.list}>
          {allPostsData.posts.map(({ id, published_at, slug, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <a>{slug}</a>
              </small>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={published_at} />
              </small>
            </li>
          ))}
        </ul>

      </section>

    </Layout>
  )
}


export async function getStaticProps() {
  const { allPostsData, errorCode } = await getPosts()

  console.log(allPostsData.posts[0])

  return {
    props: {
      allPostsData
    }
  }
}
