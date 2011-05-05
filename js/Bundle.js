Ext.ns('Ext.i18n');

/**
 * @class Ext.18n.Bundle
 * @constructor
 * @version 0.3
 * @param config.bundle: {String} Bundle Name.
 * @param config.path: {String} Bundle Folder URI. Optional.
 * @param config.lang: {String} Language in the form xx-YY where:
 * 		xx: Language code (2 characters lowercase) YY: Country code (2 characters upercase). 
 * Optional. Default to browser's language. If it cannot be determined default to en-US.
 * @param config.method: {String} request method. POST | GET. Optional. Default to GET
 * 	
 * @author Maximiliano Fierro (elmasse)
 */
Ext.define('Ext.i18n.Bundle',{
	extend: 'Ext.data.Store', 
	
	defaultLanguage: 'en-US',
	loadFlag: false,
	resourceExt: '.properties',
	bundle: '',
	path: null,
	
	constructor: function(config){

		this.bundle = config.bundle;
		this.path = config.path;
		this.language = this.formatLanguageCode(config.lang || this.guessLanguage()); 
		this.method = config.method || 'GET';

		var url = this.buildURL(this.language);

	    Ext.i18n.Bundle.superclass.constructor.call(this, {
			model: Ext.ModelManager.getModel('PropertyModel'),
	    	proxy: {
				type: 'ajax',
				url: url,
				reader: 'propertyReader'
			}
	    });

		this.proxy.on('exception', this.loadParent, this, {single: true});
		this.on('load', this.onBundleLoad, this);
		
		this.load();
	},
	
	/**
	 * @private
	 */
	guessLanguage: function(){
		return (navigator.language || navigator.browserLanguage
				|| navigator.userLanguage || this.defaultLanguage);
	},
	
	/**
	 * @method: getMsg
	 * Returns the content associated with the bundle key or {bundle key}.undefined if it is not specified.
	 * @param: key {String} Bundle key.
	 * @return: {String} The bundle key content. 
	 */
	getMsg: function(key){
		return this.getById(key)? Ext.util.Format.htmlDecode(this.getById(key).get('value')) : key + '.undefined';
	},
	
	/**
	 * @method: onReady
	 * The fn will be called when the Bundle file is loaded.
	 * @param: fn {Function}
	 */
	onReady: function(fn){
		this.readyFn = fn;
		this.on('loaded', this.readyFn, this, {single: true});
	},

	/**
	 * @private
	 */	
	onBundleLoad: function(store, record, success, operation) {
		if(success){
			this.fireEvent('loaded');
		}
    },
	
	/**
	 * @private
	 */
	buildURL: function(language){
		var url = '';
		if (this.path) url+= this.path + '/';
		url+=this.bundle;
		if (language) url+= '_'+language;
		url+=this.resourceExt;
		return url;
	},
	
	/**
	 * @private
	 */
	loadParent: function(){
		this.proxy.url = this.buildURL();
		this.load();			
	},
	
	/**
	 * @private
	 */
	formatLanguageCode: function(lang){
		var langCodes = lang.split('-');
		langCodes[0] = (langCodes[0]) ? langCodes[0].toLowerCase() : '';
		langCodes[1] = (langCodes[1]) ? langCodes[1].toUpperCase() : '';
		return langCodes.join('-');
	}

});

