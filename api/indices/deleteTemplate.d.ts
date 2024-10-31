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

export type Indices_DeleteTemplate_Request = Global.Params & {
  cluster_manager_timeout?: Common.Duration;
  master_timeout?: Common.Duration;
  name: Common.Name;
  timeout?: Common.Duration;
}

export type Indices_DeleteTemplate_Response = ApiResponse & {
  body: Indices_DeleteTemplate_ResponseBody;
}

export type Indices_DeleteTemplate_ResponseBody = Common.AcknowledgedResponseBase

