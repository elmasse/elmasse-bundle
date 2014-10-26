Ext.application({
    requires: ['Ext.i18n.Bundle'],

    name: 'AppTest',
    appFolder: 'demo',

    views: ['Main'],

    //define bundle properties
    bundle: {
        bundle: 'Application',
        lang: 'en-US',
        path: 'resources',
        noCache: true,
        // try enabling linked values
        enableLinkedValues: true
        // try adding this to read from json bundles!
        // ,format: 'json'
    },

    launch: function(){
        Ext.create('AppTest.view.Main', {
            renderTo: Ext.getBody()
        });
    }

    // launch: function(){
    //      Ext.create('Ext.panel.Panel',{
    //         renderTo: Ext.getBody(),
    //         tbar: Ext.create('Ext.toolbar.Toolbar',{
    //                items: [{text: 'text'}]
    //            }),
    //         items:[{
    //             height: 300,
    //             html: AppTest.getApplication().bundle.getMsg('panel.html')
    //         }]
    //     });
    // }

});