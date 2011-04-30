Ext.ns('Ext.i18n');
/**
 * 
 * PropertyReader is used to read data from a .properties files
 * The .properties file might be in the traditional format which means that comments are accepted.
 * key and value must be separated by the specified propertySeparator. By default a space is used.
 * value must be in between " and not '
 * 
 * @class Ext.i18n.PropertyReader
 * @constructor
 * @param config.propertySeparator {String}. The String that is used as separator between key and value. Default " ". Optional
 * 
 * @author Maximiliano Fierro (elmasse)
 */
Ext.i18n.PropertyReader = function(meta, recordType){
	
	meta = meta || {};
    
	Ext.applyIf(meta, {
        idProperty: 'id',
        successProperty: 'success',
        totalProperty: 'total'
    });
	
	recordType = recordType || Ext.data.Record.create(['value']);
	
	//call super
	Ext.i18n.PropertyReader.superclass.constructor.call(this, meta, recordType); 
	
}

Ext.extend(Ext.i18n.PropertyReader, Ext.data.DataReader,{
	/**
	 * @cfg propertySeparator: {String}. Default: " ". Optional
	 */
	propertySeparator: " ",	

	read: function(response){
		var propertyFile = response.responseText;
		if(!propertyFile)
			throw {message: "PropertyReader.read: File not found"};
						
		return this.readRecords(propertyFile);
	},
	
	readRecords: function(propertyFile){
		var totalRecords = 0, success = true;
		var Record = this.recordType;
		var records = [];
		
		var f = this.readLines(propertyFile);
		
		for(var i = 0; i < f.length; i++){
			var key, value, kLim;
			kLim = f[i].indexOf(this.propertySeparator);
			key = String(f[i].substring(0, kLim));
			value = f[i].substring(kLim+1).trim().replace(/\"/g, '');
			
			var record = new Record(value, key);
			records[i] = record;
		}
		
		
		return {
	        success : success,
	        records : records,
	        totalRecords : f.length || totalRecords
	    };
	
	},
	
	//private
	readLines: function(file){
		var aux = String(file).split('\n');
		var lines = new Array();
		
		for(var i = 0; i < aux.length; i++){
			if(aux[i].indexOf("#") < 0 || (aux[i].indexOf("#") > aux[i].indexOf("\""))){
				var line = Ext.util.Format.trim(aux[i]);
				if(line)
					lines.push(line);
			}	
		}
		return lines;
	}

});