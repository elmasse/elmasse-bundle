Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': '../i18n'
    }
});

Ext.require("Ext.i18n.reader.Json");

describe("Ext.i18n.reader.Json", function(){
    var sut;

    Ext.define('ModelMocked', {
        extend: 'Ext.data.Model',
        fields: ['key', 'value']
    });

    beforeEach(function(){
        sut = Ext.create('Ext.i18n.reader.Json', {
            model: 'ModelMocked'
        });
    });

    describe("read json leaf as key/value pairs", function(){

        it("single object", function(){
            var response = {
                    responseText: "{\"property\":\"someValue\"}"
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

        it("leaf on 2nd level", function(){
            var response = {
                    responseText: "{\"property\": { \"sub\" : \"someValue\"} }"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));
            
            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property.sub');
            expect(record.get('value')).toEqual('someValue');
        });

        it("mixed json", function(){
            var response = {
                    responseText: "{" +
                                    "\"property\": {"+
                                         "\"sub\" : \"someValue\"" +
                                    " }," +
                                    "\"single\": \"value\"" +
                                   "}"
                },
                result, rec1, rec2;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));
            

            rec1 = result.records[0];
            
            expect(rec1).toBeDefined();

            expect(rec1.get('key')).toEqual('property.sub');
            expect(rec1.get('value')).toEqual('someValue');

            rec2 = result.records[1];
            
            expect(rec2).toBeDefined();

            expect(rec2.get('key')).toEqual('single');
            expect(rec2.get('value')).toEqual('value');

        });


    });
});