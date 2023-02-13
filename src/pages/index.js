import * as React from "react"
import { graphql, Link } from "gatsby"

export default function Home({data}) {
  const { title, description } = data.site.siteMetadata

  return <div>
    <h1>{ title }</h1>
    <p>{description}</p>
    <p><Link to="/blog">Read my blog</Link></p>
    <img alt="Cute dog" src={data.image.publicURL} />
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