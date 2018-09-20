FROM solita/ansible-ssh
COPY id_rsa.pub /tmp/
RUN cat /tmp/id_rsa.pub >> /home/ansible/.ssh/authorized_keys && rm -f /tmp/id_rsa.pub


# # Start with the node image
# FROM ubuntu:16.04

# Update apt cache
RUN apt-get -y update
# Install ansible dependencies
RUN apt-get install -y python-yaml python-jinja2 git
# Clone ansible repo (could also add the ansible PPA and do an apt-get install instead)
RUN git clone http://github.com/ansible/ansible.git /tmp/ansible

# Set variables for ansible
WORKDIR /tmp/ansible
RUN mkdir -p /etc/ansible/
ENV PATH /tmp/ansible/bin:/sbin:/usr/sbin:/usr/bin
ENV ANSIBLE_LIBRARY /tmp/ansible/library
ENV PYTHONPATH /tmp/ansible/lib:$PYTHON_PATH

# add playbooks to the image. This might be a git repo instead
ADD playbook.yml /etc/ansible/
ADD inventory /etc/ansible/hosts
RUN touch /etc/ansible/ansible.cfg
RUN echo "inventory = /etc/ansible/inventory" > /etc/ansible/ansible.cfg
WORKDIR /etc/ansible

# Run ansible using the site.yml playbook
RUN ansible-playbook /etc/ansible/playbook.yml -c local



# FROM node:8.9.3

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY ./package.json /usr/src/app/
# RUN npm install
# COPY . /usr/src/app

# EXPOSE 3000
# CMD [ "node", "index.js" ]