Ext.define('Ext.i18n.model.Property', {
	extend: 'Ext.data.Model',
	
//	config: {
		idProperty: 'key',
		fields: ['key', 'value'],
		idgen: {
	        isGenerator: true,
	        type: 'default',

	        generate: function () {
	            return null;
	        },
	        getRecId: function (rec) {
	            return rec.internalId;
	        }
	    },
		
//	}

});