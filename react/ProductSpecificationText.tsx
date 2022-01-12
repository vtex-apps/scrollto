import React from 'react'
import { useProduct } from 'vtex.product-context'   
import { useCssHandles } from 'vtex.css-handles'

interface ProductSpecificationTextProps {
  specification?: string,
  group?: string,
  blockClass?: string,
  
  

}

const CSS_HANDLES = [
  
  'containerEmpty',
  'specificationTextContainer',
  'specificationTextValue'
,
] as const

const ProductSpecificationText: StorefrontFunctionComponent<ProductSpecificationTextProps> = (
  { specification = "",
    group = "",
    blockClass= ""
    
    
  }
  
  ) => {

  const  handles = useCssHandles(CSS_HANDLES, blockClass)

  const productContextValue = useProduct();
  var thetext=loadField();
  console.log("the text:");
  console.log(thetext);



  function loadField(){
    var output=[];
    if(specification>="" && group >=""){
      console.log("all specs");
      console.log(productContextValue);
      var groups= productContextValue.product?.specificationGroups || false;
      
      if(groups.length>0){
        console.log("groups:");
        console.log(groups);
        for(var i=0; i<groups.length; i++){
          //finding the field in the groups
          if(groups[i].originalName != group) continue;

          for(var j=0; j<groups[i].specifications.length; j++){
            if(groups[i].specifications[j].originalName != specification) continue; //not ours? skip!

            output=groups[i].specifications[j].values; 
            console.log("JACKPOT!");
            console.log(output);
            break;
          }
          break;
          /*if(fields[i].name==specification && fields[i].values.length>0){
            console.log("found field: " + specification)
            
            output=fields[i].values[0];
            console.log("found value: " + output)
            break;
          }*/
        }
      }else { //we couldnt find groups, lets try to load the field individually.
        var fields = productContextValue.product?.properties;
        if(fields.length>0){
          for(var i=0; i<fields.length; i++){
            if(fields[i].name==specification){
              return fields[i].values
              
            } else continue;
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
    
    joinDOM();
    
    if(thetext.length==0){
      console.log("no value found - hide ");
      return <div className={handles.containerEmpty} ></div>;
    }
    else{
      
      console.log("rendering like a baus");
      console.log(joinDOM());
      return (
        <div className={handles.specificationTextContainer}>
            {joinDOM()}
        </div>
      )
      
    }


  }
  function joinDOM(){
    let output=[];
    for(var i=0; i<thetext.length; i++){
      output.push(<span className={handles.specificationTextValue}>
        {thetext[i]}
        </span>)
    }
    return output;
  }
  
//<h3><button onClick={activateProductContext} >click me</button></h3>
  return ( <div>
    {buildDom()}
  </div> )
}


//Stuff for the site editor. Might not need it.
ProductSpecificationText.schema = {
  title: 'editor.field.title',
  description: 'editor.field.description',
  type: 'object',
  properties: {

    specification: {
            title: 'Specification field name',
            description: 'in which field is the value stored?',
            type: 'string',
            default: undefined,
        }
  }
}

export default ProductSpecificationText
