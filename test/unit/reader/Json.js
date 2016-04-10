describe("Json Reader", function() {
    var sut;

    beforeEach(function() {
        var model =  Ext.define(null, {
            extend: 'Ext.data.Model',
            fields: ['key', 'value']
        });

        sut = Ext.create('elmasse.i18n.reader.Json', {
            model: model
        });
    });


    it("should read json leaf as key/value pairs with single object", function() {
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

    it("should read json leaf as key/value pairs with leaf on 2nd level", function() {
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

    it("should read json leaf as key/value pairs with mixed levels", function() {
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