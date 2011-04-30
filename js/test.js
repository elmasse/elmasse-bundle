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

	var panel = new Ext.Panel({
		renderTo: 'panelTest',
		title: bundle.getMsg('panel.title'),
		height: 300,
		width: 800,
		html: bundle.getMsg('panel.html')
		
	});	
		
	}); //bundle.onReady
});