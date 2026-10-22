from django.urls import path
from .views import *

urlpatterns = [
    path("upskill/generate/", GenerateUpskillModuleAPI.as_view()),
    path("upskill/modules/", ListUpskillModulesAPI.as_view()),
    path("upskill/<int:module_id>/", GetUpskillModuleAPI.as_view()),
]
