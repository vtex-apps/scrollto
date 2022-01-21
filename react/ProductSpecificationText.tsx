import React from 'react'
import { useProduct } from 'vtex.product-context'   
import { useCssHandles } from 'vtex.css-handles'

interface ProductSpecificationTextProps {
  specification?: string,
  group?: string,
  blockClass?: string,
  mode?: string
  
  

}

const CSS_HANDLES = [
  
  'containerEmpty',
  'specificationTextContainer',
  'specificationTextValue',
  'specificationTextField'
] as const;

const ProductSpecificationText: StorefrontFunctionComponent<ProductSpecificationTextProps> = (
  { specification = "",
    group = "",
    //blockClass= "",
    mode = "field"
    
  }
  
  ) => {

  const { handles } = useCssHandles(CSS_HANDLES);
    
  const productContextValue = useProduct();
  var thetext=loadField();

  /*function buildExtraHandle(handle:string, name:string){
    const regex = /[äöüÄÖÜéÉáÁóÓúÚíÍñÑçÇ ]/gm;
    const subst = ``
    const result = handle+'--'+name.replace(regex, subst);
    return result;
  }*/
  


  function loadField(){
    var output=[];
    if(specification>="" && group >=""){


      var groups= productContextValue.product?.specificationGroups || false;
      
      if(groups.length>0){


        //ADD first switch here. We gotta continue searching for the name and return the "classic way"
        //we gotta pull all fields and all values in the group way, if a group is given.
        

        for(var i=0; i<groups.length; i++){
          //finding the field in the groups
          
          if(groups[i].originalName != group) continue;

          switch (mode){
            case "group":
              var specs=groups[i].specifications;
             // var mergedgroups=[];
              
              var vals=[];
              for(var j=0; j<specs.length; j++){ //Specification names
                
                for(var k=0; k<specs[j].values.length; k++){
                    vals.push(<span className={handles.specificationTextValue}>
                        {specs[j].values[k]}
                        </span>); 
                }
              }
              output=vals;
              break;



            case "specification":
            default: 
                for(var j=0; j<groups[i].specifications.length; j++){ //The group is found, we look for names
                  if(groups[i].specifications[j].originalName != specification) continue; //not ours? skip!
                  output=groups[i].specifications[j].values; 

                  break;
                }
                break;
          }

          
          break;
        }
      } else { //we couldnt find groups, lets try to load the field individually.
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
  


  function buildDom(){
    
    
    
    if(thetext.length==0){
      
      return <div className={handles.containerEmpty} ></div>;
    }
    else{
      
      
      
      return (
        <div className={handles.specificationTextField} >
            {joinDOM()}
        </div>
      )
      
    }


  }
  function joinDOM(){
    
    
    let output=[];
    switch (mode){
      case "group":
        return thetext;
        break;
        case "specification":
          default: 
              for(var i=0; i<thetext.length; i++){
                output.push(<span className={handles.specificationTextValue}>
                  {thetext[i]}
                  </span>)
              }
          break;
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
