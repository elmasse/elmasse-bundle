Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': '../i18n'
    }
});

Ext.require("Ext.i18n.reader.Property");

describe("Ext.i18n.reader.Property", function(){
    var sut;

    Ext.define('ModelMocked', {
        extend: 'Ext.data.Model',
        fields: ['key', 'value']
    });

    beforeEach(function(){
        sut = Ext.create('Ext.i18n.reader.Property', {
            model: 'ModelMocked'
        });
    });

    describe("should read key value pairs", function(){
        it("separated by ':'", function(){
            var response = {
                    responseText: "property:someValue"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toEqual('someValue');
        });

        it("separated by '='", function(){
            var response = {
                    responseText: "property=someValue"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toEqual('someValue');
        });

        it("separated by ' '", function(){
            var response = {
                    responseText: "property someValue"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toEqual('someValue');
        });

    });

    describe("should read values", function(){
        it("with spaces", function(){
            var response = {
                    responseText: "property:some Value here"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toEqual('some Value here');
        });

        it("with multiline \\ separator", function(){
            var response = {
                    responseText: "property:some Value \\\nthat follows in here"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toEqual('some Value that follows in here');
        });

         it("that starts with ':' if separator is ' ' then ':' should be part of the value", function(){
            var response = {
                    responseText: "property :<-these are part of the message "
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toMatch(/:/);
        });
    });

    describe("should exclude comments", function(){
        it("should exclude comment lines started with '#'", function(){
            var response = {
                    responseText: "#property:some Value \nproperty:another value"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));

            expect(result.records.length).toEqual(1);
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toEqual('another value');
        });

        it("should exclude comment lines with '#' as first non blank character", function(){
            var response = {
                    responseText: "\t   #property:some Value \nproperty:another value"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));

            expect(result.records.length).toEqual(1);
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toEqual('another value');
        });

        it("should exclude comment lines started with '!'", function(){
            var response = {
                    responseText: "!property:some Value \nproperty:another value"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));

            expect(result.records.length).toEqual(1);
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toEqual('another value');
        });
    });


});