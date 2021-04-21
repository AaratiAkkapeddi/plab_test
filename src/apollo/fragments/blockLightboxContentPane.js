import gql from 'graphql-tag'

import blockLightboxImageFragment from './blockLightboxImage'
import blockLightboxTextFragment from './blockLightboxText'
import blockLightboxLinkFragment from './blockLightboxLink'
import blockLightboxAttachmentFragment from './blockLightboxAttachment'
import blockLightboxEmbedFragment from './blockLightboxEmbed'

export default gql`
  fragment BlockLightboxContentPane on Konnectable {
    ...BlockLightboxImage
    ...BlockLightboxText
    ...BlockLightboxLink
    ...BlockLightboxAttachment
    ...BlockLightboxEmbed
  }
  ${blockLightboxImageFragment}
  ${blockLightboxTextFragment}
  ${blockLightboxLinkFragment}
  ${blockLightboxAttachmentFragment}
  ${blockLightboxEmbedFragment}
`
