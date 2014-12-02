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

## Versioning

BoomQueries is maintained by using the [Semantic Versioning Specification (SemVer)](http://semver.org/)


## Copyright and License

Copyright 2014 [BoomTown](http://boomtownroi.com) under the [MIT License](https://github.com/boomtownroi/boomqueries/blob/LICENSE.md)


