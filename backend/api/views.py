# api/views.py

from rest_framework import viewsets
from .models import Project, Experience, Skill, Testimonial, ProjectImage, ProjectVideo
from .serializers import ProjectSerializer, ExperienceSerializer, SkillSerializer, TestimonialSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_fields = ['project_type', 'category'] 

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('-start_date') 
    serializer_class = ExperienceSerializer
    
class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

# Create your views here.
class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class ProjectMediaUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Or allow any if you want

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        images = request.FILES.getlist('images')
        videos = request.FILES.getlist('videos')
        for img in images:
            ProjectImage.objects.create(project=project, image=img)
        for vid in videos:
            ProjectVideo.objects.create(project=project, video=vid)
        return Response({'status': 'uploaded'}, status=status.HTTP_201_CREATED)