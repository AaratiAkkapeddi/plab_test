import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { gql, useMutation, useQuery } from '@apollo/client';
import Arena from "are.na"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

let arena = new Arena({ accessToken: process.env.REACT_APP_ARENA_ACCESS_TOKEN });
const GetBlocks = gql`
query GetBlocks {
      channel(id: "poetics-lab-site") {
        blokks(per: 100){
          ... on Text {
            id
            href
            title
            content
            comments{
              body
            }
          }
          ... on Image {
            id
            href
            title
            image_url
            comments{
              body
            }
          }
          ... on Link {
            id
            href
            title
            image_url
            comments{
              body
            }
          }
          ... on Embed {
            id
            href
            title
            image_url
            comments{
              body
            }
          }
          ... on Attachment {
            id
            href
            title
            image_url
            comments{
              body
            }
          }
          ... on Channel {
            id
            href
            title
            counts{
              blocks
              channels
            }
            blokks(per: 100){
              ... on Text {
                id
                href
                title
                content
                comments{
                  body
                }
              }
              ... on Image {
                id
                href
                title
                image_url
                comments{
                  body
                }
              }
              ... on Link {
                id
                href
                title
                image_url
                comments{
                  body
                }
              }
              ... on Embed {
                id
                href
                title
                image_url
                comments{
                  body
                }
              }
              ... on Attachment {
                id
                href
                title
                image_url
                comments{
                  body
                }
              }
              ... on Channel {
                id
                href
                title
                counts{
                  blocks
                }
                blokks(per:100){
                  ... on Text {
                        id
                        href
                        title
                        content
                        comments{
                          body
                        }
                      }
                      ... on Image {
                        id
                        href
                        title
                        image_url
                        comments{
                          body
                        }
                      }
                      ... on Link {
                        id
                        href
                        title
                        image_url
                        comments{
                          body
                        }
                      }
                      ... on Embed {
                        id
                        href
                        title
                        image_url
                        comments{
                          body
                        }
                      }
                      ... on Attachment {
                        id
                        href
                        title
                        image_url
                        comments{
                          body
                        }
                      }
                }
              }
            }
          }
        }
      }
  }
`


