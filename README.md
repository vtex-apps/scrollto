## 🚨 Disclaimer - Template Application
>:warning: **This project is not maintained by VTEX, and this app is provided as a working example on how this feature can be implemented. Improvements and fixes will be on the implementation team side.**
>
>All template applications provided are developed by the VTEX community, you can use them freely.

&nbsp;
# VTEX Scrollto

## Description

VTEX Scrollto is a handy little app to navigate to **any** element on the current page..

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
- [CSS Handles](#css-handles)


## Usage
As usual, make sure to install the app:

```bash
vtex install vtex.scrollto@0.x
```

To use this app, you need to import in your dependencies on `manifest.json`.

```json
  "dependencies": {
    "vtex.scrollto": "0.x"
  }
```

### How it works?
This app expects a CSS selector string as a prop, which it will try to scroll to. You can use a classic selector string as you also know it from using jQuery.
You can also enable a click on the target element prior to scrolling to it.
**this is in particular handy to first open a tab and then scroll right into it.**


### how it's used
You can set all required parameters as a prop

```json
"scrollto#one": {
		"props": {
			"target": ".vtex-tab-layout-0-x-listContainer.vtex-tab-layout-0-x-listContainer--pdp-tab-list button",
			"index": 1,
			"linktext": "Tab 2 >",
			"click": true,
			"offset": 150
		}
	}
```


### the Props in detail:
| prop name | description | default | example | 
| --- | --- | --- | --- | 
| target | the CSS selector to search for. Can find multiple instances | none | `.vtex-tab-layout-0-x-listContainer.vtex-tab-layout-0-x-listContainer--pdp-tab-list button` | 
| index | which of the elements found should be scrolled to? If the selector occurs multiple times, you can use the index to say to which it should go.  | 0 | 5 | 
| linktext | The clickable text element | "" | "Go to product ratings" | 
| click | whether the target element should automatically be clicked, before scrolling to it. | false | true | 
| offset | A scroll offset in pixels that gets substracted from the target position. A positive value will scroll futher down,  a negative value will scroll less far. This is in particular handy if you have a sticky header bar and you don't want the element to hide undearneath. | 0 | 150 | 

## CSS handles
The following CSS handles can be used for styling:

```js
  'scrollToContainer'
  'scrollToLink'
```




