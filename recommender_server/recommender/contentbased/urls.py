from django.urls import path, include
from . import views

app_name = 'contentbased'  # Đặt tên namespace cho ứng dụng

urlpatterns = [
    path('contentbased/train/', views.TrainModelView.as_view(), name='cbtrain')
]
