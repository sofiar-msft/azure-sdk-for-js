/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Delete a Asset
 *
 * @summary Delete a Asset
 * x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Delete_Asset.json
 */
async function deleteAnAsset() {
  const subscriptionId =
    process.env["DEVICEREGISTRY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const assetName = "my-asset";
  const credential = new DefaultAzureCredential();
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.beginDeleteAndWait(resourceGroupName, assetName);
  console.log(result);
}

async function main() {
  deleteAnAsset();
}

main().catch(console.error);
