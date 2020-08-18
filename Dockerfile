FROM python:3.6

# update apt-get
RUN apt-get update -y && apt-get upgrade -y

# Install Nodejs 8
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# install dev tool
RUN apt-get install -y vim

# install aws-cli
RUN pip install awscli
RUN pip install awscli-local

# install serverless framework
RUN npm install -g serverless
RUN npm install --save-dev serverless-localstack

# setup
ARG RUNUSER
ARG RUNUID
RUN groupadd --gid $RUNUID -r $RUNUSER && useradd --uid $RUNUID --no-log-init -r -g $RUNUSER $RUNUSER
RUN mkdir -p /home/$RUNUSER
RUN chown $RUNUSER:$RUNUSER /home/$RUNUSER


# change work directory
RUN mkdir -p /app
WORKDIR /app
