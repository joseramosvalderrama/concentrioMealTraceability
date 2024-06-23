FROM public.ecr.aws/lambda/nodejs:18 as builder
WORKDIR /usr/src/app/
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm ci --omit=dev

FROM public.ecr.aws/lambda/nodejs:18
ENV NODE_ENV production
COPY --from=builder /usr/src/app/node_modules ${LAMBDA_TASK_ROOT}/node_modules
COPY src ${LAMBDA_TASK_ROOT}/src
COPY package.json ${LAMBDA_TASK_ROOT}
CMD ["src/index.handler"]