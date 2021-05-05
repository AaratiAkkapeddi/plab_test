import { gql, useMutation } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation CreateComment($body: String!, $block_id: ID!) {
    create_comment(input: { body: $body, block_id: $block_id }) {
     
    }
  }
`;