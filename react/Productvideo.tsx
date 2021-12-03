import React from 'react'
import { useProduct } from 'vtex.product-context'
import { Video } from 'vtex.store-video'
import { useCssHandles } from 'vtex.css-handles'

interface ProductvideoProps {
  specification: string
  fallbackvideo: string

}

const CSS_HANDLES = [
  
  'containerEmpty',
  'videoContainer'
,
] as const

const Productvideo: StorefrontFunctionComponent<ProductvideoProps> = ({specification, fallbackvideo}) => {

  const  handles  = useCssHandles(CSS_HANDLES)

  const productContextValue = useProduct();
  var video=loadField();


  function loadField(){
    var output='';
    if(specification>=""){

      var fields= productContextValue.product?.properties || false;
      
      if(fields){

        for(var i=0; i<fields.length; i++){

          if(fields[i].name==specification && fields[i].values.length>0){
            
            output=fields[i].values[0];
            break;
          }
        }
      }
    }
    return output;
  }
  
  /*function activateProductContext(){
    console.log(productContextValue);
    console.log(specification);
    console.log("i got "+loadField());
    console.log("zeh video "+video)
    console.log("Zeh Fallback "+fallbackvideo)
  }*/

  function buildDom(){
    fallbackvideo = (typeof fallbackvideo == "undefined" ? "" : fallbackvideo);
    video = (typeof video == "undefined" ? "" : video);
    if(fallbackvideo.trim()<='' && video.trim() <='' ){
      console.log("no video found - hide ");
      return <div className={handles.containerEmpty} ></div>;
    }
    else{
      var finalvideo =( video.trim()>'' ? video : fallbackvideo);
      return (
        <div className={handles.videoContainer}>
          <Video 
            width="100%" 
            height="600px"
            loop
            src={finalvideo}
            />
        </div>
      )
      
    }


  }
  
  
//<h3><button onClick={activateProductContext} >click me</button></h3>
  return ( <div>
    {buildDom()}
  </div> )
}


//Stuff for the site editor. Might not need it.
Productvideo.schema = {
  title: 'editor.video.title',
  description: 'editor.video.description',
  type: 'object',
  properties: {

    specification: {
            title: 'Video specification field name',
            description: 'in which field is the video stored?',
            type: 'string',
            default: "",
         },
         fallbackvideo: {
          title: 'Fallback video if specification not found.',
          description: 'leave empty to hide player',
          type: 'string',
          default: '',
       },


  },
}

export default Productvideo
