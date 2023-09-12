# nextjs-app-router-lambda-cdk

Next.js App Router, React Server Componentを以下のインフラ構成で実行できるかの実験用リポジトリ。

## インフラ

ローカルでビルドしたDockerイメージを、Amazon Elastic Container Registry (Amazon ECR) リポジトリにアップロードして実行している。   
IaC（AWS CDK）で、インフラリソースは管理している。

ビルドサイズを削減するために、Next.jsは[standaloneモード](https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files)で実行。

- AWS
    - Lambda
    - API Gateway
    - ECR

## Dockerイメージのテスト
ランタイムインターフェイスエミュレータを使用して関数をローカルで実行することができる。

https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/images-test.html

### コンテナイメージをビルドする

```sh
docker build -t hoge .
```

### docker run でコンテナを起動する

```sh
docker run --rm -p 3000:3000 hoge:latest
```

### アクセスする

```sh
open http://localhost:3000
```
