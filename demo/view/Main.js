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
                html: AppTest.getApplication().bundle.getMsg('panel.html'),
                tbar: {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            text: AppTest.getApplication().bundle.getMsg('back.button', 'Back button')
                        }
                    ]
                }
            },{
                height: 200,
                html: AppTest.getApplication().bundle.getMsg('panel.linked')
            }
        ];

        me.callParent(arguments);
    }
});