

Ext.define('elmasse.i18n.Bundle', {
    alternateClassName: 'Ext.i18n.Bundle',
    extend: 'Ext.data.Store',
    alias: 'store.i18n.bundle',

    requires: [
        'elmasse.i18n.reader.Property',
        'elmasse.i18n.reader.Json'
    ],

    //@private
    defaultLanguage: 'en-US',
    //@private    
    linkedRegEx: /(?:^|\s)(@\S{1,})/,

    config: {
        /**
         * @cfg bundle {String} bundle name for properties file. Default to message
         */
        bundle: 'message',

        /**
         * @cfg format {String} file format used for bundle. Types: `json` or `property`
         * Defaults to property.
         */
        format : 'property',

        /**
         * @cfg path {String} URI to properties files. Default to resources
         */
        path: 'resources',

        /**
         * @cfg language {String} Language in the form xx-YY where:
         *      xx: Language code (2 characters lowercase)
         *      YY: Country code (2 characters upercase).
         * Optional. Default to browser's language. If it cannot be determined defaults to defaultLanguage.
         */
         language: undefined,

        /**
         * @cfg noCache {boolean} whether or not to disable Proxy's cache. Optional. Defaults to true.
         */
         noCache: true,

        /**
         * @cfg enableLinkedValues {boolean} set to true to follow @{keys} in properties to be replaced
         * with a linked value
         */
         enableLinkedValues: false

    },

    constructor: function(config){
        var me = this;

        if (config  && config.hasOwnProperty('lang')) {
            config.language = config.lang;
            delete config.lang;
            //<debug>
            Ext.log.warn('elmasse.i18n.Bundle: Using the deprecated "lang" configuration. Use "language" instead.');
            //</debug>
        }

        me.callParent([config]);

        me.storeListeners = {
            load: me.onBundleLoad,
            languagechanged: me.onLanguageChange,
            scope: me
        }

        me.on(me.storeListeners);
    },

    /**
     * @private
     */
    guessLanguage: function(){
        return (navigator.language || navigator.browserLanguage || navigator.userLanguage || this.defaultLanguage);
    },

    applyLanguage: function (lang) {
        var me = this;
        return me.formatLanguageCode(lang || me.guessLanguage());
    },

    updateLanguage: function (current, prev) {
        if (prev && current !== prev) {
            this.fireEvent('languagechanged',this, current);
        }
    },

    applyModel: function () {
        return Ext.define(null, {
            extend: 'Ext.data.Model',
            fields: ['key', 'value'],
            idProperty: 'key'
        });
    },

    applyProxy: function (proxy) {
        var me = this,
            url = me.buildUrl(),
            noCache = me.getNoCache(),
            format = me.getFormat();

        proxy = Ext.apply(proxy || {}, {
            type: 'ajax',
            url: url,
            noCache: noCache,
            reader: {
                type: 'i18n.'+ format
            },
            //avoid sending limit, start & group params to server
            groupParam: false,
            limitParam: false,
            startParam: false,
            pageParam: false,
            listeners: {
                exception: me.tryLoadParent,
                scope: me
            }
        });

        return me.callParent([proxy]);
    },


    /**
     * @method: getMsg
     * Returns the content associated with the bundle key or {bundle key}.undefined if it is not specified.
     * @param: key {String} Bundle key.
     * @param: values {Mixed...} if the bundle key contains any placeholder then you can add any number of values
     * that will be replaced in the placeholder token.
     * @return: {String} The bundle key content.
     */
    getMsg: function (key /*, values...*/){
        var me = this,
            values = [].splice.call(arguments, 1),
            rec = me.getById(key),
            decoded = key + '.undefined',
            enabledLinked = me.getEnableLinkedValues(),
            args, value;

        if (rec) {
            value = rec.get('value');

            if (enabledLinked) {
                value = me.parseLinked(value);
            }

            decoded = Ext.util.Format.htmlDecode(value);

            if(values && values.length){
                args = [decoded].concat(values);
                decoded = Ext.String.format.apply(null, args);
            }
        }

        return decoded;
    },

    // experimental
    parseLinked: function (value) {
        var me = this,
            match = value ? value.match(me.linkedRegEx, "g") : [],
            mapped = [];
        
        if (match) {
            mapped = Ext.Array.map(match, function (matched){
                var key = matched.substr(1),
                    rec = me.getById(key);

                return {key: matched, value: rec ? me.getMsg(key) : null};
            });
        }

        Ext.Array.each(mapped, function(item){
            if (item.value){
               value = value.replace(item.key, item.value);
            }
        });

        return value;
    },

    /**
     * @private
     */
    onBundleLoad: function (store, records, success, op) {
        if (success) {
            this.fireEvent('loaded');
        }
    },

    /**
     * @private
     */
    onLanguageChange: function () {
        var me = this;

        me.getProxy().url = me.buildUrl();
    },

    /**
     * @private
     */
    onProxyLoad: function(op){
        if(op.getRecords()){
            this.callParent(arguments);
        }
    },

    /**
     * @private
     */
    getResourceExtension: function(){
        return this.getFormat() === 'property' ? '.properties' : '.json';
    },

    /**
     * @private
     */
    buildUrl: function(options){
        var me = this,
            parent = options && options.parent,
            url = '{0}/{1}{2}{3}',
            path = me.getPath(),
            extension = me.getResourceExtension(),
            bundle = me.getBundle(),
            language = parent ? null : '_' + me.getLanguage();

        return Ext.String.format(url, path, bundle, language, extension);
    },

    /**
     * @private
     */
    tryLoadParent: function(){
        var me = this,
            currentUrl = me.getProxy().url,
            parentUrl = me.buildUrl({parent: true});
        
        if (currentUrl !== parentUrl) {
            me.getProxy().url = parentUrl;
            me.load();
        }
    },

    /**
     * @private
     */
    formatLanguageCode: function(lang){
        var langCodes = lang.split('-'),
            primary, second;
        primary = (langCodes[0]) ? langCodes[0].toLowerCase() : '';
        second = (langCodes[1]) ? langCodes[1].toUpperCase() : '';

        return langCodes.length > 1 ? [primary, second].join('-') : primary;
    },

    /**
     * @override
     */
    destroy: function () {
        var me = this;
        me.un(me.storeListeners);
        me.callParent();
    }

}, function() {
    //hook on Ext.Base
    Ext.override(Ext.Base, {
        initConfig: function(instanceConfig) {
            var me = this,
                config = me.config || {},
                cfg = me.self.getConfigurator(),                
                k;

            me.initConfig = Ext.emptyFn; // ignore subsequent calls to initConfig
            me.initialConfig = instanceConfig || {};

            //replace class configs
            for(k in config){
                if(config.hasOwnProperty(k) && config[k] && typeof config[k] === 'object' && config[k].type && config[k].type === 'bundle'){
                    config[k] = elmasse.i18n.Bundle.instance.getMsg(config[k].key);
                }
            }

            //replace instanceConfigs
            for(k in instanceConfig){
                if(instanceConfig.hasOwnProperty(k) && instanceConfig[k] && typeof instanceConfig[k] === 'object' && instanceConfig[k].type && instanceConfig[k].type === 'bundle'){
                    instanceConfig[k] = elmasse.i18n.Bundle.instance.getMsg(instanceConfig[k].key);
                }
            }

            cfg.configure(me, instanceConfig);

            return me;
        }
    });    
});
