FROM devopsfaith/krakend

COPY ./config /etc/krakend

EXPOSE 8080

ENTRYPOINT ["krakend", "run", "--config", "/etc/krakend/krakend.json"]
