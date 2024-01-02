FROM node:20

RUN apt update && apt install -y unzip

RUN mkdir -p /usr/local/sap

COPY ./dockerfiles/linux/nwrfc750P_11-70002752.zip /tmp/nwrfcsdk.zip
COPY ./dockerfiles/linux/nwrfcsdk.conf /etc/ld.so.conf.d/

RUN unzip -o /tmp/nwrfcsdk.zip -d /usr/local/sap

ENV SAPNWRFC_HOME /usr/local/sap/nwrfcsdk

RUN ldconfig

# cleanup
RUN rm -rf /tmp/*

SHELL ["/bin/bash"]
