const log = require('./Log.js')
const Connection = require('./Connection.js')
const Database = require('./Database.js')
const Wallet = require('./Wallet.js')
const DataStore = require('./DataStore.js')
const EventEmitter = require('events').EventEmitter

let map = new WeakMap()

/**
 * This is our main gateway api class
 * Further reading: http://docs.bitshares.org/api/access.html
 */
class API {

    /**
     * @param {string} node_url websocket RPC node url
     * @param {object} options WebSocket options
     */
    constructor(node_url, options) {
        map.set(this, {
            connection: new Connection(node_url, options),
            events: new EventEmitter(),
            
            login_api_id: 1,
            database: undefined,
            
            loginRequestID: 1,
            databaseRequestID: 2,
            
            authenticated: false
        })

        map.get(this).connection.on("message", (data) => {
            this.message(data)
        })
        map.get(this).connection.on("open", () => {
            this.emit("open")
        })

        map.get(this).storage = new DataStore(map.get(this).events)
    }

    authenticated() {
        return map.get(this).authenticated
    }

    /**
     * Authenticate to the RPC server.
     * @param {string} user 
     * @param {string} password 
     * @param {function} callback 
     */
    login(user, password, callback) {
        map.get(this).connection.request(
            map.get(this).login_api_id,
            map.get(this).loginRequestID,
            "login",
            [
                user,
                password
            ]
        )

        if(typeof callback !== 'undefined') {
            this.once("api.login", callback)
        }
    }

    /**
     * @return instance of Database API or false
     */
    get database_api() {
        let db = map.get(this).database
        
        if(typeof db !== 'undefined') {
            return db
        }

        log.error("Database API has not been initialized with call to API.database()")
        return false
    }

    /**
     * Request access to the Database API
     * @param {function} callback 
     */
    database(callback) {
        map.get(this).connection.request(
            map.get(this).login_api_id,
            map.get(this).databaseRequestID,
            "database",
            []
        )

        if(typeof callback !== 'undefined') {
            this.once("api.database_api", callback)
        }
    }

    /**
     * Handles incoming websocket responses
     * @param {string} data response data as JSON string
     */
    message(data) {
        data = JSON.parse(data)
        
        switch(data.id) {

            case map.get(this).loginRequestID:
                if(data.result === true) {
                    log.success("Logged in.")
                    // Unsure if this will stick around
                    map.get(this).authenticated = true
                    this.emit("api.login", data.result)
                } else {
                    log.error("Unable to log in.")
                }
            break;

            case map.get(this).databaseRequestID:
                if(typeof data.result !== "undefined") {
                    log.success("Got Database API ID: " + data.result)
                    map.get(this).database = new Database(
                        data.result,
                        map.get(this).connection,
                        map.get(this).events,
                        map.get(this).storage
                    )
                    this.emit("api.database_api", map.get(this).database)
                } else {
                    log.error("Unable to obtain Database API ID.")
                }
            break;
            
            // Emit the event data allowing the event to bubble up
            default:
                this.emit("message", data)
            break;
        }
    }

    /**
     * Attach an event to EventEmitter 
     * @param {string} event event name
     * @param {function} callback 
     */
    on(event, callback) {
        map.get(this).events.on(event, callback)
    }

    /**
     * Attach a event to EventEmitter to be fired only once
     * @param {string} event event name
     * @param {function} callback 
     */
    once(event, callback) {
        map.get(this).events.once(event, callback)
    }

    /**
     * Emit an event using EventEmitter
     * @param {string} event event name
     * @param {anything} data 
     */
    emit(event, data) {
        map.get(this).events.emit(event, data)
    }
    
    /*
    block() {}
    network_broadcast() {}
    
    history() {}
    network_node() {}
    crypto() {}
    asset() {}
    debug() {}
    enable_api() {}
    */

    // These return locally stored data that was retrieved via Graphene
    // Not yet sure what context it belongs

    /** @see DataStore::getAsset */
    getStoredAsset(key) {
        return map.get(this).storage.getAsset(key)
    }

    /** @see Datastore::getAssets */
    getStoredAssets(keys) {
        return map.get(this).storage.getAssets(keys)
    }
}

module.exports = API