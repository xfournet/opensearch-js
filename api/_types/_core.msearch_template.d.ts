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

import * as Common from './_common'
import * as Core_Msearch from './_core.msearch'

export type RequestItem = Core_Msearch.MultisearchHeader | TemplateConfig

export type TemplateConfig = {
  explain?: boolean;
  id?: Common.Id;
  params?: Record<string, Record<string, any>>;
  profile?: boolean;
  source?: string;
}

