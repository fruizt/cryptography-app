# syntax=docker/dockerfile:1
FROM python:3.9

COPY ./app /app/app
COPY ./requirements.txt /app
COPY ./main.py /app
COPY ./quadgram.txt /app
COPY ./trigram.txt /app
# 
WORKDIR /app
# 
# RUN apt-get update && \
#       apt-get -y install sudo
# # 
# RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo

# USER docker
# RUN sudo usermod -aG docker $(whoami)

RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=80","--reload"]
