FROM alpine

RUN apk update \
 && apk upgrade \
 && apk add --update --no-cache \
            nginx \
            supervisor \
 && rm -rf /var/cache/apk/*

ENV USER="nginx" \
    ROOT="/nginx"

RUN addgroup -S ${USER} 2> /dev/null; \
    adduser -S ${USER} -G ${USER} 2> /dev/null;

WORKDIR ${ROOT}

ADD . ./

RUN mkdir -p \
          "${ROOT}/cache" \
          "${ROOT}/logs" \
          "${ROOT}/tmp" \
 && ln -sf /dev/stdout /var/lib/nginx/logs/error.log \
 && ln -sf /dev/stdout "${ROOT}/logs/access.log" \
 && ln -sf /dev/stdout "${ROOT}/logs/error.log" \
 && chown -R ${USER}:${USER} ./ \
 && chmod u=rwX,go= -R ./

USER ${USER}

CMD supervisord -c ./supervisord.conf

