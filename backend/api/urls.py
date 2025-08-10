from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ProjectViewSet, ExperienceViewSet, SkillViewSet, TestimonialViewSet, ProjectMediaUploadView

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'testimonials', TestimonialViewSet)

urlpatterns = [
    path('projects/<int:project_id>/upload-media/', ProjectMediaUploadView.as_view(), name='project-media-upload'),
]

urlpatterns += router.urls