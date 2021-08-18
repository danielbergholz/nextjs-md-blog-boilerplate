import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getPosts, IPost } from '../utils/posts'

interface IProps {
  posts: IPost[]
}

const Home: NextPage<IProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Blog page</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <h1>Blog estático com Next.js!</h1>

      {posts.map((post, index) => (
        <Link key={index} href={`/${post.slug}`}>
          <a>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = () => {
  // read markdown files
  const posts = getPosts()

  // return posts
  return {
    props: {
      posts,
    },
  }
}
