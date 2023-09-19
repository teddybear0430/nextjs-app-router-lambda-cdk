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
# nodeイメージにはnodeという名前のユーザとグループがデフォルトで存在しているので、権限をnodeというユーザに変更する
# 権限を変更しないと、.next/cacheディレクトリに対して書き込みができないためキャッシュの生成ができず、
# ブラウザからアクセスしたときに500エラーで落ちる
COPY --from=builder --chown=node:node /app/.next/cache ./.next/cache

# npmのcacheファイルを削除する
RUN rm -rf /tmp/empty-cache

ENTRYPOINT ["node"]
CMD ["server.js"]
