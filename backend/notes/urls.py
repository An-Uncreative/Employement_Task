from django.urls import path
from .views import FileUploadView, StudentListView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('students/', StudentListView.as_view(), name='student-list'),
]
