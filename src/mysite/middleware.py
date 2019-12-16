
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response
# class MyMiddlewareClass(MiddlewareMixin):
#     def process_request(self, request):
#         # Process the request
#         pass

#     def process_response(self, request, response):
#         # Process the response
#         return response

class AddHeadersAPIMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if isinstance(response, Response):
            # response.data['detail'] = 'I have been edited'
            # print(dir(response))
            # response['Access-Control-Allow-Credentials'] = True
            # response['Access-Control-Allow-Origin'] = "*"
            # response['Access-Control-Allow-Headers'] = "*"
            # response['Access-Control-Allow-Headers'] = 'content-type, cookie, cookies'
            # you need to change private attribute `_is_render` 
            # to call render second time
            response["Access-Control-Allow-Origin"] = "*"
            response['Content-Type'] = "application/json; charset=utf-8"
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
            response["Access-Control-Max-Age"] = "1000"
            response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type, My-Token, cookie,accept,accept-encoding,authorization,content-type,dnt,origin,user-agent,x-csrftoken,x-requested-with"

            response._is_rendered = False 
            
            response.render()  

        print("Request Headers: ",request.headers)
        print("Request: ",request.GET.get('sessionid'))
        print("Response Headers: ",response._headers)
        print("hi")
        return response