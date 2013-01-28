#Ext.i18n.Bundle

##Usage

- First add Bundle to requires on Ext.application as shown in (1)
- Declare the bundle configuration (2)
- Call bundle.getMsg with your bundle key (3). `bundle` is available from the application instance which is available under the `appName`.getApplication() method. 
	

		Ext.application({
		    name: 'AppTest',
   			requires: ['Ext.i18n.Bundle'], //1

	    	//2
	    	bundle: {
    	    	bundle: 'Application',
       		 	lang: 'en-US',
	        	path: 'resources',
    	    	noCache: true
    		},

		    launch: function(){
	    		Ext.create('Ext.panel.Panel',{
	            	renderTo: Ext.getBody(),
					tbar: Ext.create('Ext.toolbar.Toolbar',{
                		items: [{text: 'text'}]
            		}),
            		items:[{
                		height: 300,
                		html: AppTest.getApplication().bundle.getMsg('panel.html') //3
            		}]
        		});
   			}   
		});


##Changelog
master:
    - Draft for 4.1.1/2 
    - Removed onReady method from Ext.i18n.Bundle
    - Added bundle to application

version: 0.3.1
    - First draft for ExtJS 4.1.0-r3