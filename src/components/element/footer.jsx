import React from "react"
import classnames from "classnames"
import { graphql, useStaticQuery, Link } from "gatsby"
import { SocialFollow } from "@pittica/gatsby-plugin-seo"
import { Credits } from "@pittica/art"

import FooterTax from "../ui/footer-tax"

import "../../scss/components/element/_footer.scss"

export default function Footer() {
  const {
    site: { siteMetadata },
    pages,
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            organization {
              company
              address
              zipCode
              city
              province
              country
              email
              taxId
              vatId
              registryId
            }
            locale {
              language
              culture
            }
          }
        }
        pages: allGraphCmsPage(filter: { menu: { eq: false } }) {
          nodes {
            id
            slug
            title
          }
        }
      }
    `
  )

  const owner = siteMetadata.organization

  return (
    <footer
      className="footer"
      itemScope
      itemType="http://schema.org/Organization"
    >
      <div className="container">
        <div className="columns">
          <div className={classnames("column", "is-one-third")}>
            <div className="logo">
              <i className="icon-goforpet-logo" />
            </div>
            <h3 className="company" itemProp="legalName">
              {owner.company}
            </h3>
            <div>
              <ul itemProp="location">
                <li itemProp="streetAddress">{owner.address}</li>
                <li>
                  <span itemProp="postalCode">{owner.zipCode}</span>{" "}
                  <span itemProp="addressLocality">{owner.city}</span> (
                  <span itemProp="addressRegion">{owner.province}</span>)
                </li>
                <li itemProp="addressCountry">{owner.country}</li>
              </ul>
            </div>
            <FooterTax {...owner} />
          </div>
          <div className={classnames("column", "is-one-third")}>
            {owner.email && (
              <aside className="menu">
                <p className="menu-label">Contatti</p>
                <ul className="menu-list">
                  <li itemProp="contactPoint">
                    <a
                      href={`mailto:${owner.email}`}
                      itemProp="email"
                      title="E-Mail"
                    >
                      <span className="icon">
                        <i className="icon-goforpet-mail" />
                      </span>
                      {owner.email}
                    </a>
                  </li>
                </ul>
              </aside>
            )}
            {pages.nodes.length > 0 && (
              <aside className="menu">
                <p className="menu-label">Note Legali</p>
                <ul className="menu-list">
                  {pages.nodes.map((page, index) => {
                    return (
                      <li key={index}>
                        <Link to={`/pages/${page.slug}`}>{page.title}</Link>
                      </li>
                    )
                  })}
                </ul>
              </aside>
            )}
          </div>
          <div className={classnames("column", "is-one-third")}>
            <h3 className="title">Seguici</h3>
            <SocialFollow />
          </div>
        </div>
        <div className="columns">
          <div className={classNames("column", "is-three-fifths")}>
            © {new Date().getFullYear()}, {organization.company}
          </div>
          <div className={classNames("column", "is-two-fifths")}>
            <Credits />
          </div>
        </div>
      </div>
    </footer>
  )
}
