import zope.formlib
from zope.component import createObject
from Acquisition import aq_base
from Products.Five.formlib import formbase as fiveformbase
from plone.app.form import base as formbase

from idoru.maps import interfaces

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

class KMLView(fiveformbase.DisplayForm):
    form_fields = zope.formlib.form.FormFields(interfaces.IPlace)
    template = ViewPageTemplateFile('templates/kml_view.pt')
