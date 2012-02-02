Ext.define('Ext.i18n.reader.Property', {
    extend: 'Ext.data.reader.Json',
    alias : 'reader.property',
	
	constructor: function(config){
		config = config || {};
		
		Ext.applyIf(config, {
	        idProperty: 'key',
	        successProperty: 'success',
	        totalProperty: 'total'
	    });
	
		this.callParent([config]);
	},
	
	getResponseData: function(response){
		return response;
	},
	
	getData: function(data){
		var records = [], record, kv,
			f = this.readLines(data),
			l = f.length;
		
		for(var i = 0; i < l; i++){
			var kl = f[i].search(/[\s:=]/);
				record = {
				    value : this.clearValueExtraChars(f[i].substring(kl+1)),
				    key  :  this.clearKeyExtraChars(f[i].substring(0, kl))
				};
				records[i] = record;
		}
		return records;
	},
/*	
    createAccessor: function() {
        var re = /[\[\.]/;

        return function(expr) {
            if (Ext.isEmpty(expr)) {
                return Ext.emptyFn;
            }
            if (Ext.isFunction(expr)) {
                return expr;
            }
            if (this.useSimpleAccessors !== true) {
                var i = String(expr).search(re);
                if (i >= 0) {
                    return Ext.functionFactory('obj', 'return obj' + (i > 0 ? '.' : '') + expr);
                }
            }
            return function(obj) {
                return obj[expr];
            };
        };
    }(),

    createFieldAccessExpression: function() {
        var re = /[\[\.]/;

        return function(field, fieldVarName, dataName) {
            var me     = this,
                map    = (field.mapping == null) ? field.name : field.mapping,
                result,
                operatorSearch;

            if (typeof map === 'function') {
                result = fieldVarName + '.mapping(' + dataName + ', this)';
            } else if (this.useSimpleAccessors === true || ((operatorSearch = String(map).search(re)) < 0)) {
                if (isNaN(map)) {
                    map = '"' + map + '"';
                }
                result = dataName + "[" + map + "]";
            } else {
                result = dataName + (operatorSearch > 0 ? '.' : '') + map;
            }
            if (field.defaultValue !== undefined) {
                result = '(' + result + ' === undefined) ? ' + fieldVarName + '.defaultValue : ' + result;
            }
            if (field.convert) {
                result = fieldVarName + '.convert(' + result + ', record)';
            }
            return result;
        };
    }(),
	*/
	clearKeyExtraChars: function(s){
		return (s ? s.replace(/[:=]/gi, "") : "");
	},
	
	clearValueExtraChars: function(s){
		return (s ? s.replace(/\\\s*\n/gi, "") : "");
	},
	
	//private
	readLines: function(data){
		var file = data.responseText;
		return (file ? file.match(/.*(.*\\\s*\n)+.*|^((?!^\s*[#!]).).*$/gim) : []);
	}
	

});