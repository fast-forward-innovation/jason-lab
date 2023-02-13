import * as React from "react"
import { graphql, Link } from "gatsby"

export default function Blog({ data }) {
    const { posts } = data.blog
    
    return (
        <div>
            <h1>Blog Roll</h1>

            {posts.map(post => (
                <article key={post.id}>
                <Link to={'/blog' + post.fields.slug}>
                    <h2>{post.frontmatter.title}</h2>
                    </Link>
                    <small>{post.frontmatter.author}, {post.frontmatter.date}</small>
                    <div>{post.excerpt}</div>
                </article>
            ))}
        </div>
    )
}

export const pageQuery = graphql`
    query Query {
        blog: allMarkdownRemark {
            posts: nodes {
                fields {
                    slug
                }
                frontmatter {
                    date(fromNow: true)
                    title
                    author
                }
                excerpt
                id
            }
        }
    }
`