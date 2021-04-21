
import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import { onError } from "@apollo/client/link/error";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import blockLightboxCommentsFragment from '../../apollo/fragments/blockLightboxComments'
// This query is executed at run time by Apollo.
import { gql, useMutation } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation CreateComment($body: String!, $block_id: ID!) {
    create_comment(input: { body: $body, block_id: $block_id }) {
      __typename
      comment {
        __typename
        id
        commentable {
          ...BlockLightboxComments
        }
      }
    }
  }
  ${blockLightboxCommentsFragment}
`;


function Comment() {
  let input;
  const [create_comment, {error, data }] = useMutation(ADD_COMMENT, { errorPolicy: 'all' });
   console.log(error)
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
     

          create_comment({ variables: { body: input.value, block_id:11596969} });
		 
          
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default Comment