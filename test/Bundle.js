Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': '../i18n',
        'mocks' : 'mocks'
    }
});

Ext.require("Ext.i18n.Bundle");

describe("Ext.i18n.Bundle", function(){

    describe("When instantiate a Bundle", function(){
        var proxy;

        beforeEach(function(){
            proxy = jasmine.createSpyObj('proxy', ['on']);

            spyOn(Ext.i18n.Bundle.prototype, 'setProxy').andCallFake(function(){
                this.proxy = proxy;
            });
        });

        it("should have default properties values if not specified", function(){
            var sut = Ext.create('Ext.i18n.Bundle');

            expect(sut.getBundle()).toBe("message");
            expect(sut.getPath()).toBe("resources");
            

            expect(sut.setProxy).toHaveBeenCalledWith(jasmine.objectContaining({
                url: 'resources/message_en-US.properties'
            }));
        });

       it("should have properties values if specified", function(){
            var bundle = "MYBUNDLE",
                path   = "MYPATH",
                lang   = 'es-US',
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle : bundle,
                    path   : path,
                    lang   : lang
                });

            expect(sut.getBundle()).toBe(bundle);
            expect(sut.getPath()).toBe(path);


            expect(sut.setProxy).toHaveBeenCalledWith(jasmine.objectContaining({
                url: path+'/'+bundle+'_'+lang+'.properties'
            }));
        });

       it("should create proxy with url for default properties", function(){
            var sut = Ext.create('Ext.i18n.Bundle'),
                url = 'resources/message_en-US.properties';

            expect(sut.setProxy).toHaveBeenCalledWith(jasmine.objectContaining({
                url: url
            }));

       });

        it("should create proxy with url for a lang format xx-YY", function(){
            var bundle = 'Bundle',
                path   = 'path',
                lang   = 'en-US',
                url    = path+'/'+bundle+'_'+lang+'.properties',
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle: bundle,
                    path: path,
                    lang: lang
                });

            expect(sut.setProxy).toHaveBeenCalledWith(jasmine.objectContaining({
                url: url
            }));

        });

        it("should generate the correct URL for the bundle with a lang format xx", function(){
            var bundle = 'Bundle',
                path   = 'path',
                lang   = 'en',
                url    = path+'/'+bundle+'_'+lang+'.properties',
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle: bundle,
                    path: path,
                    lang: lang
                });


            expect(sut.setProxy).toHaveBeenCalledWith(jasmine.objectContaining({
                url: path+'/'+bundle+'_'+lang+'.properties'
            }));

        });

        it("should generate the correct URL for the bundle with a lang format xx-yy", function(){
            var bundle = 'Bundle',
                path   = 'path',
                lang   = 'en-us',
                fmtLng = 'en-US',
                url    = path+'/'+bundle+'_'+fmtLng+'.properties',
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle: bundle,
                    path: path,
                    lang: lang
                });

            expect(sut.setProxy).toHaveBeenCalledWith(jasmine.objectContaining({
                url: url
            }));
        });

        it("should generate the correct URL for the parent bundle", function(){
            var bundle = 'Bundle',
                path   = 'path',
                lang   = 'en-US',
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle: bundle,
                    path: path,
                    lang: lang
                });

            expect(sut.buildURL()).toBe(path+'/'+bundle+'.properties');
        });

    });

    describe("When loading the bundle", function(){
        var proxy,
            RECS = [{key: 'key', value: 'value'}];
           
        retrieveMockedRecords = function(Model){
            var recs = [],
                l = RECS.length,
                i = 0;

            for(;i<l;i++){
                recs.push(new Model(RECS[i]));
            }

            return recs;
        };

        createSuccessResultSetFor = function(Model){
            var records = retrieveMockedRecords(Model),
                total   = records.length;

            return new Ext.data.ResultSet({
                total  : total,
                count  : total,
                records: records,
                success: true,
                message: ''
            });

        };

        beforeEach(function(){

            proxy = Ext.create('mocks.Observable', {
                read: Ext.emptyFn
            });

            spyOn(Ext.i18n.Bundle.prototype, 'setProxy').andCallFake(function(){
                this.proxy = proxy;
            });

        });

        it("should store keys/values if the bundle file is loaded", function(){
            var sut = Ext.create('Ext.i18n.Bundle'),
                Model = sut.model;

            spyOn(proxy, 'read').andCallFake(function(operation, callback, scope){
                var me = this,
                    result = createSuccessResultSetFor(Model);

                Ext.apply(operation, {
                    resultSet: result
                });

                operation.commitRecords(result.records);
                operation.setCompleted();
                operation.setSuccessful();

                callback.call(scope || me, operation);

                me.fireEvent('load', proxy, [sut, operation.getRecords(), true, operation]);
            });

            spyOn(sut, 'onProxyLoad').andCallThrough();
            spyOn(sut, 'onBundleLoad').andCallThrough();
            spyOn(sut, 'fireEvent').andCallThrough();

            sut.load();

            expect(sut.onProxyLoad).toHaveBeenCalled();
            expect(sut.fireEvent).toHaveBeenCalledWith('load', jasmine.any(Object), jasmine.any(Object), true);

            // expect(sut.onBundleLoad).toHaveBeenCalled();

            expect(sut.getMsg(RECS[0].key)).toEqual(RECS[0].value);

        });

    });
});