describe("Bundle", function() {
    var bundle;
    
    describe("Creation with default values", function() {

        beforeEach(function(){
            bundle = Ext.create('elmasse.i18n.Bundle');
        });
        
        it("should create bundle", function() {
            expect(bundle).toBeDefined();
        });
        
        it("should have default config values on creation", function(){
            var cfg = bundle.config;
            expect(cfg.bundle).toEqual('message');
            expect(cfg.enableLinkedValues).toEqual(false);
            expect(cfg.format).toEqual('property');
            expect(cfg.path).toEqual('resources');
            expect(cfg.noCache).toEqual(true);
        });

        it("should set proxy config values", function(){
            checkProxyConfiguration();
        });

    });

    describe("Creation with params", function() {
        var params = {
            language: 'es-ES',
            format: 'json',
            path: 'files',
            bundle: 'Application',
            
        };
        
        beforeEach(function(){
            bundle = Ext.create('elmasse.i18n.Bundle', params);
        });
        
        it("should create bundle", function() {
            expect(bundle).toBeDefined();
        });
        
        it("should have default config values on creation", function(){
            var cfg = bundle.config;
            expect(cfg.bundle).toEqual(params.bundle);
            expect(cfg.enableLinkedValues).toEqual(false);
            expect(cfg.format).toEqual(params.format);
            expect(cfg.path).toEqual(params.path);
            expect(cfg.noCache).toEqual(true);
        });

        it("should set proxy config values", function(){
            checkProxyConfiguration();
        });

    });
    
    function checkProxyConfiguration() {
        var proxy = bundle.getProxy(),
            path = bundle.getPath(),
            file = bundle.getBundle(),
            lang = bundle.getLanguage(),
            format = bundle.getFormat(),
            noCache = bundle.getNoCache(),
            fileExt = bundle.getResourceExtension(),
            url = path + '/' + file + '_' + lang + fileExt;
        
        expect(proxy.url).toEqual(url);
        expect(proxy.noCache).toEqual(noCache);
        expect(proxy.getReader().type).toEqual('i18n.'+ format);            
    }    


});