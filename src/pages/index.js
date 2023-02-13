import * as React from "react"
import { graphql, Link } from "gatsby"

export default function Home({data}) {
  const { title, description } = data.site.siteMetadata

  return <div className="container mx-auto px-4">
    <h1 className="text-3xl font-bold underline font-serif">{ title }</h1>
    <p className="font-thin">{description}</p>
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