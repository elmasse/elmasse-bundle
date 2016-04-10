describe("Property Reader", function() {
    var sut;
    
    beforeEach(function() {
        var model =  Ext.define(null, {
            extend: 'Ext.data.Model',
            fields: ['key', 'value']
        });
        
        sut = Ext.create('elmasse.i18n.reader.Property', {
            model: model
        });
    });

    describe("Key/Value pairs", function() {
        it("should read key value pairs separated by ':'", function() {
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

        it("should read key value pairs separated by '='", function() {
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

        it("should read key value pairs separated by ' '", function() {
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
    
    describe("Values", function() {

        it("should read values with spaces", function() {
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

        it("should read values with multiline \\ separator", function() {
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

         it("should read values that starts with ':' if separator is ' ' then ':' should be part of the value", function() {
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

    describe("Comments", function() {
        it("should exclude comment lines started with '#'", function() {
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

        it("should exclude comment lines with '#' as first non blank character", function() {
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

        it("should exclude comment lines started with '!'", function() {
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

    describe("EOL markers", function() {
      
        it("should handle CR ('\\n')", function() {
            var response = {
                    responseText: "property:some Value.\nproperty2:another value\n"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));

            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toBe('some Value.');
            expect(record.get('value')).not.toBe('some Value.\n');
        });

        it("should handle CR+LF ('\\r\\n')", function() {
            var response = {
                    responseText: "property:some Value.\r\nproperty2:another value\r\n"
                },
                result, record;

            result =sut.read(response);

            expect(result).toBeDefined();
            expect(result.records).toEqual(jasmine.any(Array));

            record = result.records[0];
            
            expect(record).toBeDefined();

            expect(record.get('key')).toEqual('property');
            expect(record.get('value')).toBe('some Value.');

            expect(record.get('value')).not.toBe('some Value.\r\n');
            expect(record.get('value')).not.toBe('some Value.\r');
            expect(record.get('value')).not.toBe('some Value.\n');
        });
    });    
});