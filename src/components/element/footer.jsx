import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

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

  let tax = []

  if (owner.taxId || owner.vatId) {
    if (owner.taxId === owner.vatId) {
      tax.push({
        term: "Codice Fiscale / Partita IVA",
        definition: owner.vatId,
        prop: "vatID",
      })
    } else {
      tax.push({
        term: "Codice Fiscale",
        definition: owner.vatId,
        prop: "taxID",
      })
      tax.push({
        term: "Partita IVA",
        definition: owner.taxId,
        prop: "vatID",
      })
    }
  }

  if (owner.registryId) {
    tax.push({
      term: "REA",
      definition: owner.registryId,
      prop: null,
    })
  }

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
            <h3 itemProp="legalName">{owner.company}</h3>
            <div>
              <dl itemProp="location">
                <dd itemProp="streetAddress">{owner.address}</dd>
                <dd>
                  <span itemProp="postalCode">{owner.zipCode}</span>{" "}
                  <span itemProp="addressLocality">{owner.city}</span> (
                  <span itemProp="addressRegion">{owner.province}</span>)
                </dd>
                <dd itemProp="addressCountry">{owner.country}</dd>
              </dl>
            </div>
            {tax && (
              <ul>
                {tax.map((d, index) => {
                  return (
                    <li key={index}>
                      <dt>{d.term}</dt>
                      <dd itemProp={d.prop}>{d.definition}</dd>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <div className="column is-one-third">
            <aside className="menu">
              {owner.email && (
                <>
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
                </>
              )}
              {pages.nodes.length > 0 && (
                <>
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
                </>
              )}
            </aside>
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
