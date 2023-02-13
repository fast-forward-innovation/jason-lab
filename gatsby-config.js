/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: 'Jason Yarrington\'s blog',
    description: 'Coding experiments and new tools.'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/blog/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-postcss'
  ],
}
