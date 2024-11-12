FROM registry.cn-hangzhou.aliyuncs.com/jeecgdocker/alpine-java:8_server-jre_unlimited

MAINTAINER eemp@edu.com

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

#RUN mkdir -p /jeecg-boot/config/jeecg/

WORKDIR /eemp

EXPOSE 8080

ADD ./target/eemp-server-1.0.0.jar ./

CMD sleep 20; java -Djava.security.egd=file:/dev/./urandom -jar eemp-server-1.0.0.jar