/*
 * This is a test file for Bundle.js
 *
 * @author: elmasse(c) Maximiliano Fierro 2008
 *
 */



Ext.onReady(function(){
	var lang;
	var params = Ext.urlDecode(window.location.search.substring(1));
	if(params.lang)
		lang = params.lang;
		
	var bundle = new Ext.i18n.Bundle({bundle:'Application', path:'resources', lang: lang});
	bundle.onReady(function(){
	
		Ext.create('Ext.panel.Panel', {
			tbar: Ext.create('Ext.toolbar.Toolbar',{
				items: [{text: bundle.getMsg('panel.toolbar.button1')}]
			}),
			title: Ext.String.format(bundle.getMsg('panel.title.formatted'), 'Showing'),
		    width: 500,
		    html: bundle.getMsg('panel.html') + bundle.getMsg('panel.content'),
		    renderTo: document.body
		});
	

		
	}); //bundle.onReady
});