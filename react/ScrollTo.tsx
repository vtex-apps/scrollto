import React from 'react'

import { useCssHandles } from 'vtex.css-handles'

interface ScrollToProps {
  linktext?: string,
  target?: string,
  time?: number,
  click?: string,
  index?: number,
  offset?: number

}

const CSS_HANDLES = [
  
  'scrollToContainer',
  'scrollToLink'
] as const;

const ScrollTo: StorefrontFunctionComponent<ScrollToProps> = (
  { 
    linktext='',
    target='',
    time=300,
    click= false,
    index=0,
    offset=0,
    
  }
  
  ) => {

  const { handles } = useCssHandles(CSS_HANDLES);
  
  const navigate = () => {
    const elm= document.querySelectorAll(target)[index] as HTMLElement;
    if(click==true){
      console.log("clicking like its hawt")
      elm.click();
      console.log(elm);
    }
    console.log("approaching the scroll");
    scrollTo (elm)



   
    function scrollTo(element: HTMLElement) {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop-offset
      });
      

        
    }

  }



  const buildDom = () => {
    console.log(target, time, click, index);
    return (<a onClick={navigate} className={handles.scrollToLink}>{linktext}</a>);
  }
  
//<h3><button onClick={activateProductContext} >click me</button></h3>
  return ( <div className={handles.scrollToContainer}>
    {buildDom()}
  </div> )
}


//Stuff for the site editor. Might not need it.
ScrollTo.schema = {
  title: 'editor.field.title',
  description: 'editor.field.description',
  type: 'object', 
}

export default ScrollTo
