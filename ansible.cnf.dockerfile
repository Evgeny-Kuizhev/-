FROM ubuntu:16.04

USER root

RUN \
  apt-get update && \
  apt-get install -y software-properties-common && \
  apt-add-repository ppa:ansible/ansible && \
  apt-get update && \
  apt-get install -y --force-yes ansible

COPY ansible.cfg /etc/ansible/ansible.cfg
COPY hosts /etc/ansible/hosts

COPY nginx_config.cfg /home/nginx.conf.tpl
COPY sites-enabled.cfg /home/default.tpl
RUN mkdir /ansible

COPY playbook.yml /ansible/playbook.yml

WORKDIR /ansible