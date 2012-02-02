Ext.require('Ext.i18n.Bundle', function(){
	//create global bundle in here
	Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle',{
		bundle: 'Application',
		lang: 'en-US',
		path: 'resources',
		noCache: true
	});
});


Ext.application({
	name: 'AppTest',
	launch: function(){

		Ext.i18n.appBundle.onReady(function(){
			Ext.create('Ext.panel.Panel',{
				renderTo: Ext.getBody(),
				tbar: Ext.create('Ext.toolbar.Toolbar',{
	                items: [{text: 'text'}]
	            }),
				items:[{
					height: 300,
					html: Ext.i18n.appBundle.getMsg('panel.html')
				}],
			});
		});//end bundle on ready
	}
});	