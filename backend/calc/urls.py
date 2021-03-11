from django.urls import path


from . import views

urlpatterns = [
    path('AddFood',views.addFood,name='AddFood'),
    path('DeleteFood/<str:pk>',views.deleteFood,name='DeleteFood'),
    path('FindByName/<str:pk>',views.findByName,name='FindByName'),
    path('GetValuesOfFood/<str:food_id>',views.GetValuesOfFood,name='GetValues'),
]