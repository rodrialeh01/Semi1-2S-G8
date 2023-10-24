import boto3
translate_client = boto3.client('translate')
def lambda_handler(event, context): 
    review_text = event['text']
    language = event['language']

    translate_response = translate_client.translate_text(
        Text=review_text,
        SourceLanguageCode='auto',
        TargetLanguageCode=language 
    )
    print(translate_response)    
    return translate_response['TranslatedText']
