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

'use strict';

const { normalizeArguments } = require('../utils');

/**
 * Returns a list of built-in grok patterns.
 * <br/> See Also: {@link https://opensearch.org/docs/latest - ingest.processor_grok}
 *
 * @memberOf API-Ingest
 *
 * @param {object} [params]
 * @param {boolean} [params.s=false] - Determines how to sort returned grok patterns by key name.
 *
 * @param {TransportRequestOptions} [options] - Options for {@link Transport#request}
 * @param {function} [callback] - Callback that handles errors and response
 *
 * @returns {{abort: function(), then: function(), catch: function()}|Promise<never>|*}
 */
function processorGrokFunc(params, options, callback) {
  [params, options, callback] = normalizeArguments(params, options, callback);

  let { body, ...querystring } = params;

  const path = '/_ingest/processor/grok';
  const method = 'GET';
  body = body || '';

  return this.transport.request({ method, path, querystring, body }, options, callback);
}

module.exports = processorGrokFunc;
