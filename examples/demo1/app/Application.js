/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('demo1.Application', {
    extend: 'Ext.app.Application',

    requires: ['elmasse.i18n.Bundle'],
    
    name: 'demo1',

    bundle: {
        bundle: 'Application',
        language: 'en-US',
        path: 'resources',
        noCache: true
    },

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
        console.log(this.bundle.getMsg('app.launch'));
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
