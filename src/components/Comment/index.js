
import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import { onError } from "@apollo/client/link/error";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
// import blockLightboxCommentsFragment from '../../apollo/fragments/blockLightboxComments'
// This query is executed at run time by Apollo.
import { gql, useMutation, useQuery } from '@apollo/client';
const BlockQuery = gql`
  query BlockQuery($id: ID!) {
      blokk(id: $id){
          ... on Text {
            content(format: HTML, no_links: true)
            comments{
              body
            }
          }
          ... on Image {
            image_url
            comments{
              body
            }
          }
          ... on Link {
            href
            comments{
              body
            }
          }
          ... on Embed{
            embed_html
            comments{
              body
            }
          }
          ... on Attachment{
            file_url
            comments{
              body
            }
          }   
      }
    }  
`;

const ADD_COMMENT = gql`
  mutation CreateComment($body: String!, $block_id: ID!) {
    create_comment(input: { body: $body, block_id: $block_id }) {
      __typename
      comment {
        __typename
        id
      }
    }
  }

`;
function Meow(){
let { block } = useParams();
  const { loading, error, data } = useQuery(BlockQuery, {variables: {id: parseInt(block) }});
  console.log(data)
  if(data){
  let allComments = ""
    if(data.blokk.__typename == "Image"){
      if(data.blokk.comments){
        allComments = data.blokk.comments.map( (comment, index) => {
            return(
                <div className="resonance">{comment.body}</div>
              )
        })
      } 
      
      return (<div id={block} className='plain-block-comment'>
          <a href={"https://www.are.na/block/"+block}>{ReactHtmlParser(data.blokk.title || "Untitled")}</a>
          {data.blokk.image_url &&
        <img alt={data.blokk.title} src={data.blokk.image_url}/>
          }
          {allComments}
          </div>)
    } else if (data.blokk.__typename == "Text"){
       if(data.blokk.comments){
        allComments = data.blokk.comments.map( (comment, index) => {
            return(
                <div className="resonance">{comment.body}</div>
              )
        })
      } 
      return (<div id={block} className='plain-block'>
          <a href={"https://www.are.na/block/"+block}>{ReactHtmlParser(data.blokk.title || "Untitled")}</a>
          <div className='text-preview'><div className='text-preview-inner'>{ReactHtmlParser(data.blokk.content)}</div></div>
            {allComments}
          </div>)
    }else if(data.blokk.__typename=="Attachment"){
       if(data.blokk.comments){
        allComments = data.blokk.comments.map( (comment, index) => {
            return(
                <div className="resonance">{comment.body}</div>
              )
        })
      } 
      return (<div id={block} className='plain-block'>
          <a href={"https://www.are.na/block/"+block}>{ReactHtmlParser(data.blokk.title || "Untitled")}</a>
          {data.blokk.image_url &&
        <img alt={data.blokk.title} src={data.blokk.image_url}/>
          }
          {allComments}
          </div>)
    }else if(data.blokk.__typename=="Embed"){
       if(data.blokk.comments){
        allComments = data.blokk.comments.map( (comment, index) => {
            return(
                <div className="resonance">{comment.body}</div>
              )
        })
      } 
      return (<div id={block} className='plain-block'>
          <a href={"https://www.are.na/block/"+block}>{ReactHtmlParser(data.blokk.title || "Untitled")}</a>
          {data.blokk.image_url &&
        <img alt={data.blokk.title} src={data.blokk.image_url}/>
          }
          {allComments}
          </div>)
    }else if (data.blokk.__typename=="Link"){
       if(data.blokk.comments){
        allComments = data.blokk.comments.map( (comment, index) => {
            return(
                <div className="resonance">{comment.body}</div>
              )
        })
      } 
      return (<div id={block} className='plain-block'>
          <a href={"https://www.are.na/block/"+block}>{ReactHtmlParser(data.blokk.title || "Untitled")}</a>
          {data.blokk.image_url &&
        <img alt={data.blokk.title} src={data.blokk.image_url}/>
          }
          {allComments}
          </div>)
    } else{
      return(
        <h1>loading</h1>)
    }
  } else{
    return(<h1>loading</h1>)
  }
  
}

function Comment() {
  let input;
  let { block } = useParams();

  const [create_comment, {data }] = useMutation(ADD_COMMENT, { errorPolicy: 'all' });
 
  return (
    <div>
    <Meow/>
      <form
        onSubmit={e => {
          e.preventDefault();
     

          create_comment({ variables: { body: input.value, block_id:block} }).then(
            res => console.log(res),
            err => console.log(err)
          );;
          		 
          
          input.value = '';
          
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add a Resonance</button>
      </form>
    </div>
  );
}

export default Comment