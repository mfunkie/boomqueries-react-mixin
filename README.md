# BoomQueries

BoomQueries is our take on element-queries; sizing elements based on their container.

As our product has grown to be more modular, we began to see the limitations of sizing those modular components across more granular scopes; main content areas, sidebars, etc. And most of all, the specificities of keeping up with all these variations started to take a toll on productivity and maintenance. While there are other implementations, we didn't find any that quite fit our needs. The benefits of our version are:

* Vanilla JS
* Made for modern browsers (IE9+) to keep dependencies small
* **NO** DOM changes to get setup
* Debounce method used on resize for more controlled intervals
* Control over sizing classes added for more granular control

## Getting Started

There's a few options to get up and running with BoomQueries:

* Download the [latest release](https://github.com/boomtownroi/boomqueries/releases/latest)
* Clone the repo, `git clone git://github.com/boomtownroi/boomqueries.git`
* Install with [Bower](http://bower.io): `bower install boomqueries`

## Initializing/Adding Components

Use `window.boomQueries.add()` to register your component(s) with the BoomQueries library. Each instanse can house a `key`; can be used to interact after it has been registered, a `selector`, and a `breaks` array, which holds references to your desired `min-width` breakpoint and the class to be added to your component.

	window.boomQueries.add("COMPONENTKEY", {
	  selector: ".component",
	  breaks: [
	    [480, "component--md"],
	    [600, "component--lg"]
	  ]
	});

Once you have added your components, you can initialize BoomQueries with:

	window.boomQueries.calculate();

## Removing Components

You can remove components registered by BoomQueries by calling the `remove` method and specifying your component `key`.

	window.boomQueries.remove("COMPONENTKEY");

_You can freely add/remove components as needed throughout your app, so don't feel that you need to register them all at once!_

## Working with Dynamic Content

Using Backbone, Angular, React, etc. to dynamically interact with DOM elements? You can easily "refresh" BoomQueries by calling the `calculate()` method again:

	window.boomQueries.calculate();

## Versioning

BoomQueries is maintained by using the [Semantic Versioning Specification (SemVer)](http://semver.org/)

## Copyright and License

Copyright 2014 [BoomTown](http://boomtownroi.com) under the [MIT License](https://github.com/boomtownroi/boomqueries/blob/LICENSE.md)


