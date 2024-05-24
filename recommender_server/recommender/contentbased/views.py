from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@method_decorator(csrf_exempt, name='dispatch')
class TrainModelView(View):
    def get(self, request, *args, **kwargs):
        try:
            # data = json.loads(request.body)
            # # Call your model training function
            # result = train_model_function(data)
            result = {"status": "success", "message": "Model training is successful"}
            return JsonResponse(result)
        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
# Path: recommender_server/recommender/contentbased/views.py
