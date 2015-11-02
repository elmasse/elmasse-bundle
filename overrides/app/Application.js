Ext.define('elmasse.overrides.app.Applicaton', {
    override: 'Ext.app.Application',

    onBeforeLaunch: function() {
        var me = this,
            overridden = this.onBeforeLaunch.$previous,
            ns;

        if(me.bundle){
            //configure the bundle instance and defer launch until bundle is loaded.
            me.bundle = Ext.create('elmasse.i18n.Bundle', Ext.apply({
                autoLoad: true,
                listeners: {
                    loaded: function(){
                        overridden.apply(me);
                    }
                }
            }, me.bundle));
            elmasse.i18n.Bundle.instance = me.bundle;
        }else{
            me.callParent();
        }
    }
});
