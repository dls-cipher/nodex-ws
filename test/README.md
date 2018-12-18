# Docs

**DAMP API**
----

**Get new address**
----

  _The API provides access to creating new accounts in XOV database, fetching XOV deposit address for the requested account, checking whether account is restricted or not, and also adding additional inforamtion to the XOV account (which is then stored in mysql (MariaDB) table._

* **damp.xov.io/api**

  _/api/init_

* **Method:**
  
  <_The request type_>

  `POST`
  
*  **URL Params**

   _The request bundle is sent via post request body, no url params._ 

   **Required:**
 
   `no required parameters`

   **Optional:**
 
   `no optional parameters`

* **Data Params**

  _The request bundle is sent via post request body._
  
    **Required:**
 
   `name: [string]`

   **Optional:**
 
   `no optional parameters`


* **Success Response:**
  
  _Returns address_

  * **Code:** 200 
    **Content:** `{ address : <very very long hash address> }`
 
* **Error Response:**

  _The possible error responses:_

  * **Code:** THE ADDRESS ALREADY IN USE BY AN OTHER BTS ACCOUNT (5501)
    **Content:** `{ address : "out of addresses (error 5501)" }`

  OR

  * **Code:** NEW ADDRESSES ARE NOT AVAILBLE AT THE MOMENT (5502)
    **Content:** `{ error : "out of addresses (error 5502)" }`

* **Sample Call:**

  _ReactJS example._
  
  ```javascript
          (() => {
            fetch(
                "http://<api-base>/api/init",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        'Access-Control-Allow-Origin': "<api-base>"
                    },
                    body: JSON.stringify({
                        name: AccountStore.getState().currentAccount
                    })
                }
            )
                .then(res => res.json())
                .then(response => {
                    let address = response.address;
                    console.log(address);
                    this.setState({ true_address: address })
                });
        })();
        


* **Notes:**

  _The endpoint is supposed to be used to get new address for the reuqest bitshares account name in order to deposit new XOV tokens._
  
  
  
**Profile details**
----

  _The endpoint provides access to adding accounts details in XOV database._

* **damp.xov.io/api**

  _/api/details_

* **Method:**
  
  _The request type_

  `POST`

* **Sample Call:**

  _ReactJS example._
  
  ```javascript
         (async () => {
            const rawResponse = await fetch(
                "http://<api-origin>/api/details",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        'Access-Control-Allow-Origin': "<api-origin>"
                    },
                    body: JSON.stringify({
                        details: {
                            email: this.state.email,
                            birth: this.state.birth,
                            job: this.state.job,
                            income: this.state.income,
                            currency: this.state.favorite,
                            telegram: this.state.telegram,
                            country: this.state.country
                        }
                    })
                }
            );

            console.log(rawResponse);
        })();
        
        
**Limited accounts**
----

  _The endpoint provides access to limited accounts info from XOV database._

* **damp.xov.io/api**

  _/api/limited_

* **Method:**
  
  _The request type_

  `POST`

