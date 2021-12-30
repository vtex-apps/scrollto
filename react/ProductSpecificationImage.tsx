import React from 'react'
import { useProduct } from 'vtex.product-context'   
import { Image } from 'vtex.store-image'
import { useCssHandles } from 'vtex.css-handles'

interface ProductSpecificationImageProps {
  specification?: string
  name?: string
  maxWidth?: string | number
  maxHeight?: string | number
  minWidth?: string | number
  minHeight?: string | number
  blockClass?: string
  experimentalPreventLayoutShift?: boolean
  preload?: boolean

}

const CSS_HANDLES = [
  
  'containerEmpty',
  'imageontainer'
,
] as const

const ProductSpecificationImage: StorefrontFunctionComponent<ProductSpecificationImageProps> = (
  { specification = "", 
    name,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    blockClass,
    experimentalPreventLayoutShift,
    preload
    
  }
  
  ) => {

  const  handles  = useCssHandles(CSS_HANDLES)

  const productContextValue = useProduct();
  var image=loadField();


  function loadField(){
    var output='';
    if(specification>=""){

      var fields= productContextValue.product?.properties || false;
      
      if(fields){
        console.log("fields:");
        console.log(fields);
        for(var i=0; i<fields.length; i++){

          if(fields[i].name==specification && fields[i].values.length>0){
            console.log("found field: " + specification)
            
            output=fields[i].values[0];
            console.log("found value: " + output)
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
    
    image = (typeof image == "undefined" ? "" : image);
    console.log("image found for rendering:")
    console.log(image)
    if(image.trim()<='' ){
      console.log("no image found - hide ");
      return <div className={handles.containerEmpty} ></div>;
    }
    else{
      
      
      return (
        <div className={handles.imageContainer}>
          <Image name={name}
            specification={specification}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            minWidth={minWidth}
            minHeight={minHeight}
            blockClass={blockClass}
            experimentalPreventLayoutShift={experimentalPreventLayoutShift}
            preload={preload}
            src={image}
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
ProductSpecificationImage.schema = {
  title: 'editor.image.title',
  description: 'editor.image.description',
  type: 'object',
  properties: {

    specification: {
            title: 'Image specification field name',
            description: 'in which field is the image stored?',
            type: 'string',
            default: undefined,
        },
        name: {
          title: 'name of the image',
          description: 'good for SEO, alt and title?',
          type: 'string',
          default: undefined,
      },
      maxWidth: {
        title: 'maximum width of the image',
        description: '',
        type: 'string',
        default: undefined,
      },
      maxHeight: {
        title: 'maximum height of the image',
        description: '',
        type: 'string',
        default: undefined,
      },
      minWidth: {
        title: 'Minimum width of the image',
        description: '',
        type: 'string',
        default: undefined,
      },
      minHeight: {
        title: 'Minimum height of the image',
        description: '',
        type: 'string',
        default: undefined,
      },
      experimentalPreventLayoutShift: {
        title: 'Enable experimental layout shift',
        description: '',
        type: 'string',
        default: undefined,
      },
      preload: {
        title: 'Enable preload',
        description: 'Enables the preloading of the images.',
        type: 'string',
        default: undefined,
      },


      

  },
}

export default ProductSpecificationImage
