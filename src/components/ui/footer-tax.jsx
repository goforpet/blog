import React from 'react';
import '../../scss/components/ui/_post-thumb.scss';

export default function FooterTax({ taxId, vatId, registryId }) {
  if (taxId || vatId || registryId) {
    return (
      <dl>
        <FooterTaxVat taxId={taxId} vatId={vatId} />
        <FooterTaxRegistry registryId={registryId} />
      </dl>
    );
  } else {
    return null;
  }
}

export function FooterTaxVat({ vatId, taxId }) {
  if (taxId || vatId) {
    if (taxId === vatId) {
      return [ <dt key="tax-key">Codice Fiscale / Partita IVA</dt>, <dd key="tax-value">{vatId}</dd> ];
    } else {
      return [
        <dt key="tax-key">Codice Fiscale</dt>,
        <dd key="tax-value">{taxId}</dd>,
        <dt key="vat-key">Partita IVA</dt>,
        <dd key="vat-value">{vatId}</dd>
      ];
    }
  } else {
    return null;
  }
}

export function FooterTaxRegistry({ registryId }) {
  if (registryId) {
    return [ <dt key="registry-key">REA</dt>, <dd key="registry-value">{registryId}</dd> ];
  } else {
    return null;
  }
}
