# Generated by Django 5.0.1 on 2024-01-15 11:02

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GenPass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site', models.CharField(max_length=30)),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('password', models.CharField(max_length=300)),
            ],
        ),
    ]
