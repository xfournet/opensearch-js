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
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict';

const { test } = require('tap');
const { URL } = require('url');
const BaseConnectionPool = require('../../lib/pool/BaseConnectionPool');
const Connection = require('../../lib/Connection');

test('API', (t) => {
  t.test('addConnection', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    const href = 'http://localhost:9200/';
    pool.addConnection(href);
    t.ok(pool.connections.find((c) => c.id === href) instanceof Connection);
    t.equal(pool.connections.find((c) => c.id === href).status, Connection.statuses.ALIVE);
    t.end();
  });

  t.test('addConnection should throw with two connections with the same id', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    const href = 'http://localhost:9200/';
    pool.addConnection(href);
    try {
      pool.addConnection(href);
      t.fail('Should throw');
    } catch (err) {
      t.equal(err.message, `Connection with id '${href}' is already present`);
    }
    t.end();
  });

  t.test('addConnection should handle not-friendly url parameters for user and password', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    const href = 'http://us"er:p@assword@localhost:9200/';
    pool.addConnection(href);
    const conn = pool.connections[0];
    t.equal(conn.url.username, 'us%22er');
    t.equal(conn.url.password, 'p%40assword');
    t.match(conn.headers, {
      authorization: 'Basic ' + Buffer.from('us"er:p@assword').toString('base64'),
    });
    t.end();
  });

  t.test('addConnection with only URL', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    const href = 'http://localhost:9200/';
    pool.addConnection({ url: new URL(href) });
    t.ok(pool.connections.find((c) => c.id === href) instanceof Connection);
    t.equal(pool.connections.find((c) => c.id === href).status, Connection.statuses.ALIVE);
    t.end();
  });

  t.test('markDead', (t) => {
    const pool = new BaseConnectionPool({ Connection, sniffEnabled: true });
    const href = 'http://localhost:9200/';
    let connection = pool.addConnection(href);
    t.same(pool.markDead(connection), pool);
    connection = pool.connections.find((c) => c.id === href);
    t.equal(connection.status, Connection.statuses.ALIVE);
    t.end();
  });

  t.test('markAlive', (t) => {
    const pool = new BaseConnectionPool({ Connection, sniffEnabled: true });
    const href = 'http://localhost:9200/';
    let connection = pool.addConnection(href);
    t.same(pool.markAlive(connection), pool);
    connection = pool.connections.find((c) => c.id === href);
    t.equal(connection.status, Connection.statuses.ALIVE);
    t.end();
  });

  t.test('getConnection should throw', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    const href = 'http://localhost:9200/';
    pool.addConnection(href);
    try {
      pool.getConnection();
      t.fail('Should fail');
    } catch (err) {
      t.equal(err.message, 'getConnection must be implemented');
    }
    t.end();
  });

  t.test('removeConnection', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    const href = 'http://localhost:9200/';
    const connection = pool.addConnection(href);
    pool.removeConnection(connection);
    t.equal(pool.size, 0);
    t.end();
  });

  t.test('empty', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    pool.addConnection('http://localhost:9200/');
    pool.addConnection('http://localhost:9201/');
    pool.empty(() => {
      t.equal(pool.size, 0);
      t.end();
    });
  });

  t.test('empty with no callback', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    pool.addConnection('http://localhost:9200/');
    pool.addConnection('http://localhost:9201/');
    pool.empty();
    t.equal(pool.size, 0);
    t.end();
  });

  t.test('call empty twice', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    pool.addConnection('http://localhost:9200/');
    pool.addConnection('http://localhost:9201/');
    try {
      pool.empty();
      pool.empty(() => {
        t.equal(pool.size, 0);
        t.pass();
      });
    } catch (error) {
      t.fail('Should not throw');
    }
    t.end();
  });

  t.test('urlToHost', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    const url = 'http://localhost:9200';
    t.same(pool.urlToHost(url), { url: new URL(url) });
    t.end();
  });

  // TODO: modify node roles when master is not supported
  t.test('nodesToHost', (t) => {
    t.test('publish_address as ip address (IPv4)', (t) => {
      const pool = new BaseConnectionPool({ Connection });
      const nodes = {
        a1: {
          http: {
            publish_address: '127.0.0.1:9200',
          },
          roles: ['cluster_manager', 'data', 'ingest'],
        },
        a2: {
          http: {
            publish_address: '127.0.0.1:9201',
          },
          roles: ['master', 'data', 'ingest'],
        },
      };

      t.same(pool.nodesToHost(nodes, 'http:'), [
        {
          url: new URL('http://127.0.0.1:9200'),
          id: 'a1',
          roles: {
            cluster_manager: true,
            data: true,
            ingest: true,
          },
        },
        {
          url: new URL('http://127.0.0.1:9201'),
          id: 'a2',
          roles: {
            master: true,
            data: true,
            ingest: true,
          },
        },
      ]);

      t.equal(pool.nodesToHost(nodes, 'http:')[0].url.host, '127.0.0.1:9200');
      t.equal(pool.nodesToHost(nodes, 'http:')[1].url.host, '127.0.0.1:9201');
      t.end();
    });

    t.test('publish_address as ip address (IPv6)', (t) => {
      const pool = new BaseConnectionPool({ Connection });
      const nodes = {
        a1: {
          http: {
            publish_address: '[::1]:9200',
          },
          roles: ['cluster_manager', 'data', 'ingest'],
        },
        a2: {
          http: {
            publish_address: '[::1]:9201',
          },
          roles: ['master', 'data', 'ingest'],
        },
      };

      t.same(pool.nodesToHost(nodes, 'http:'), [
        {
          url: new URL('http://[::1]:9200'),
          id: 'a1',
          roles: {
            cluster_manager: true,
            data: true,
            ingest: true,
          },
        },
        {
          url: new URL('http://[::1]:9201'),
          id: 'a2',
          roles: {
            master: true,
            data: true,
            ingest: true,
          },
        },
      ]);

      t.equal(pool.nodesToHost(nodes, 'http:')[0].url.host, '[::1]:9200');
      t.equal(pool.nodesToHost(nodes, 'http:')[1].url.host, '[::1]:9201');
      t.end();
    });

    t.test('publish_address as host/ip (IPv4)', (t) => {
      const pool = new BaseConnectionPool({ Connection });
      const nodes = {
        a1: {
          http: {
            publish_address: 'example.com/127.0.0.1:9200',
          },
          roles: ['cluster_manager', 'data', 'ingest'],
        },
        a2: {
          http: {
            publish_address: 'example.com/127.0.0.1:9201',
          },
          roles: ['master', 'data', 'ingest'],
        },
      };

      t.same(pool.nodesToHost(nodes, 'http:'), [
        {
          url: new URL('http://example.com:9200'),
          id: 'a1',
          roles: {
            cluster_manager: true,
            data: true,
            ingest: true,
          },
        },
        {
          url: new URL('http://example.com:9201'),
          id: 'a2',
          roles: {
            master: true,
            data: true,
            ingest: true,
          },
        },
      ]);

      t.equal(pool.nodesToHost(nodes, 'http:')[0].url.host, 'example.com:9200');
      t.equal(pool.nodesToHost(nodes, 'http:')[1].url.host, 'example.com:9201');
      t.end();
    });

    t.test('publish_address as host/ip (IPv6)', (t) => {
      const pool = new BaseConnectionPool({ Connection });
      const nodes = {
        a1: {
          http: {
            publish_address: 'example.com/[::1]:9200',
          },
          roles: ['cluster_manager', 'data', 'ingest'],
        },
        a2: {
          http: {
            publish_address: 'example.com/[::1]:9201',
          },
          roles: ['master', 'data', 'ingest'],
        },
      };

      t.same(pool.nodesToHost(nodes, 'http:'), [
        {
          url: new URL('http://example.com:9200'),
          id: 'a1',
          roles: {
            cluster_manager: true,
            data: true,
            ingest: true,
          },
        },
        {
          url: new URL('http://example.com:9201'),
          id: 'a2',
          roles: {
            master: true,
            data: true,
            ingest: true,
          },
        },
      ]);

      t.equal(pool.nodesToHost(nodes, 'http:')[0].url.host, 'example.com:9200');
      t.equal(pool.nodesToHost(nodes, 'http:')[1].url.host, 'example.com:9201');
      t.end();
    });

    t.test('Should use the configure protocol', (t) => {
      const pool = new BaseConnectionPool({ Connection });
      const nodes = {
        a1: {
          http: {
            publish_address: 'example.com/127.0.0.1:9200',
          },
          roles: ['cluster_manager', 'data', 'ingest'],
        },
        a2: {
          http: {
            publish_address: 'example.com/127.0.0.1:9201',
          },
          roles: ['master', 'data', 'ingest'],
        },
      };

      t.equal(pool.nodesToHost(nodes, 'https:')[0].url.protocol, 'https:');
      t.equal(pool.nodesToHost(nodes, 'http:')[1].url.protocol, 'http:');
      t.end();
    });

    t.end();
  });

  // TODO: modify node roles when master is not supported
  t.test('update', (t) => {
    t.test('Should not update existing connections', (t) => {
      t.plan(2);
      const pool = new BaseConnectionPool({ Connection });
      pool.addConnection([
        {
          url: new URL('http://127.0.0.1:9200'),
          id: 'a1',
          roles: {
            cluster_manager: true,
            data: true,
            ingest: true,
          },
        },
        {
          url: new URL('http://127.0.0.1:9201'),
          id: 'a2',
          roles: {
            master: true,
            data: true,
            ingest: true,
          },
        },
      ]);

      pool.update([
        {
          url: new URL('http://127.0.0.1:9200'),
          id: 'a1',
          roles: null,
        },
        {
          url: new URL('http://127.0.0.1:9201'),
          id: 'a2',
          roles: null,
        },
      ]);

      t.ok(pool.connections.find((c) => c.id === 'a1').roles !== null);
      t.ok(pool.connections.find((c) => c.id === 'a2').roles !== null);
    });

    t.test('Should not update existing connections (mark alive)', (t) => {
      t.plan(5);
      class CustomBaseConnectionPool extends BaseConnectionPool {
        markAlive(connection) {
          t.ok('called');
          super.markAlive(connection);
        }
      }
      const pool = new CustomBaseConnectionPool({ Connection });
      const conn1 = pool.addConnection({
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: {
          cluster_manager: true,
          data: true,
          ingest: true,
        },
      });

      const conn2 = pool.addConnection({
        url: new URL('http://127.0.0.1:9201'),
        id: 'a2',
        roles: {
          master: true,
          data: true,
          ingest: true,
        },
      });

      pool.markDead(conn1);
      pool.markDead(conn2);

      pool.update([
        {
          url: new URL('http://127.0.0.1:9200'),
          id: 'a1',
          roles: null,
        },
        {
          url: new URL('http://127.0.0.1:9201'),
          id: 'a2',
          roles: null,
        },
      ]);

      t.ok(pool.connections.find((c) => c.id === 'a1').roles !== null);
      t.ok(pool.connections.find((c) => c.id === 'a2').roles !== null);
    });

    // TODO: remove this test when master is not supported
    t.test('Should not update existing connections (master, same url, different id)', (t) => {
      t.plan(3);
      class CustomBaseConnectionPool extends BaseConnectionPool {
        markAlive(connection) {
          t.ok('called');
          super.markAlive(connection);
        }
      }
      const pool = new CustomBaseConnectionPool({ Connection });
      pool.addConnection([
        {
          url: new URL('http://127.0.0.1:9200'),
          id: 'http://127.0.0.1:9200/',
          roles: {
            master: true,
            data: true,
            ingest: true,
          },
        },
      ]);

      pool.update([
        {
          url: new URL('http://127.0.0.1:9200'),
          id: 'a1',
          roles: true,
        },
      ]);

      // roles will never be updated, we only use it to do
      // a dummy check to see if the connection has been updated
      t.same(pool.connections.find((c) => c.id === 'a1').roles, {
        master: true,
        data: true,
        ingest: true,
      });
      t.equal(
        pool.connections.find((c) => c.id === 'http://127.0.0.1:9200/'),
        undefined
      );
    });

    t.test(
      'Should not update existing connections (cluster_manager, same url, different id)',
      (t) => {
        t.plan(3);
        class CustomBaseConnectionPool extends BaseConnectionPool {
          markAlive(connection) {
            t.ok('called');
            super.markAlive(connection);
          }
        }
        const pool = new CustomBaseConnectionPool({ Connection });
        pool.addConnection([
          {
            url: new URL('http://127.0.0.1:9200'),
            id: 'http://127.0.0.1:9200/',
            roles: {
              cluster_manager: true,
              data: true,
              ingest: true,
            },
          },
        ]);

        pool.update([
          {
            url: new URL('http://127.0.0.1:9200'),
            id: 'a1',
            roles: true,
          },
        ]);

        // roles will never be updated, we only use it to do
        // a dummy check to see if the connection has been updated
        t.same(pool.connections.find((c) => c.id === 'a1').roles, {
          cluster_manager: true,
          data: true,
          ingest: true,
        });
        t.equal(
          pool.connections.find((c) => c.id === 'http://127.0.0.1:9200/'),
          undefined
        );
      }
    );

    t.test('Add a new connection', (t) => {
      t.plan(2);
      const pool = new BaseConnectionPool({ Connection });
      pool.addConnection({
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: {
          master: true,
          data: true,
          ingest: true,
        },
      });

      pool.update([
        {
          url: new URL('http://127.0.0.1:9200'),
          id: 'a1',
          roles: null,
        },
        {
          url: new URL('http://127.0.0.1:9201'),
          id: 'a2',
          roles: null,
        },
      ]);

      t.ok(pool.connections.find((c) => c.id === 'a1').roles !== null);
      t.ok(pool.connections.find((c) => c.id === 'a2'));
    });

    t.test('Remove old connections', (t) => {
      t.plan(3);
      const pool = new BaseConnectionPool({ Connection });
      pool.addConnection({
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: null,
      });

      pool.update([
        {
          url: new URL('http://127.0.0.1:9200'),
          id: 'a2',
          roles: null,
        },
        {
          url: new URL('http://127.0.0.1:9201'),
          id: 'a3',
          roles: null,
        },
      ]);

      t.notOk(pool.connections.find((c) => c.id === 'a1'));
      t.ok(pool.connections.find((c) => c.id === 'a2'));
      t.ok(pool.connections.find((c) => c.id === 'a3'));
    });

    t.end();
  });

  t.test('CreateConnection', (t) => {
    t.plan(1);
    const pool = new BaseConnectionPool({ Connection });
    const conn = pool.createConnection('http://localhost:9200');
    pool.connections.push(conn);
    try {
      pool.createConnection('http://localhost:9200');
      t.fail('Should throw');
    } catch (err) {
      t.equal(err.message, "Connection with id 'http://localhost:9200/' is already present");
    }
  });

  t.test('Create Connection with a Connection instance', (t) => {
    t.plan(1);
    const pool = new BaseConnectionPool({ Connection });
    const conn = pool.createConnection('http://localhost:9200');
    pool.connections.push(conn);
    try {
      pool.createConnection(conn);
      t.fail('Should throw');
    } catch (err) {
      t.pass();
    }
  });

  t.test('Should skip nodes when the http property is undefined', (t) => {
    const pool = new BaseConnectionPool({ Connection });
    const nodes = {
      a1: {
        http: {
          publish_address: '127.0.0.1:9200',
        },
        roles: ['master', 'data', 'ingest'],
      },
      a2: {
        roles: ['master', 'data', 'ingest'],
      },
    };

    t.same(pool.nodesToHost(nodes, 'http:'), [
      {
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: {
          master: true,
          data: true,
          ingest: true,
        },
      },
    ]);

    t.end();
  });

  t.end();
});
