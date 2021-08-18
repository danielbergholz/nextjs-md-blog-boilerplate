import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface IPost {
  title: string
  date: string
  slug: string
  content: string
}

interface IMatterData {
  title: string
  date: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPosts() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      content: matterResult.content,
      ...(matterResult.data as IMatterData),
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getPostBySlug(findSlug: string) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)

  // Find file by slug name
  const file = fileNames.find((fileName) => fileName.includes(findSlug))

  if (!file) return null

  // Remove ".md" from file name to get slug
  const slug = file.replace(/\.md$/, '')

  // Read markdown file as string
  const fullPath = path.join(postsDirectory, file)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the slug
  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as IMatterData),
  }
}

export function getPostsSlugs() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
}
