# Generated by Django 3.1.4 on 2021-01-04 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_toppings_quantity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='toppings',
            name='price',
        ),
        migrations.RemoveField(
            model_name='toppings',
            name='quantity',
        ),
        migrations.AddField(
            model_name='pizza',
            name='toppingQuantity',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
