from rest_framework import renderers
import json

from rest_framework.exceptions import ErrorDetail

class UserJSONRenderer(renderers.JSONRenderer):
    charset = 'utf-8'
    
    def render(self,data,accepted_media_type=None,renderer_context=None):
        response = ""
        if isinstance(data, dict) and any(isinstance(value,list) and any(isinstance(item,ErrorDetail) for item in value) for value in data.values()):
            response = json.dumps({'error':data})
        else:
            response = json.dumps(data)
        return response
    
