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
import * as Notifications_Common from '../_types/notifications._common'

export type Notifications_CreateConfig_Request = Global.Params & {
  body: Notifications_Common.NotificationsConfig;
}

export type Notifications_CreateConfig_Response = ApiResponse & {
  body: Notifications_CreateConfig_ResponseBody;
}

export type Notifications_CreateConfig_ResponseBody = {
  config_id?: string;
}

