import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'


//const postsDirectory = path.join(process.cwd(), 'posts')

const { NEXTJS_CONTENT_API_KEY, NEXTJS_CONTENT_URL } = process.env

//
// Fetch ALL posts from ghost 
//

export async function getPosts(url) {

  const res = await fetch(`${NEXTJS_CONTENT_URL}/ghost/api/v3/content/posts/?key=${NEXTJS_CONTENT_API_KEY}&fields=title,id,slug,published_at`)

  const errorCode = res.ok ? false : res.statusCode
  const allPostsData = await res.json()

  return { allPostsData, errorCode }
}


//
// Fetch a post from ghost using the slug 
//

export async function getPost(slug) {

  const res = await fetch(`${NEXTJS_CONTENT_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${NEXTJS_CONTENT_API_KEY}&fields=title,slug,html,published_at`)

  const errorCode = res.ok ? false : res.statusCode
  const allData = await res.json()
  const postData = allData.posts[0]

  return { postData, errorCode }
}




export function OLD_getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}


export function OLD_getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}


export async function OLD_getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

