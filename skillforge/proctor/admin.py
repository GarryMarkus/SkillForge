from django.contrib import admin
from .models import Exam, Question, ExamSession, ProctorEvent

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 2

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = ("title", "duration_minutes", "is_active")

admin.site.register(ExamSession)
admin.site.register(ProctorEvent)
