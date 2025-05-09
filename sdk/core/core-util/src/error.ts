// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isError } from "@typespec/ts-http-runtime/internal/util";

/**
 * Given what is thought to be an error object, return the message if possible.
 * If the message is missing, returns a stringified version of the input.
 * @param e - Something thrown from a try block
 * @returns The error message or a string of the input
 */
export function getErrorMessage(e: unknown): string {
  if (isError(e)) {
    return e.message;
  } else {
    let stringified: string;
    try {
      if (typeof e === "object" && e) {
        stringified = JSON.stringify(e);
      } else {
        stringified = String(e);
      }
    } catch (err: any) {
      stringified = "[unable to stringify input]";
    }
    return `Unknown error ${stringified}`;
  }
}
