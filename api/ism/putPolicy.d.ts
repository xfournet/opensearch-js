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
import * as Ism_Common from '../_types/ism._common'

export type Ism_PutPolicy_Request = Global.Params & {
  body?: Ism_Common.PutPolicyRequest;
  if_primary_term?: number;
  if_seq_no?: Common.SequenceNumber;
  policy_id: string;
}

export type Ism_PutPolicy_Response = ApiResponse & {
  body: Ism_PutPolicy_ResponseBody;
}

export type Ism_PutPolicy_ResponseBody = Ism_Common.PutPolicyResponse

