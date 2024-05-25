from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

import sys
import os

sys.path.append(os.path.dirname(__file__))

import ml
import datahandler


@method_decorator(csrf_exempt, name="dispatch")
class TrainModelView(View):

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        try:
            if request.method != "POST":
                return JsonResponse(
                    {"status": "error", "message": "Invalid request method"}, status=405
                )
            data = json.loads(request.body)
            # print(data)
            # Call your model training function
            result = ml.main(data)
            result = {"status": "success", "message": "Model training is successful"}
            return JsonResponse(result, status=200)
        except json.JSONDecodeError:
            return JsonResponse(
                {"status": "error", "message": "Invalid JSON format"}, status=400
            )
        except Exception as e:
            return JsonResponse({"status": "errorrrrrr", "message": str(e)}, status=500)


# Path: recommender_server/recommender/contentbased/views.py


class AddNewMovieView(View):

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        try:
            if request.method != "POST":
                return JsonResponse(
                    {"status": "error", "message": "Invalid request method"}, status=405
                )
            data = json.loads(request.body)
            # print(">>>>>>>>",data)
            # Call your model training function
            result = datahandler.add_new_movie(data[0], "movies.csv")
            # print(result)
            datahandler.transform(
                "movies.csv",
                "tfidf_matrix.csv",
            )
            return JsonResponse(
                {"status": "success", "message": "New movie added successfully"},
                status=200,
            )
        except json.JSONDecodeError:
            return JsonResponse(
                {"status": "error", "message": "Invalid JSON format"}, status=400
            )
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
