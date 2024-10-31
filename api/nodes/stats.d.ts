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
import * as Nodes_Stats from '../_types/nodes.stats'

export type Nodes_Stats_Request = Global.Params & {
  completion_fields?: Common.Fields;
  fielddata_fields?: Common.Fields;
  fields?: Common.Fields;
  groups?: string[];
  include_segment_file_sizes?: boolean;
  index_metric?: Nodes_Stats.IndexMetric[];
  level?: Common.Level;
  metric?: Nodes_Stats.Metric[];
  node_id?: Common.NodeIds;
  timeout?: Common.Duration;
  types?: string[];
}

export type Nodes_Stats_Response = ApiResponse & {
  body: Nodes_Stats_ResponseBody;
}

export type Nodes_Stats_ResponseBody = Nodes_Stats.ResponseBase

