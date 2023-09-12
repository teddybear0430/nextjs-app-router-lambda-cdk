FROM node:18-alpine as builder
WORKDIR /app

COPY . .
RUN npm update && npm run build

FROM public.ecr.aws/lambda/nodejs:18 as runner
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.1 /lambda-adapter /opt/extensions/lambda-adapter

ENV PORT=3000
ENV NODE_ENV=production

 # Lambda 関数コードへのパスを指定
WORKDIR ${LAMBDA_TASK_ROOT}

# standalone モードを利用すると、publicと.next/staticはデフォルトでは含まれないので明示的にコピーする必要がある
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENTRYPOINT ["node"]
CMD ["server.js"]
