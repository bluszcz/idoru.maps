.. contents::

idoru.maps is a simply Plone product which ads new Content Type - Place.

One of feature is a support for  Geolocation API Specification: http://dev.w3.org/geo/api/spec-source.html 

It has been tested under:

* chromium
* opera 10.60
* firefox 3.6.4

You can see example here: http://dev.bluszcz.net/places/fast-food/cheap-falafel/

To install it add to your buildout.cfg:

	[buildout]
	eggs +=
			idoru.maps

	develop +=
			parts/idoru.maps

	parts +=
			idoru.maps

	[idoru.maps]
	recipe = zerokspot.recipe.git
	repository = git@github.com:bluszcz/idoru.maps.git
	as_egg = true

Egg and release should be soon.

- Code repository: http://github.com/bluszcz/idoru.maps
- Report bugs at http://github.com/bluszcz/idoru.maps/issues

