FROM python:3

# Prepare environement
ENV PYTHONBUFFERED 1

RUN mkdir /code
WORKDIR /code

# Install dependencies
COPY ./requirements.txt /code/

RUN pip install -U pip
RUN pip install -r requirements.txt

# Copy code
COPY . /code

EXPOSE 80
ENTRYPOINT python -u manage.py runserver 0.0.0.0:80
