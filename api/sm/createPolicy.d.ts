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
import * as Global from '../_types/_global'
import * as Sm_Common from '../_types/sm._common'

export interface Sm_CreatePolicy_Request extends Global.Params {
  body?: Sm_Common.CreateUpdatePolicyRequest;
  policy_name: string;
}

export interface Sm_CreatePolicy_Response extends ApiResponse {
  body: Sm_CreatePolicy_ResponseBody;
}

export type Sm_CreatePolicy_ResponseBody = Sm_Common.PolicyResponse

