from django.urls import path
from .views import (
    GenerateUpskillModuleAPI,
    ListUpskillModulesAPI,
    GetUpskillModuleAPI,
    ModuleProgressAPI
)

urlpatterns = [
    path("upskill/generate/", GenerateUpskillModuleAPI.as_view(), name="upskill-generate"),
    path("upskill/modules/", ListUpskillModulesAPI.as_view(), name="upskill-modules"),
    path("upskill/<int:module_id>/", GetUpskillModuleAPI.as_view(), name="upskill-get"),
    path("upskill/progress/", ModuleProgressAPI.as_view(), name="upskill-progress"),
]
