FROM alpine

RUN apk update \
 && apk upgrade \
 && apk add --update --no-cache \
            nodejs \
 && rm -rf /var/cache/apk/*

ENV USER="nodejs" \
    ROOT="/nodejs"

RUN addgroup -S ${USER} 2> /dev/null; \
    adduser -S ${USER} -G ${USER} 2> /dev/null;

WORKDIR ${ROOT}

ADD ./package.json ./
RUN npm install --production

ADD . ./

RUN chown -R ${USER}:${USER} ./ \
 && chmod u=rwX,go= -R ./

USER ${USER}

CMD node ./server
