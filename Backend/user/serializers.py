from .models import MyUser as User
from rest_framework import serializers





class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name','email','password']
        extra_kwargs = {
            'password':{'write_only':True}
        }
        
    def create(self,validated_data):
        user = User(email=validated_data['email'],name=validated_data['name'])
        #hash the password
        user.set_password(validated_data['password'])
        user.save()
        return user
        

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email','password']
        


