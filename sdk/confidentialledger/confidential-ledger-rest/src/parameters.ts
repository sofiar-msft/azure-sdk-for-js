// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type { Bundle, LedgerEntry, LedgerUser } from "./models.js";

export type GetConstitutionParameters = RequestParameters;
export type ListConsortiumMembersParameters = RequestParameters;
export type GetEnclaveQuotesParameters = RequestParameters;
export type ListCollectionsParameters = RequestParameters;
export type ListUserDefinedFunctionsParameters = RequestParameters;

export interface ListLedgerEntriesQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
  /** Specify the first transaction ID in a range. */
  fromTransactionId?: string;
  /** Specify the last transaction ID in a range. */
  toTransactionId?: string;
}

export interface ListLedgerEntriesQueryParam {
  queryParameters?: ListLedgerEntriesQueryParamProperties;
}

export type ListLedgerEntriesParameters = ListLedgerEntriesQueryParam & RequestParameters;

export interface CreateLedgerEntryBodyParam {
  /** Ledger entry. */
  body: LedgerEntry;
}

export interface CreateLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface CreateLedgerEntryQueryParam {
  queryParameters?: CreateLedgerEntryQueryParamProperties;
}

export interface CreateLedgerEntryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateLedgerEntryParameters = CreateLedgerEntryQueryParam &
  CreateLedgerEntryMediaTypesParam &
  CreateLedgerEntryBodyParam &
  RequestParameters;

export interface GetLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface GetLedgerEntryQueryParam {
  queryParameters?: GetLedgerEntryQueryParamProperties;
}

export type GetLedgerEntryParameters = GetLedgerEntryQueryParam & RequestParameters;
export type GetReceiptParameters = RequestParameters;
export type GetTransactionStatusParameters = RequestParameters;

export interface GetCurrentLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface GetCurrentLedgerEntryQueryParam {
  queryParameters?: GetCurrentLedgerEntryQueryParamProperties;
}

export type GetCurrentLedgerEntryParameters = GetCurrentLedgerEntryQueryParam & RequestParameters;
export type ListUsersParameters = RequestParameters;
export type DeleteUserParameters = RequestParameters;
export type GetUserParameters = RequestParameters;
/** Details about a Confidential Ledger user. */
export type LedgerUserResourceMergeAndPatch = Partial<LedgerUser>;

export interface CreateOrUpdateUserBodyParam {
  /** Details about a Confidential Ledger user. */
  body: LedgerUserResourceMergeAndPatch;
}

export interface CreateOrUpdateUserMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type CreateOrUpdateUserParameters = CreateOrUpdateUserMediaTypesParam &
  CreateOrUpdateUserBodyParam &
  RequestParameters;

export type GetUserDefinedEndpointParameters = RequestParameters;

export interface CreateUserDefinedEndpointBodyParam {
  /** bundle parameter description */
  body: Bundle;
}

export interface CreateUserDefinedEndpointMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateUserDefinedEndpointParameters = CreateUserDefinedEndpointMediaTypesParam &
  CreateUserDefinedEndpointBodyParam &
  RequestParameters;
