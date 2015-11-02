/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('demo2.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    // BUNDLE LANGUAGE CHANGE EXAMPLE ---------

    listen : {
        store: {
            '#bundle': {
                load: 'loadMessages',
                languagechanged: 'reloadBundle'
            }
        }
    },

    loadMessages: function (bundle) {
        var vm = this.getViewModel();

        bundle.each(function(item){
            var key = item.getId(),
                vmK = key.replace('.', '-');

            vm.set(vmK, bundle.getMsg(key));
        });
    },


    reloadBundle: function (bundle, newLang) {
        // this should be called deferred since changes in VM store will block the store load.        
        Ext.defer(function(){ bundle.load() }, 100);
    },


    langToggle: function () {
        var vm = this.getViewModel(),
            lang = vm.get('language');

        vm.set('language', lang === 'en-US' ? 'es-ES' : 'en-US');
    },

    // END BUNDLE LANGUAGE CHANGE EXAMPLE -----
    

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
