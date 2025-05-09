// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to iterate over the custom classifiers in a resource.
 *
 * @summary iterate over the classifiers in a resource
 */

import { DocumentModelAdministrationClient } from "@azure/ai-form-recognizer";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

async function main(): Promise<void> {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new DefaultAzureCredential();

  const client = new DocumentModelAdministrationClient(endpoint, credential);

  for await (const classifier of client.listDocumentClassifiers()) {
    console.log("- ID", classifier.classifierId);
    console.log("  Created:", classifier.createdOn);
    console.log("  Description: ", classifier.description || "<none>");

    console.log("  Document Types:");
    for (const [docType, info] of Object.entries(classifier.docTypes ?? {})) {
      console.log(`  - ${docType} (Training URL: ${info.azureBlobSource?.containerUrl})`);
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
