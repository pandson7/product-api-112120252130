#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ProductApiStack112120252130 } from '../lib/cdk-stack';

const app = new cdk.App();
new ProductApiStack112120252130(app, 'ProductApiStack112120252130', {});
