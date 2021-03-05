import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import FooterTax from "../ui/footer-tax"

import "../../scss/components/element/_footer.scss"

export default function Footer() {
  const { site, siteBuildMetadata, pages } = useStaticQuery(
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
        siteBuildMetadata {
          fields {
            seo {
              socials {
                instagram {
                  username
                }
                facebook {
                  page
                }
              }
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

  const owner = site.siteMetadata.organization
  const seo = siteBuildMetadata.fields.seo
  let socials = []

  if (seo.socials.instagram.username) {
    socials.push({
      social: "Instagram",
      url: new URL(seo.socials.instagram.username, "https://www.instagram.com/")
        .href,
      icon: "instagram",
    })
  }

  if (seo.socials.facebook.page) {
    socials.push({
      social: "Facebook",
      url: new URL(seo.socials.facebook.page, "https://www.facebook.com/").href,
      icon: "facebook",
    })
  }

  return (
    <footer
      className="footer"
      itemScope
      itemType="http://schema.org/Organization"
    >
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <div className="logo">
              <i className="icon-goforpet-logo"></i>
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
          <div className="column is-one-third">
            {owner.email && (
              <aside className="menu">
                <p className="menu-label">Note Legali</p>
                <ul className="menu-list">
                  <li itemProp="contactPoint">
                    <a
                      href={"mailto:" + owner.email}
                      itemProp="email"
                      title="E-Mail"
                    >
                      <span className="icon">
                        <i className="icon-goforpet-mail"></i>
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
                    const slug = "/pages/" + page.slug

                    return (
                      <li key={index}>
                        <Link to={slug}>{page.title}</Link>
                      </li>
                    )
                  })}
                </ul>
              </aside>
            )}
          </div>
          {socials && (
            <div className="column is-one-third social-follow">
              <h3>Seguici</h3>
              <ul>
                {socials.map((social, index) => {
                  return (
                    <li key={index}>
                      <a href={social.url}>
                        <i className={"icon-goforpet-" + social.icon}>
                          <span>{social.social}</span>
                        </i>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
