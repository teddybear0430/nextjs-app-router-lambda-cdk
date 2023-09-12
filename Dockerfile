FROM node:18-alpine as builder
WORKDIR /app

COPY . .
RUN npm install -g pnpm
RUN pnpm update && pnpm build

# AWSが提供するベースイメージのを使用して、関数コードのコンテナイメージを構築する
FROM public.ecr.aws/lambda/nodejs:18 as runner
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.1 /lambda-adapter /opt/extensions/lambda-adapter

ENV PORT=3000
ENV NODE_ENV=production

# Lambda関数のルートディレクトリのパス
WORKDIR ${LAMBDA_TASK_ROOT}

# ビルド時に生成したリソースをLambda関数のルートディレクトリにコピーする
# standaloneモードを利用すると、publicと.next/staticはデフォルトでは含まれないので明示的にコピーする必要がある
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# npmのcacheファイルを削除する
RUN rm -rf /tmp/empty-cache

# rootで実行する必要がないので、非ルートユーザを指定するようにして、実行権限は最小限に留める
USER 1001

ENTRYPOINT ["node"]
CMD ["server.js"]
