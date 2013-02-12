Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': '../i18n'
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

            expect(sut.buildURL('en-US')).toEqual(url);

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

            expect(sut.buildURL(lang)).toEqual(url);

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

            expect(sut.buildURL(lang)).toEqual(url);

            expect(sut.setProxy).toHaveBeenCalledWith(jasmine.objectContaining({
                url: path+'/'+bundle+'_'+lang+'.properties'
            }));

        });

        it("should generate the correct URL for the bundle with a lang format xx-yy", function(){
            var bundle = 'Bundle',
                path   = 'path',
                lang   = 'en-us',
                fmtLang= 'en-US',
                url    = path+'/'+bundle+'_'+fmtLang+'.properties',
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle: bundle,
                    path: path,
                    lang: lang
                });

            expect(sut.buildURL(fmtLang)).toEqual(url);

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
});