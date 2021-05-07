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

 let handleClick = (comment) => {
    let els = document.querySelectorAll(".plain-block");
    let all = document.querySelector(".all");
    all.classList.remove('on')
    els.forEach((el)=>{
      el.style.display = "none";


      if(el.classList.contains(comment)){
        el.style.display = "inline-block";
      }
    })
    let res = document.querySelectorAll(".resonance");
    res.forEach((re)=>{
      if(re.textContent.includes(comment)){
         re.classList.add("on") 
      } else {
        re.classList.remove("on")
      }
      
    })
  }
  let handleAll = (comment) => {
    let els = document.querySelectorAll(".plain-block");
    let all = document.querySelector(".all");
    all.classList.add('on')
    els.forEach((el)=>{
      el.style.display = "inline-block";
    })
    let res = document.querySelectorAll(".resonance");
    res.forEach((re)=>{
      re.classList.remove("on") 
    })
  }

  let handleNode = (resonances) => {
    console.log(resonances)
    let els = document.querySelectorAll(".plain-block");
    let all = document.querySelector(".all");
    all.classList.remove('on')
    els.forEach((el)=>{
      el.style.display = "none";

      resonances.forEach((res)=>{
        if(el.classList.contains(res)){
          el.style.display = "inline-block";
        }
      })
      
    })
  }

    let blocks = data.channel.blokks;
    let blocksClean = [];
    blocks.forEach((c) => {
        if(c.__typename == "Channel"){
          c.blokks.forEach((b) => {
            
            if (!blocksClean.includes(b)) {
                blocksClean.push(b);
            }
          })
        }
        if (!blocksClean.includes(c)) {
            blocksClean.push(c);
        }
    });

    let blocksUltraClean = [];
    blocksClean.forEach((blok) => {
      let pushBlok = true;
      for (let j = blocksUltraClean.length - 1; j >= 0; j--) {
        if(blocksUltraClean[j].id === blok.id){
          pushBlok = false;
        }
      }
      if(pushBlok){
          blocksUltraClean.push(blok)
      }

    })

    let allBlocks = blocksUltraClean.map( (block, index) => {

    let allComments = ""
    let allResonances = [];
    let resonancesClean = []
    if(block.comments){
      block.comments.map( (comment, index) => {
         const regex = /[!"#$%&()*+,./:;<=>?@[\]^_`{|}~]/g;
          let body = comment.body.replace(regex,"")
            if(body.split(" ").length > 1){
            let allTags = body.split(" ").map((tag) => {
              if(tag.toLowerCase().replace(regex," ").trim() != "and" && tag.toLowerCase().replace(regex," ").trim() != "if" && tag.toLowerCase().replace(regex," ").trim() != "an" && tag.toLowerCase().replace(regex," ").trim() != "a" && tag.toLowerCase().replace(regex," ").trim() != "the" && tag.toLowerCase().replace(regex," ").trim() != "with" && tag.toLowerCase().replace(regex," ").trim() != "some" && tag.toLowerCase().replace(regex," ").trim() != "it" && tag.toLowerCase().replace(regex," ").trim() != "i" && tag.toLowerCase().replace(regex," ").trim() != "but" && tag.toLowerCase().replace(regex," ").trim() != "of" && tag.toLowerCase().replace(regex," ").trim() != "am" && tag.toLowerCase().replace(regex," ").trim() != "in" && tag.toLowerCase().replace(regex," ").trim() != "or" && tag.toLowerCase().replace(regex," ").trim() != "it" && tag.toLowerCase().replace(regex," ").trim() != "any" && tag.toLowerCase().replace(regex," ").trim() != "it's" && tag.toLowerCase().replace(regex," ").trim() != "at" && tag.toLowerCase().replace(regex," ").trim() != "to" && tag.toLowerCase().replace(regex," ").trim() != "is" && tag.toLowerCase().replace(regex," ").trim() != "" && tag.toLowerCase().replace(regex," ").trim() != " " && !tag.includes('http') && tag.toLowerCase().replace(regex," ").trim() != "on" && tag.toLowerCase().replace(regex," ").trim() != "for" && tag.toLowerCase().replace(regex," ").trim() != "i'd" && tag.toLowerCase().replace(regex," ").trim() != "i'm" && tag.toLowerCase().replace(regex," ").trim() != "by" && tag.toLowerCase().replace(regex," ").trim() != "its" && tag.toLowerCase().replace(regex," ").trim() != "this" && tag.toLowerCase().replace(regex," ").trim() != "be" && tag.toLowerCase().replace(regex," ").trim() != "so" && tag.toLowerCase().replace(regex," ").trim() != "as" && tag.toLowerCase().replace(regex," ").trim() != "are" && tag.toLowerCase().replace(regex," ").trim() != "this"){
                allResonances.push(tag.replace(regex," "))
              }
            })
            
          }else{
       
                allResonances.push(body.toLowerCase())
              
          }
        })

      } 

      allResonances.forEach((comment) => {
        if (!resonancesClean.includes(comment.toLowerCase())) {
            resonancesClean.push(comment.toLowerCase());
        }       
      })

      allComments = resonancesClean.map( (comment, index) => {
        if(comment.trim() != ""){
          return(
            <div onClick={() => handleClick(comment)} key={comment + index} className="resonance">{comment}</div>
          )
        }
        
      })

    if(block.__typename == "Image"){
     
      
      return (<div key={block.id} id={block.id} className={'plain-block ' + resonancesClean.join(" ")}>
        <div onClick={() => handleNode(resonancesClean)} className="node-button"></div><div className='plain-block-inner'>
          <a href={"/comment/"+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image_url &&
        <img alt={block.title} src={block.image_url}/>
          }
          </div>
          {allComments}
          </div>)
    } else if (block.__typename == "Text"){
        
      return (<div key={block.id} id={block.id} className={'plain-block ' + resonancesClean.join(" ")}>
        <div onClick={() => handleNode(resonancesClean)} className="node-button"></div><div className='plain-block-inner'>
          <a href={"/comment/"+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          <div className='text-preview'><div className='text-preview-inner'>{ReactHtmlParser(block.content)}</div></div>
           </div> {allComments}
          </div>)
    }else if(block.__typename=="Attachment"){
        
      return (<div key={block.id} id={block.id} className={'plain-block ' + resonancesClean.join(" ")}>
        <div onClick={() => handleNode(resonancesClean)} className="node-button"></div><div className='plain-block-inner'>
          <a href={"/comment/"+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image_url &&
        <img alt={block.title} src={block.image_url}/>
          }
          </div>
          {allComments}
          </div>)
    }else if(block.__typename=="Embed"){
       
      
      return (<div key={block.id} id={block.id} className={'plain-block ' + resonancesClean.join(" ")}>
        <div onClick={() => handleNode(resonancesClean)} className="node-button"></div><div className='plain-block-inner'>
          <a href={"/comment/"+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image_url &&
        <img alt={block.title} src={block.image_url}/>
          }
          </div>
          {allComments}
          </div>)
    }else if (block.__typename=="Link"){
       
      return (
        <div key={block.id} id={block.id} className={'plain-block ' + resonancesClean.join(" ")} >
        <div onClick={() => handleNode(resonancesClean)} className="node-button"></div><div className='plain-block-inner'>
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
            <div onClick={() => handleAll()} className="all on">Show All</div>
            {allBlocks}
          </div>
      </header>




    );
  
}

export default Home
