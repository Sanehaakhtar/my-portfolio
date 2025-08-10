from django.db import models

class Project(models.Model):
      # --- CHOICES ---
    DESIGN_CATEGORY_CHOICES = [
        ('ui-ux', 'UI/UX Design'),
        ('branding', 'Branding'),
        ('illustration', 'Illustration'),
        ('other', 'Other'),
    ]
    PROJECT_TYPE_CHOICES = [
        ('CS', 'Computer Science'),
        ('DS', 'Design')
    ]

    # --- CORE FIELDS ---
    title = models.CharField(max_length=100)
    project_type = models.CharField(max_length=2, choices=PROJECT_TYPE_CHOICES)
    # This is the main image for the project grid/thumbnail
    main_image = models.ImageField(upload_to='project_images/main/', help_text="Primary thumbnail image for the project.")

    # --- OPTIONAL DESIGN FIELDS ---
    category = models.CharField(
        max_length=20, 
        choices=DESIGN_CATEGORY_CHOICES, 
        blank=True,
        null=True
    )

    # --- OPTIONAL CS FIELDS ---
    tech_stack = models.CharField(max_length=200, blank=True, null=True, help_text='Comma-separated list of tech used, e.g., "React, Django, PostgreSQL"')

    # --- OPTIONAL DETAIL FIELDS (for both CS and Design) ---
    description = models.TextField(blank=True, null=True, help_text="A short summary of the project.")
    problem_statement = models.TextField(blank=True, null=True, help_text="What was the core problem this project aimed to solve?")
    my_role = models.CharField(max_length=200, blank=True, null=True, help_text="e.g., Lead Developer, UI/UX Designer")
    key_challenges = models.TextField(blank=True, null=True, help_text="What were the main technical or design challenges?")
    learnings = models.TextField(blank=True, null=True, help_text="What key skills or lessons did you take away?")
    project_url = models.URLField(blank=True, null=True, help_text="Link to the live project if available.")

    def __str__(self):
        return self.title
    
class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='project_images/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

class ProjectVideo(models.Model):
    project = models.ForeignKey(Project, related_name='videos', on_delete=models.CASCADE)
    video = models.FileField(upload_to='project_videos/')
    caption = models.CharField(max_length=255, blank=True)
# ...existing code...


class Experience(models.Model):
    title = models.CharField(max_length=100) # e.g., "Software Engineer Intern"
    company = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True) # Can be ongoing
    description = models.TextField()

    def __str__(self):
        return f"{self.title} at {self.company}"

class Skill(models.Model):
    name = models.CharField(max_length=50)
    # You could add a category like 'Language', 'Framework', 'Tool'
    # You could add a proficiency level from 1-5
    def __str__(self):
        return self.name

# Create your models here.
class Testimonial(models.Model):
    quote = models.TextField()
    author_name = models.CharField(max_length=100)
    author_title = models.CharField(max_length=100, help_text="e.g., Project Manager at TechCorp")
    project_related = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True, help_text="Optional: Link to a specific project")

    def __str__(self):
        return f'"{self.quote[:30]}..." - {self.author_name}'
