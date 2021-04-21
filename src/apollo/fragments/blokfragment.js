import { gql } from '@apollo/client';
export const CORE_BLOKK_FIELDS = gql`
  fragment CoreBlokkFields on Blokk {
    id
    content(format: HTML, no_links: true)
    file_url
    image_url
    embed_html
    href
  }
`;
export const CORE_TEXT_FIELDS = gql`
  fragment CoreTextFields on Text {
    id
    content(format: HTML, no_links: true)
    href
  }
`;

export const CORE_IMAGE_FIELDS = gql`
  fragment CoreImageFields on Image {
    id
    image_url
    href
  }
`;

export const CORE_LINK_FIELDS = gql`
  fragment CoreLinkFields on Link {
    id
    image_url
    href
  }
`;

export const CORE_EMBED_FIELDS = gql`
  fragment CoreEmbedFields on Embed {
    id
    image_url
    embed_html
    href
  }
`;

export const CORE_ATTACHMENT_FIELDS = gql`
  fragment CoreAttachmentFields on Attachment {
    id
    file_url
    image_url
    href
  }
`;