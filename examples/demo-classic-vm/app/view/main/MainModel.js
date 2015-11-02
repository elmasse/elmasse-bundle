/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('demo2.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    requires: ['elmasse.i18n.Bundle'],

    alias: 'viewmodel.main',

    data: {
        name: 'demo2',
        
        language: 'en-US'
    },

    stores: {
        bundle: {
            storeId: 'bundle',
            type: 'i18n.bundle',
            language: '{language}',
            bundle: 'Application',
            path: 'resources',
            enableLinkedValues: true,
            noCache: true,
            autoLoad: true
        },
        list: {
            type: 'personnel',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'resources/list.json',
                reader: {
                    type: 'json',
                    rootProperty: 'items'
                }
            }

        }
    },

    formulas: {
        loremIpsum: function (get) {
            return get('message');
        }
    }

});
