from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import MyUser

class MyUserAdmin(UserAdmin):
    model = MyUser
    fieldsets = (
        (None, {'fields': ('email', 'name', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_admin', 'groups', 'user_permissions')}),  # Add groups and permissions
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_active', 'is_staff', 'is_admin')}
        ),
    )
    list_display = ('email', 'name', 'is_staff', 'is_admin')
    search_fields = ('email', 'name')
    ordering = ('email',)

admin.site.register(MyUser, MyUserAdmin)
