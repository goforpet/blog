import React from "react"
import { useLocation } from "@reach/router"
import { initializeAndTrack } from "gatsby-plugin-gdpr-cookies"
import { consent } from "@pittica/gatsby-plugin-cookiehub"

import Header from "./header"
import Footer from "./footer"

import "../../scss/components/element/_body.scss"

export default function Body({ children }) {
  const location = useLocation()

  consent(() => initializeAndTrack(location))

  return (
    <div className="body">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
