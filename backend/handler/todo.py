import json
from backend.lib.dynamo_ops import *



def lambda_handler(event, context):
    http_method = event['httpMethod']
    
    if http_method == 'GET':
        return get_tasks()
    elif http_method == 'POST':
        return create_task(json.loads(event['body']))
    elif http_method == 'PUT':
        return update_task(event['pathParameters']['taskId'], json.loads(event['body']))
    elif http_method == 'DELETE':
        return delete_task(event['pathParameters']['taskId'])
    else:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid HTTP Method')
        }


