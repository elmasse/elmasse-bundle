Ext.define('mocks.Observable',{
    mixins: {
        observable: 'Ext.util.Observable'
    },

    constructor: function(config){
        var me = this;
        me.mixins.observable.constructor.call(me, config);
    }
});