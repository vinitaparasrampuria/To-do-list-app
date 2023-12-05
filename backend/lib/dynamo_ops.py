import json
import boto3


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TodoList')

def get_tasks():
    response = table.scan()
    return {
        'statusCode': 200,
        'body': json.dumps(response['Items'])
    }

def create_task(task):
    response = table.put_item(Item=task)
    return {
        'statusCode': 201,
        'body': json.dumps('Task created successfully')
    }

def update_task(task_id, updated_task):
    response = table.update_item(
        Key={'taskId': task_id},
        UpdateExpression='SET taskName = :taskName',
        ExpressionAttributeValues={':taskName': updated_task['taskName']}
    )
    return {
        'statusCode': 200,
        'body': json.dumps('Task updated successfully')
    }

def delete_task(task_id):
    response = table.delete_item(Key={'taskId': task_id})
    return {
        'statusCode': 200,
        'body': json.dumps('Task deleted successfully')
    }