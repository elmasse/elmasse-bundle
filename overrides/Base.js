Ext.define('elmasse.overrides.Base', {
    override: 'Ext.Base',

    initConfig: function(instanceConfig) {
        var me = this,
            cfg = me.getConfigurator(),
            k;

        me.initConfig = Ext.emptyFn; // ignore subsequent calls to initConfig
        me.initialConfig = instanceConfig || {};

        for(k in instanceConfig){
            if(instanceConfig.hasOwnProperty(k) && instanceConfig[k] && typeof instanceConfig[k] === 'object' && instanceConfig[k].type && instanceConfig[k].type === 'bundle'){
                instanceConfig[k] = elmasse.i18n.Bundle.instance.getMsg(instanceConfig[k].key);
            }
        }

        cfg.configure(me, instanceConfig);

        return me;
    }    
});
