from django.contrib import admin
from .models import Project, Experience, Skill, Testimonial, ProjectImage, ProjectVideo

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1  # How many empty forms to display

class ProjectVideoInline(admin.TabularInline):
    model = ProjectVideo
    extra = 1

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'project_type', 'tech_stack')
    list_filter = ('project_type',)
    inlines = [ProjectImageInline, ProjectVideoInline]  # <-- Add this line

class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'start_date', 'end_date')

admin.site.register(Project, ProjectAdmin)
admin.site.register(Experience, ExperienceAdmin)
admin.site.register(Skill)
admin.site.register(Testimonial)
