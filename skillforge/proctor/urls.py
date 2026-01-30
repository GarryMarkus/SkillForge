from django.urls import path
from .views import (
    ExamListView,
    StartExamView,
    ExamQuestionView,
    ProctorEventView,
    EndExamView,
    proctor_test,
)
urlpatterns = [
    path("list/", ExamListView.as_view()),
    path("start/", StartExamView.as_view()),
    path("<int:exam_id>/questions/", ExamQuestionView.as_view()),
    path("event/", ProctorEventView.as_view()),
    path("end/", EndExamView.as_view()),
    path("test/", proctor_test),
]

