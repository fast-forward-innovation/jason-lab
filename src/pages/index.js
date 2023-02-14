import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

export default function Home({data}) {
  const { title, description } = data.site.siteMetadata
  
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1>{ title }</h1>
        <p>{description}</p>
        <p><Link to="/blog">Read my blog</Link></p>
        <p><div className="max-w-md mx-auto"><StaticImage src="../images/2299546387_d521531617_o.jpg" alt="Fancy patter image"/></div></p>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query MetadataQuery {
    site {
      siteMetadata {
        title
        description
      }
    }

    image: file(base: { eq: "2299546387_d521531617_o.jpg" }) {
      publicURL
    }
  }
`