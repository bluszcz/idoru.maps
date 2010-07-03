.. contents::

To install add to your buildout.cfg:

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



- Code repository: http://github.com/bluszcz/idoru.maps
- Report bugs at http://github.com/bluszcz/idoru.maps/issues

