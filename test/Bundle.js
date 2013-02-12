Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': '../i18n'
    }
});

Ext.require("Ext.i18n.Bundle");

describe("Ext.i18n.Bundle", function(){

    describe("Instance", function(){

        it("should have default properties values if not specified", function(){
            var sut = Ext.create('Ext.i18n.Bundle');

            expect(sut.getBundle()).toBe("message");
            expect(sut.getPath()).toBe("resources");
        });

       it("should have properties values if specified", function(){
            var BUNDLE = "MYBUNDLE",
                PATH   = "MYPATH",
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle:BUNDLE,
                    path: PATH
                });

            expect(sut.getBundle()).toBe(BUNDLE);
            expect(sut.getPath()).toBe(PATH);
        });
    });


    describe("loading bundle from .properties", function(){

        it("should generate the correct URL for the bundle with a lang format xx-YY", function(){
            var bundle = 'Bundle',
                path   = 'path',
                lang   = 'en-US',
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle: bundle,
                    path: path,
                    lang: lang
                });
            expect(sut.formatLanguageCode(lang)).toBe(lang);
            expect(sut.buildURL(lang)).toBe(path+'/'+bundle+'_'+lang+'.properties');
        });

        it("should generate the correct URL for the bundle with a lang format xx", function(){
            var bundle = 'Bundle',
                path   = 'path',
                lang   = 'en',
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle: bundle,
                    path: path,
                    lang: lang
                });

            expect(sut.formatLanguageCode(lang)).toBe(lang);
            expect(sut.buildURL(lang)).toBe(path+'/'+bundle+'_'+lang+'.properties');
        });

        it("should generate the correct URL for the bundle with a lang format xx-yy", function(){
            var bundle = 'Bundle',
                path   = 'path',
                lang   = 'en-us',
                fmtLang= 'en-US',
                sut    = Ext.create('Ext.i18n.Bundle', {
                    bundle: bundle,
                    path: path,
                    lang: lang
                });
            expect(sut.formatLanguageCode(lang)).toBe(fmtLang);
            expect(sut.buildURL(fmtLang)).toBe(path+'/'+bundle+'_'+fmtLang+'.properties');
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