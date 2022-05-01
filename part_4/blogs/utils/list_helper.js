const _ = require("lodash")

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce((p, b) => p + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  const fav = blogs.reduce((p, b) => (p.likes >= b.likes ? p : b), blogs[0])
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  }
}

const mostBlogs = (blogs) => {
  const obj = _.countBy(blogs, "author")
  // console.log(obj)
  const ls = Object.keys(obj).map((key) => {
    return {
      author: key,
      blogs: obj[key],
    }
  })
  // console.log(ls)
  const most = ls.reduce((p, a) => (a.blogs >= p.blogs ? a : p), ls[0])
  return most
}

const mostLikes = (blogs) => {
  const blogsGroupedByAuthor = _.groupBy(blogs, "author")
  //console.log(blogsGroupedByAuthor)
  const totalLikesByAuthor = Object.keys(blogsGroupedByAuthor).map((key) => {
    const blogsOfAuthor = blogsGroupedByAuthor[key]
    //console.log(`${key}'s blogs: ${JSON.stringify(blogsOfAuthor)}`)
    const rv = blogsOfAuthor.reduce((p, b) => p + b.likes, 0)
    //console.log(rv)
    return {
      author: key,
      likes: rv,
    }
  })
  // console.log(totalLikesByAuthor)
  const rv = totalLikesByAuthor.reduce(
    (p, a) => (a.likes >= p.likes ? a : p),
    totalLikesByAuthor[0]
  )
  // console.log("RV:", rv)
  return rv
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
