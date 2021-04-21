import gql from 'graphql-tag'

import blockLightboxMetadataPaneFragment from './blockLightboxMetadataPane'
import blockLightboxContentPaneFragment from './blockLightboxContentPane'

export default gql`
  fragment BlockLightbox on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      title
    }
    ...BlockLightboxContentPane
    ...BlockLightboxMetadataPane
  }
  ${blockLightboxContentPaneFragment}
  ${blockLightboxMetadataPaneFragment}
`