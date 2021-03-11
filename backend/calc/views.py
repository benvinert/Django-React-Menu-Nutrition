from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .serializer import *
import requests
import json
# from django.template.loader import render_to_string
# from weasyprint import HTML
# import tempfile

# Create your views here.

@api_view(['POST'])
def addFood(request):
    print(request.data)                           #can Get Many Objects
    serialize = foodSerializers(data=request.data,many=True)
    if(serialize.is_valid()):# Check if the form is valid to JSON Object
        serialize.save()
        print(serialize.data)
    return Response(serialize.data)

@api_view(['DELETE'])
def deleteFood(request,pk):  #Set Any Field
    food = foods.objects.get(id=pk)
    food.delete()
    return Response("Deleted!")

@api_view(['GET'])
def findByName(request,pk):    #field__function  #Get List  #which field #To Get List And not tuple
    food = foods.objects.filter(n__startswith=pk).values_list('n',flat=True)
    food = list(food)
    mylist = {"namesfoods" : food}
    jsonob = json.dumps(mylist, ensure_ascii=False)
    return Response(jsonob)

@api_view(['GET'])
def GetValuesOfFood(request,food_id):
    foodValues = requests.post("https://www.goleango.com/calculators/nutrition_calculator/utils/get_hebrew_nutritional_value_for_food_id_json.php",data={'food_id' : food_id})
    jsonob = json.loads(foodValues.text)
    print(jsonob)
    #   0 = Calories ,1 =Protein , 2 = Fat,3 = Carbs,4 = Collesterol, 5 = Fiber
    foodValuesSerialize = []
    for food in jsonob:
        if(food['id'] != "223"):
            foodValuesSerialize.append(food['value'])
    return Response(foodValuesSerialize)


    
