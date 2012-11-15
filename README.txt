   "        #                                                         
 mmm     mmm#   mmm    m mm  m   m         mmmmm   mmm   mmmm    mmm  
   #    #" "#  #" "#   #"  " #   #         # # #  "   #  #" "#  #   " 
   #    #   #  #   #   #     #   #         # # #  m"""#  #   #   """m 
 mm#mm  "#m##  "#m#"   #     "mm"#    #    # # #  "mm"#  ##m#"  "mmm" 
   by bluszcz@bluszcz.net                                #            
                                                         "  

idoru.maps is a simply Plone product which ads new Content Type - Place.


Features
========

 * Support for Google Maps (planned more API's - Bing and so)
 * Support for GeoURL (ICBM tag), Geo Tag http://en.wikipedia.org/wiki/Geotagging#HTML_pages
 * Basic support for Dublin Core

Browser compability
===================

Tested on following browsers:

 * Chromium (developed against Chrome 20)
 * Opera 10.60
 * Firefox 3.6.4

*Should* works also with others browsers :)

Plone compability
=================

Aims to work with latest version of Plone (right now it is 4.2).

Examples
========

 * Place view HTML: http://dev.bluszcz.net/places/fast-food/cheap-falafel/
 * Place view KML:  http://dev.bluszcz.net/places/fast-food/cheap-falafel/KML

Installation
============

To install it, add to your buildout.cfg:

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

Roadmap
=======

 * Handling more maps API's

