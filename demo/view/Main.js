Ext.define('AppTest.view.Main', {
    extend: 'Ext.Panel',
    alias: 'widget.main',

    tbar: Ext.create('Ext.toolbar.Toolbar',{
       items: [{text: 'text'}]
    }),

    initComponent: function(){
        var me = this;

        me.items = [
            {
                height: 300,
                html: AppTest.getApplication().bundle.getMsg('panel.html')
            }
        ];

        me.callParent(arguments);
    }
});