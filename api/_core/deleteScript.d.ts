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

export interface DeleteScript_Request extends Global.Params {
  cluster_manager_timeout?: Common.Duration;
  id: Common.Id;
  master_timeout?: Common.Duration;
  timeout?: Common.Duration;
}

export interface DeleteScript_Response extends ApiResponse {
  body: DeleteScript_ResponseBody;
}

export type DeleteScript_ResponseBody = Common.AcknowledgedResponseBase