function Home() {
  
  

  const { loading, error, data } = useQuery(GetBlocks);
if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)


    let blocks = data.channel.blokks;
    let blocksClean = [];
    blocks.forEach((c) => {
        if(c.__typename == "Channel"){
          c.blokks.forEach((b) => {
            if(b.__typename == "Channel"){
                b.blokks.forEach((d) => {
                  if (!blocksClean.includes(d)) {
                      blocksClean.push(d);
                  }
                })
              }
            if (!blocksClean.includes(b)) {
                blocksClean.push(b);
            }
          })
        }
        if (!blocksClean.includes(c)) {
            blocksClean.push(c);
        }
    });

    let allBlocks = blocksClean.map( (block, index) => {

    let allComments = "<span></span>"
    if(block.__typename == "Image"){
      if(block.comments){
        allComments = block.comments.map( (comment, index) => {
          console.log(comment.body.split(" "))
          if(comment.body.split(" ").length > 1){
            let allTags = comment.body.split(" ").map((tag) => {
              if(tag.trim() != "and" && tag.trim() != "if" && tag.trim() != "an" && tag.trim() != "a" && tag.trim() != "the" && tag.trim() != "with" && tag.trim() != "some" && tag.trim() != "it" && tag.trim() != "I" && tag.trim() != "but"){
                return(<div className="resonance">{tag}</div>)
              }
            })
            return(
              <>{allTags }</>)
          }else{
            return(
                <div className="resonance">{comment.body}</div>
              )
          }
          
        })
      } 
      
      return (<div key={block.id + index} id={block.id} className='plain-block'>
        <div className='plain-block-inner'>
          <a href={"/comment/"+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image_url &&
        <img alt={block.title} src={block.image_url}/>
          }
          </div>
          {allComments}
          </div>)
    } else if (block.__typename == "Text"){
       if(block.comments){
        allComments = block.comments.map( (comment, index) => {
            if(comment.body.split(" ").length > 1){
            let allTags = comment.body.split(" ").map((tag) => {
              if(tag.trim() != "and" && tag.trim() != "if" && tag.trim() != "an" && tag.trim() != "a" && tag.trim() != "the" && tag.trim() != "with" && tag.trim() != "some" && tag.trim() != "it" && tag.trim() != "I" && tag.trim() != "but"){
                return(<div className="resonance">{tag}</div>)
              }
            })
            return(
              <>{allTags }</>)
          }else{
            return(
                <div className="resonance">{comment.body}</div>
              )
          }
        })
      } 
      return (<div key={block.id + index} id={block.id} className='plain-block'>
        <div className='plain-block-inner'>
          <a href={"/comment/"+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          <div className='text-preview'><div className='text-preview-inner'>{ReactHtmlParser(block.content)}</div></div>
           </div> {allComments}
          </div>)
    }else if(block.__typename=="Attachment"){
       if(block.comments){
        allComments = block.comments.map( (comment, index) => {
            if(comment.body.split(" ").length > 1){
            let allTags = comment.body.split(" ").map((tag) => {
              if(tag.trim() != "and" && tag.trim() != "if" && tag.trim() != "an" && tag.trim() != "a" && tag.trim() != "the" && tag.trim() != "with" && tag.trim() != "some" && tag.trim() != "it" && tag.trim() != "I" && tag.trim() != "but"){
                return(<div className="resonance">{tag}</div>)
              }
            })
            return(
              <>{allTags }</>)
          }else{
            return(
                <div className="resonance">{comment.body}</div>
              )
          }
        })
      } 
      return (<div key={block.id + index} id={block.id} className='plain-block'>
        <div className='plain-block-inner'>
          <a href={"/comment/"+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image_url &&
        <img alt={block.title} src={block.image_url}/>
          }
          </div>
          {allComments}
          </div>)
    }else if(block.__typename=="Embed"){
       if(block.comments){
        allComments = block.comments.map( (comment, index) => {
            if(comment.body.split(" ").length > 1){
            let allTags = comment.body.split(" ").map((tag) => {
              if(tag.trim() != "and" && tag.trim() != "if" && tag.trim() != "an" && tag.trim() != "a" && tag.trim() != "the" && tag.trim() != "with" && tag.trim() != "some" && tag.trim() != "it" && tag.trim() != "I" && tag.trim() != "but"){
                return(<div className="resonance">{tag}</div>)
              }
            })
            return(
              <>{ allTags }</>)
          }else{
            return(
                <div className="resonance">{comment.body}</div>
              )
          }
        })
      } 
      return (<div key={block.id + index} id={block.id} className='plain-block'>
        <div className='plain-block-inner'>
          <a href={"/comment/"+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image_url &&
        <img alt={block.title} src={block.image_url}/>
          }
          </div>
          {allComments}
          </div>)
    }else if (block.__typename=="Link"){
       if(block.comments){
        allComments = block.comments.map( (comment, index) => {
            if(comment.body.split(" ").length > 1){
            let allTags = comment.body.split(" ").map((tag) => {
              if(tag.trim() != "and" && tag.trim() != "if" && tag.trim() != "an" && tag.trim() != "a" && tag.trim() != "the" && tag.trim() != "with" && tag.trim() != "some" && tag.trim() != "it" && tag.trim() != "I" && tag.trim() != "but"){
                return(<div className="resonance">{tag}</div>)
              }
            })
            return(
              <>{allTags }</>)
          }else{
            return(
                <div className="resonance">{comment.body}</div>
              )
          }
        })
      } 
      return (<div key={block.id + index} id={block.id} className='plain-block'>
        <div className='plain-block-inner'>
          <a href={"/comment/"+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image_url &&
        <img alt={block.title} src={block.image_url}/>
          }
          </div>
          {allComments}
          </div>)
    }
    /*block.image.thumb.url*/
      
    });
    return (

     <header className="App-header Homepage">
          <div className="edit-area">
            {allBlocks}
          </div>
      </header>




    );
  
}

export default Home
