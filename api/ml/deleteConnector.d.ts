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

export type Ml_DeleteConnector_Request = Global.Params & {
  connector_id: string;
}

export type Ml_DeleteConnector_Response = ApiResponse & {
  body: Ml_DeleteConnector_ResponseBody;
}

export type Ml_DeleteConnector_ResponseBody = Common.WriteResponseBase

