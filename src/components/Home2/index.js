import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Arena from "are.na"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

let arena = new Arena({ accessToken: process.env.REACT_APP_ARENA_ACCESS_TOKEN });

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };

   }
  

   render() {
    let {blocks} = this.props;
    let blocksClean = [];
    blocks.forEach((c) => {
        if (!blocksClean.includes(c)) {
            blocksClean.push(c);
        }
    });

    let allBlocks = blocksClean.map( (block, index) => {
    console.log(block)
    if(block.class == "Image"){
      return (<div key={block.id + index} id={block.id} className='plain-block'>
          <a href={"/comment?block="+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image &&
        <img alt={block.description | block.title} src={block.image.thumb.url}/>
          }
          </div>)
    } else if (block.class == "Text"){
      return (<div key={block.id + index} id={block.id} className='plain-block'>
          <a href={"/comment?block="+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          <div className='text-preview'><div className='text-preview-inner'>{ReactHtmlParser(block.content_html)}</div></div>
            
          </div>)
    }else if(block.class=="Attachment"){
      return (<div key={block.id + index} id={block.id} className='plain-block'>
          <a href={"/comment?block="+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image &&
          <img alt={block.description | block.title} src={block.image.thumb.url}/>
         } 
          </div>)
    }else if(block.class=="Embed"){
      return (<div key={block.id + index} id={block.id} className='plain-block'>
          <a href={"/comment?block="+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image &&
          <img alt={block.description | block.title} src={block.image.thumb.url}/>
          }
          </div>)
    }else if (block.class=="Link"){
      return (<div key={block.id + index} id={block.id} className='plain-block'>
          <a href={"/comment?block="+block.id}>{ReactHtmlParser(block.title || "Untitled")}</a>
          {block.image &&
            <img alt={block.description | block.title} src={block.image.thumb.url}/>
          }
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
}

export default Home
