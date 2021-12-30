# VTEX Product Specification Video

## Description

VTEX Store Components is a collection of components that can be used to create/extend others VTEX apps.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
- [CSS Handles](#css-handles)


## Usage

To use this app, you need to import in your dependencies on `manifest.json`.

```json
  "dependencies": {
    "vtex.product-specification-image": "0.x"
  }
```

Then, you can add a component block into your app theme on your product detail page. You can use props to define both the fallback video as well as the specification name to look into for videos.

```json
"productvideo":{
    "props":{
      "specification": "trailervideo",
      "fallbackvideo": "https://www.youtube.com/watch?v=NQ0HkV4Zp_o"
      
    }
  }
```
## CSS handles
The following CSS handles can be used for styling:

```js
'containerEmpty'
'videoContainer'
```




