import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "../../scss/components/section/_body-content.scss"

export default function BodyContent({ children }) {
  return (
    <section className="section">
      <div className="container">
        <div className="body-content">
          <MDXRenderer>{children}</MDXRenderer>
        </div>
      </div>
    </section>
  )
}
