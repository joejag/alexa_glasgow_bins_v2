#!/usr/bin/env node
import cdk = require("@aws-cdk/core")
import lambda = require("@aws-cdk/aws-lambda")

export class WidgetService extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id)

    new lambda.Function(this, "WidgetHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.AssetCode.asset("resources"),
      handler: "widgets.main",
    })
  }
}

export class MyWidgetServiceStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new WidgetService(this, "Widgets")
  }
}

const app = new cdk.App()
new MyWidgetServiceStack(app, "MyWidgetServiceStack")
app.synth()
