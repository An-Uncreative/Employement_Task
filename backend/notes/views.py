from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Student
from .tasks import process_file
import os

class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES['file']
        admin_email = request.data['email']
        
        # Ensure the uploads directory exists
        uploads_dir = 'uploads'
        if not os.path.exists(uploads_dir):
            os.makedirs(uploads_dir)

        file_path = os.path.join(uploads_dir, file_obj.name)
        
        with open(file_path, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)

        process_file.delay(file_path, admin_email)
        return Response(status=status.HTTP_201_CREATED)

class StudentListView(APIView):
    def get(self, request, *args, **kwargs):
        students = Student.objects.all().values()
        return Response(students, status=status.HTTP_200_OK)
