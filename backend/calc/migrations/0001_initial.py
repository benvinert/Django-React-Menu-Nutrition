# Generated by Django 3.1.2 on 2020-11-02 21:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='foods',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('i', models.TextField()),
                ('n', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Meta',
            fields=[
                ('foods_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='calc.foods')),
            ],
            bases=('calc.foods',),
        ),
    ]
