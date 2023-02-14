/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title,
          menuLinks {
            name,
            link
          }
        }
      }
    }
  `)

  return (
    <>
      <Header menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />
      <div 
      >
        <main className="container mx-auto px-4">{children}</main>
        <footer className="text-sm mt-12">
            <div class="container mx-auto px-4 py-4">
          © {new Date().getFullYear()} &middot; Built by
          {` `}
          <a href="https://www.fastforward.sh">Fast Forward</a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout