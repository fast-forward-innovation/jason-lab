import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

export default function Home({data}) {
  const { title, description } = data.site.siteMetadata
  
  return <div className="container mx-auto px-4">
      <h1>{ title }</h1>
      <p>{description}</p>
      <p><Link to="/blog">Read my blog</Link></p>
      <p><StaticImage src="../images/2299546387_d521531617_o.jpg" alt="Fancy patter image" /></p>
    </div>
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