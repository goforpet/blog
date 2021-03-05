import React from "react"
import "../../scss/components/ui/_post-thumb.scss"

export default function FooterTax({ taxId, vatId, registryId }) {
  if (taxId || vatId || registryId) {
    return (
      <dl>
        <FooterTaxVat />
        <FooterTaxRegistry registryId={registryId} />
      </dl>
    )
  } else {
    return null
  }
}

export function FooterTaxVat({ vatId, taxId }) {
  if (taxId || vatId) {
    if (taxId === vatId) {
      return (
        <>
          <dt>Codice Fiscale / Partita IVA</dt>
          <dd>{vatId}</dd>
        </>
      )
    } else {
      return (
        <>
          <dt>Codice Fiscale</dt>
          <dd>{taxId}</dd>
          <dt>Partita IVA</dt>
          <dd>{vatId}</dd>
        </>
      )
    }
  } else {
    return null
  }
}

export function FooterTaxRegistry({ registryId }) {
  if (registryId) {
    return (
      <>
        <dt>REA</dt>
        <dd>{registryId}</dd>
      </>
    )
  } else {
    return null
  }
}
