// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to copy a model from one resource to another. The model is created with a new model ID (and
 * optionally a new description) in the destination resource, but will have the same document types as the source model.
 *
 * @summary copy a model from one resource to another
 */

import { DocumentModelAdministrationClient } from "@azure/ai-form-recognizer";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function main(): Promise<void> {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new DefaultAzureCredential();

  const random = Date.now().toString();
  const destinationModelId =
    (process.env.CUSTOM_MODEL_ID || "<model id>") + random.substring(random.length - 6);

  // The authorization must be created by the destination resource.
  const destinationClient = new DocumentModelAdministrationClient(endpoint, credential);
  const authorization = await destinationClient.getCopyAuthorization(destinationModelId);

  const sourceEndpoint = process.env.FORM_RECOGNIZER_SOURCE_ENDPOINT || "<source endpoint>";
  const sourceModelId = process.env.COPY_SOURCE_MODEL_ID || "<source model id>";

  // Then, the source resource can initiate the copy operation.
  const sourceClient = new DocumentModelAdministrationClient(sourceEndpoint, credential);

  const copyPoller = await sourceClient.beginCopyModelTo(sourceModelId, authorization);
  const model = await copyPoller.pollUntilDone();

  console.log("Model ID:", model.modelId);
  console.log("Description:", model.description);
  console.log("Created:", model.createdOn);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