* **Sample Call:**

  _ReactJS example._
  
  ```javascript
        (() => {
            fetch(
                "<origin>/api/limited",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        'Access-Control-Allow-Origin': "<origin>"
                    }
                }
            )
                .then(res => res.json())
                .then(response => {
                    console.log(response.accounts);
                    let accountsLength = response.accounts.length;
                    for (var i = 0; i < accountsLength; i++) {
                        if (
                            AccountStore.getState().currentAccount ==
                            response.accounts[i].account_name
                        ) {
                            this.setState({limited: true});
                        }
                    }
                }).catch((error) => console.log(error));
        })();
        


**New XOV account**
----

  _The endpoint provides access to creating XOV only accounts and adding to XOV database._

* **damp.xov.io/api**

  _/api/account_

* **Method:**
  
  _The request type_

  `POST`

* **Sample Call:**

  _ReactJS example._
  
  ```javascript
                (async () => {
                    const rawResponse = await fetch(
                        "<origin>/api/account",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json, text/plain, */*",
                                "Content-Type": "application/json",
                                "X-Requested-With": "XMLHttpRequest",
                                'Access-Control-Allow-Origin': "<origin>"
                            },
                            body: JSON.stringify({
                                account: {
                                    country: this.state.selectedOptionCountry.label,
                                    accountName: this.state.accountName,
                                    firstname: this.state.firstname,
                                    surname: this.state.surname,
                                    age: this.state.selectedOptionAge.value,
                                    vip: this.state.selectedOptionVip.value,
                                    nickname: this.state.nickname
                                }
                            })
                        }
                    );
                    console.log(rawResponse);
                })();



**Node.js SERVER management**
----


<div align="center">
  <br/>
  <a href="http://pm2.io/doc/?utm_source=github" title="PM2 Keymetrics link">
    <img width=710px src="https://raw.githubusercontent.com/Unitech/pm2/master/pres/pm2-v4.png" alt="pm2 logo">
  </a>
  <br/>
<br/>
<b>P</b>(rocess) <b>M</b>(anager) <b>2</b><br/>
  <i>Runtime Edition</i>
<br/><br/>

<a href="https://badge.fury.io/js/pm2" title="NPM Version Badge">
   <img src="https://badge.fury.io/js/pm2.svg" alt="npm version" height="18">
</a>

<a href="https://img.shields.io/badge/node-%3E%3D4-brightgreen.svg" title="Node Limitation">
   <img src="https://img.shields.io/badge/node-%3E%3D4-brightgreen.svg" alt="npm version" height="18">
</a>

<a href="https://travis-ci.org/Unitech/pm2" title="PM2 Tests">
  <img src="https://travis-ci.org/Unitech/pm2.svg?branch=master" alt="Build Status"/>
</a>


<br/>
<br/>
<br/>
</div>

PM2 is a Production Runtime and Process Manager for Node.js applications with a built-in Load Balancer.
It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.

Starting an application in production mode is as easy as:

```bash
$ pm2 start app.js
```

PM2 is constantly assailed by [more than 1800 tests](https://travis-ci.org/Unitech/pm2).

Official website: [https://pm2.io/doc/](https://pm2.io/doc/)

Works on Linux (stable) & macOS (stable) & Windows (stable).
All Node.js versions are supported starting Node.js 4.X.

[![NPM](https://nodei.co/npm/pm2.png?downloads=true&downloadRank=true)](https://nodei.co/npm/pm2/)

### Installing PM2

```bash
$ npm install pm2 -g
```

*npm is a builtin CLI when you install Node.js - [Installing Node.js with NVM](https://keymetrics.io/2015/02/03/installing-node-js-and-io-js-with-nvm/)*

### Start an application

You can start any application (Node.js, Python, Ruby, binaries in $PATH...) like that:

```bash
$ pm2 start app.js
```

Your app is now daemonized, monitored and kept alive forever.

[More about Process Management](https://pm2.io/doc/en/runtime/guide/process-management/?utm_source=github)

### Container Support

With the drop-in replacement command for `node`, called `pm2-runtime`, run your Node.js application in a hardened production environment.
Using it is seamless:

```
RUN npm install pm2 -g
CMD [ "pm2-runtime", "npm", "--", "start" ]
```

[Read More about the dedicated integration](https://pm2.io/doc/en/runtime/integration/docker/?utm_source=github)

### Managing Applications

Once applications are started you can manage them easily:

![Process listing](https://github.com/unitech/pm2/raw/master/pres/pm2-list.png)

To list all running applications:

```bash
$ pm2 list
```

Managing apps is straightforward:

```bash
$ pm2 stop     <app_name|id|'all'|json_conf>
$ pm2 restart  <app_name|id|'all'|json_conf>
$ pm2 delete   <app_name|id|'all'|json_conf>
```

To have more details on a specific application:

```bash
$ pm2 describe <id|app_name>
```

To monitor logs, custom metrics, application information:

```bash
$ pm2 monit
```

[More about Application Management](https://pm2.io/doc/en/runtime/guide/process-management/?utm_source=github)

### Cluster Mode: Node.js Load Balancing & Zero Downtime Reload

The Cluster mode is a special mode when starting a Node.js application, it starts multiple processes and load-balance HTTP/TCP/UDP queries between them. This increase overall performance (by a factor of x10 on 16 cores machines) and reliability (faster socket re-balancing in case of unhandled errors).

Starting a Node.js application in cluster mode that will leverage all CPUs available:

```bash
$ pm2 start api.js -i <processes>
```

`<processes>` can be `'max'`, `-1` (all cpu minus 1) or a specified number of instances to start.

**Zero Downtime Reload**

Hot Reload allows to update an application without any downtime:

```bash
$ pm2 reload all
```

Seamlessly supported by all major Node.js frameworks and any Node.js applications without any code change:

![Framework supported](https://raw.githubusercontent.com/Unitech/PM2/development/pres/cluster-support.png)

[More informations about how PM2 make clustering easy](https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/)

### Terminal Based Monitoring

![Monit](https://github.com/Unitech/pm2/raw/master/pres/pm2-monit.png)

Monitor all processes launched straight from the command line:

```bash
$ pm2 monit
```

### Log Management

To consult logs just type the command:

```bash
$ pm2 logs
```

Standard, Raw, JSON and formated output are available.

Examples:

```bash
$ pm2 logs APP-NAME       # Display APP-NAME logs
$ pm2 logs --json         # JSON output
$ pm2 logs --format       # Formated output

$ pm2 flush               # Flush all logs
$ pm2 reloadLogs          # Reload all logs
```

[More about log management](https://pm2.io/doc/en/runtime/guide/log-management/?utm_source=github)

### Startup Hooks Generation

PM2 can generates and configure a Startup Script to keep PM2 and your processes alive at every server restart.

Init Systems Supported: **systemd**, **upstart**, **launchd**, **rc.d**

```bash
# Generate Startup Script
$ pm2 startup

# Freeze your process list across server restart
$ pm2 save

# Remove Startup Script
$ pm2 unstartup
```

[More about Startup Hooks](https://pm2.io/doc/en/runtime/guide/startup-hook/?utm_source=github)

### Updating PM2

```bash
# Install latest PM2 version
$ npm install pm2@latest -g
# Save process list, exit old PM2 & restore all processes
$ pm2 update
```

*PM2 updates are seamless*

## About PM2 Plus

<br/>
<div align="center">
  <br/>
  <a href="http://pm2.io/?utm_source=github" title="PM2 Keymetrics link">
    <img width=710px src="https://raw.githubusercontent.com/Unitech/pm2/master/pres/pm2-plus_black.png" alt="PM2 plus logo">
  </a>
  <br/>
<br/>
<b>PM2</b><br/>
  <i>Plus Edition</i>
<br/><br/>
</div>

Once you scale you need to make sure that your application is running properly, without bugs, performance issues and without downtimes.

That's why we created PM2 Plus. It's a set of advanced features for both hardening the PM2 Runtime and monitoring applications in production.

With PM2 Plus you get:
- A Real-time Monitoring Web Interface
- Smart Exception Reporting
- Production Profiling for Memory and CPU
- PM2 Runtime High Availability Fallback

And much more like realtime logs, custom metrics, remote actions...

To start using PM2 Plus via CLI:

```bash
$ pm2 plus
```

Or go to the application and create an account:

[To discover PM2 Plus Register Here](https://app.pm2.io/)

### PM2 Plus Features

**Visual Memory Snapshots**:

![https://raw.githubusercontent.com/Unitech/pm2/master/pres/memory-profiling.png](https://raw.githubusercontent.com/Unitech/pm2/master/pres/memory-profiling.png)

**CPU FlameGraphs**:

![https://raw.githubusercontent.com/Unitech/pm2/master/pres/flamegraph.png](https://raw.githubusercontent.com/Unitech/pm2/master/pres/flamegraph.png)

**Multi Server Overview**:

![https://raw.githubusercontent.com/Unitech/pm2/master/pres/pm2-ls-multi.png](https://raw.githubusercontent.com/Unitech/pm2/master/pres/pm2-ls-multi.png)

<div align="center">
    <a title="PM2 Plus Application" href="https://app.pm2.io/">To discover PM2 Plus Register Here</a>
</div>

### PM2 Plus: Expose Custom Metrics

To get more insights on how your application behaves, plug custom metrics inside your code and monitor them with the `pm2 monit` command:

In your project install [pm2-io-pm](https://github.com/keymetrics/pm2-io-apm):

```bash
$ npm install @pm2/io --save
```

Then plug a custom metric:

```javascript
const io = require('@pm2/io');

let counter = 1;

const latency = io.metric({
   name    : 'Counter',
   value   : function() {
     return counter;
   }
});

setInterval(() => {
  counter++;
}, 1000);

```

### PM2 Plus: Module system

PM2 embeds a simple and powerful module system. Installing a module is straightforward:

```bash
$ pm2 install <module_name>
```

Here are some PM2 compatible modules (standalone Node.js applications managed by PM2):

[**pm2-logrotate**](https://www.npmjs.com/package/pm2-logrotate) automatically rotate logs and limit logs size<br/>
[**pm2-server-monit**](https://www.npmjs.com/package/pm2-server-monit) monitor the current server with more than 20+ metrics and 8 actions<br/>


**MySQL check current tables (from shell)**
----
SHOW DATABASES;

USE xov;

SHOW TABLES;

SELECT * FROM wallets; // lists all btsID - XOV token address, with private keys to the wallets

SELECT * FROM details;

SELECT * FROM accounts;

Note: you can empty the wallet matches by dropping "wallets" table (in case of OUT OF ADDRESSES ERROR 5501 or 5502)

```
DROP TABLE wallets;
```

**
----
_Tables schemes_

Accounts:
```sql
CREATE TABLE IF NOT EXISTS accounts (
      country VARCHAR(50) NOT NULL,
      account_name VARCHAR(50) NOT NULL,
      firstname VARCHAR(50) NOT NULL,
      surname VARCHAR(50) NOT NULL,
      born_year VARCHAR(50) NOT NULL,
      is_vip VARCHAR(50) NOT NULL,
      nickname VARCHAR(50) NOT NULL
    );
```

Details:

```sql
CREATE TABLE IF NOT EXISTS details (
      email VARCHAR(100) NOT NULL,
      birth VARCHAR(100) NOT NULL,
      job VARCHAR(100) NOT NULL,
      income VARCHAR(100) NOT NULL,
      currency VARCHAR(100) NOT NULL,
      telegram VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL
    );
 ```
 
 Wallets:
 
 ```sql
 CREATE TABLE IF NOT EXISTS wallets (
    address VARCHAR(200) NOT NULL,
    privateKey VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL
  );
```
