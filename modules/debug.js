"use strict";

const debug = require('debug');

/**
 *
 * @type {{getNamespace, log}}
 */
const debugModule = ((debug) => {

    /**
     *
     * @param namespace
     * @returns {*}
     */
    const getNamespace = (namespace) => debug(namespace);

    /**
     *
     * @param namespace
     * @param text
     */
    const log = (namespace, text) => {
        let debugNs = getNamespace("api-speedtest:" + namespace);
        debugNs(text);
    };

    return {
        getNamespace: getNamespace,
        log: log
    }

})(debug);

module.exports = debugModule;