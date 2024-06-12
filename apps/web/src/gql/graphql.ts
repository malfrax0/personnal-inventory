/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateEmplacementInput = {
  description: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateItemInput = {
  description: Scalars['String']['input'];
  emplacementId: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type Emplacement = {
  __typename?: 'Emplacement';
  children?: Maybe<Array<Emplacement>>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  items?: Maybe<Array<Maybe<Item>>>;
  parent?: Maybe<Emplacement>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FilterDate = {
  type: FilterDateType;
  value: Scalars['DateTime']['input'];
};

export enum FilterDateType {
  After = 'AFTER',
  Before = 'BEFORE',
  Equals = 'EQUALS'
}

export type FilterString = {
  type: FilterStringType;
  value: Scalars['String']['input'];
};

export type FilterStringList = {
  type: FilterStringListType;
  value: Array<Scalars['String']['input']>;
};

export enum FilterStringListType {
  In = 'IN',
  NotIn = 'NOT_IN'
}

export enum FilterStringType {
  Contains = 'CONTAINS',
  EndsWith = 'ENDS_WITH',
  Equals = 'EQUALS',
  StartsWith = 'STARTS_WITH'
}

export type Item = {
  __typename?: 'Item';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  emplacement: Emplacement;
  id: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEmplacement: Emplacement;
  createItem: Item;
  deleteEmplacement: Emplacement;
  deleteItem: Item;
  updateEmplacement: Emplacement;
  updateItem: Item;
};


export type MutationCreateEmplacementArgs = {
  input: CreateEmplacementInput;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationDeleteEmplacementArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateEmplacementArgs = {
  id: Scalars['String']['input'];
  input: UpdateEmplacementInput;
};


export type MutationUpdateItemArgs = {
  id: Scalars['String']['input'];
  input: UpdateItemInput;
};

export type Query = {
  __typename?: 'Query';
  emplacement?: Maybe<Emplacement>;
  emplacements: Array<Emplacement>;
  item?: Maybe<Item>;
  items: Array<Item>;
  ready?: Maybe<Scalars['Boolean']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};


export type QueryEmplacementArgs = {
  id: Scalars['String']['input'];
};


export type QueryItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryItemsArgs = {
  search?: InputMaybe<SearchItemAggregation>;
};

export type SearchItemAggregation = {
  filter?: InputMaybe<SearchItemFilter>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchItemFilter = {
  description?: InputMaybe<FilterString>;
  emplacementId?: InputMaybe<FilterString>;
  tags?: InputMaybe<FilterStringList>;
  title?: InputMaybe<FilterString>;
};

export type UpdateEmplacementInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  emplacementId?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Q_EmplacementsQueryVariables = Exact<{ [key: string]: never; }>;


export type Q_EmplacementsQuery = { __typename?: 'Query', emplacements: Array<{ __typename?: 'Emplacement', id: string, title: string, description: string, createdAt: any, updatedAt: any }> };

export type Q_EmplacementQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type Q_EmplacementQuery = { __typename?: 'Query', emplacement?: { __typename?: 'Emplacement', id: string, title: string, description: string, createdAt: any, updatedAt: any, parent?: { __typename?: 'Emplacement', id: string, title: string } | null, items?: Array<{ __typename?: 'Item', id: string, title: string, description: string, tags: Array<string> } | null> | null } | null };

export type Q_ReadyQueryVariables = Exact<{ [key: string]: never; }>;


export type Q_ReadyQuery = { __typename?: 'Query', ready?: boolean | null };


export const Q_EmplacementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Q_EMPLACEMENTS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emplacements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<Q_EmplacementsQuery, Q_EmplacementsQueryVariables>;
export const Q_EmplacementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Q_EMPLACEMENT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emplacement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]} as unknown as DocumentNode<Q_EmplacementQuery, Q_EmplacementQueryVariables>;
export const Q_ReadyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Q_READY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ready"}}]}}]} as unknown as DocumentNode<Q_ReadyQuery, Q_ReadyQueryVariables>;