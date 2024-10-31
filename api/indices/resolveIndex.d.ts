/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 */

/*
 * This file was generated from the OpenSearch API Spec. Do NOT edit it
 * manually. If you want to make changes, either update the spec or
 * modify the API generator.
 */

import { ApiResponse } from '../../lib/Transport'
import * as Common from '../_types/_common'
import * as Global from '../_types/_global'
import * as Indices_ResolveIndex from '../_types/indices.resolve_index'

export type Indices_ResolveIndex_Request = Global.Params & {
  expand_wildcards?: Common.ExpandWildcards;
  name: Common.Names;
}

export type Indices_ResolveIndex_Response = ApiResponse & {
  body: Indices_ResolveIndex_ResponseBody;
}

export type Indices_ResolveIndex_ResponseBody = {
  aliases: Indices_ResolveIndex.ResolveIndexAliasItem[];
  data_streams: Indices_ResolveIndex.ResolveIndexDataStreamsItem[];
  indices: Indices_ResolveIndex.ResolveIndexItem[];
}

