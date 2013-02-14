Ext.define('Ext.i18n.reader.Property', {
    extend: 'Ext.data.reader.Json',
    alias : 'reader.i18n.property',

    constructor: function(){
        var me = this,
            Model;

        me.callParent(arguments);
        Model = me.model;

        if(Model){
            // An Implicit Model is created when fields from store are used instead a model definition
            // This has some issues with ids in the model instance:
            // override idProperty since it is not using idProperty from this reader
            // override idgen getRecId method since it won't retrieve the idProp
            Ext.merge(Model.prototype, {
                idProperty: this.getIdProperty(),
                idgen:{
                    getRecId : function(rec){
                        return rec.internalId;
                    }
                }
            });
        }
    },

    getResponseData: function(response){
        return this.readRecords(response);
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