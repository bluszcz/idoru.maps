"""Definition of the Place content type
"""

from zope.interface import implements

from Products.Archetypes import atapi
from Products.ATContentTypes.content import base
from Products.ATContentTypes.content import schemata

#from idoru.maps.Widget import CoordinateWidget

# -*- Message Factory Imported Here -*-

from idoru.maps.interfaces import IPlace
from idoru.maps.config import PROJECTNAME
from idoru.maps import mapsMessageFactory as _

PlaceSchema = schemata.ATContentTypeSchema.copy() + atapi.Schema((
    atapi.StringField('latitude',
	    required=False,
        searchable=True,
        widget=atapi.StringWidget(label=_(u"Latitude"),
            description=_(u""),
            allow_file_upload=False,
            visible={'edit': 'hidden',}),
    ),
    atapi.StringField('longitude',
	    required=False,
        searchable=True,
        widget=atapi.StringWidget(label=_(u"Longitude"),
            description=_(u""),
            allow_file_upload=False,
            visible={'edit': 'hidden',}),
    ),
    #atapi.StringField('coordinate',
	#    required=False,
    #    searchable=True,
    #    widget=CoordinateWidget(label=_(u"coordinate"),
    #        description=_(u""),
    #        allow_file_upload=False,
    #        visible={'edit': 'hidden', 'view': 'invisible'}),
    #),

    # -*- Your Archetypes field definitions here ... -*-

))

# Set storage on fields copied from ATContentTypeSchema, making sure
# they work well with the python bridge properties.

PlaceSchema['title'].storage = atapi.AnnotationStorage()
PlaceSchema['description'].storage = atapi.AnnotationStorage()

schemata.finalizeATCTSchema(PlaceSchema, moveDiscussion=False)


class Place(base.ATCTContent):
    """Place with a marker on the map"""
    implements(IPlace)

    meta_type = "Place"
    schema = PlaceSchema
    default_view = 'place_edit'

    title = atapi.ATFieldProperty('title')
    description = atapi.ATFieldProperty('description')

    # -*- Your ATSchema to Python Property Bridges Here ... -*-

atapi.registerType(Place, PROJECTNAME)
