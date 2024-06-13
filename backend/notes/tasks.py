from celery import shared_task
import pandas as pd
from .models import Student
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

@shared_task
def process_file(file_path, admin_email):
    try:
        logger.info(f"Processing file: {file_path}")
        df = pd.read_csv(file_path)
        logger.info(f"File read successfully: {df.head()}")
        for _, row in df.iterrows():
            student_data = {
                'student_id': row['student_id'],
                'first_name': row['first_name'],
                'last_name': row['last_name'],
                'email': row['email'],
                'department': row['department'],
                'year': row['year']
            }
            logger.info(f"Processing row: {student_data}")
            Student.objects.create(**student_data)
        logger.info("Data saved to the database successfully.")
        send_mail(
            'Data Processing Complete',
            'The file has been successfully processed and data is saved to the database.',
            settings.EMAIL_HOST_USER,
            [admin_email],
            fail_silently=False,
        )
    except Exception as e:
        logger.error(f"Error processing file: {e}")
        send_mail(
            'Data Processing Failed',
            f'There was an error processing the file: {e}',
            settings.EMAIL_HOST_USER,
            [admin_email],
            fail_silently=False,
        )
