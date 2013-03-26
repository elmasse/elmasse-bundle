Ext.define('Ext.i18n.reader.Json', {
    extend: 'Ext.data.reader.Json',
    alias : 'reader.i18n.json',


    extractData: function(root){
       var me = this,
            records = [],
            Model   = me.model,
            length  = root.length,
            keys, key, parts, value,
            convertedValues, node, record, i;

        if (!root.length && Ext.isObject(root)) {
            keys = me.getKeys(root);
            length = keys.length;
        }

        for (i = 0; i < length; i++) {
            key = keys[i];
            parts = key.split('.');

            for(j = 0, value = root; j < parts.length; j++){
                value = value[parts[j]];
            }

            node = {key: key, value: value};

            record = new Model(undefined, me.getId(node), node, convertedValues = {});

            // // If the server did not include an id in the response data, the Model constructor will mark the record as phantom.
            // // We  need to set phantom to false here because records created from a server response using a reader by definition are not phantom records.
            record.phantom = false;

            // // Use generated function to extract all fields at once
            me.convertRecordData(convertedValues, node, record);

            records.push(record);
        }

        return records;
    },


    getKeys: function (obj, parent) {
        var me = this, key, keys = [];

        function traverse(obj, parent){
            var path = (parent || ''), key;
            for (key in obj){
                if(obj.hasOwnProperty(key)){
                    path = (path ? path + '.' : '') + key;

                    if(Ext.isObject(obj[key])){
                       path = traverse(obj[key], path);
                    }
                    return path;
                }
            }
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(Ext.isObject(obj[key])){
                    keys.push(traverse(obj[key], key));
                }else{
                    keys.push(key);
                }

            }
        }
        return keys;
    }




});