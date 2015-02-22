# elmasse-bundle

`Ext.i18n.Bundle` as a Sencha Cmd Package.

## Install
The `latest` stable version is available thru a Sencha Cmd repository located at [elmasse.github.io/cmd/pkgs](http://elmasse.github.io/cmd/pkgs)

### Add the repo to Sencha Cmd
You have to tell Sencha Cmd where to check for new pacakge versions. For `elmasse-bundle` you need to add the repository as follows:

```
sencha repo add elmasse http://elmasse.github.io/cmd/pkgs

```

### Using the package
Once the repository is added to the list, you can declare your dependency on your Sencha Cmd project. Locate the `app.json` file and the `elmasse-bundle` package to the `requires` list:

```json

    "requires": [
        "elmasse-bundle"
    ]

```

Now you just need to refresh the application, and the package will be installed.


```

sencha app refresh

```

### Using the package locally
You can as well use the latest version from this repository:

- Clone this repo
- Rename the folder to `elmasse-bundle`
- Copy the folder under `packages` in your app
- Modify the `app.json` and include the `elmasse-bundle` into the `requires` list.
- Run `sencha app refresh`


## Example
You can see a working example under the `examples` folder.


## Usage

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


### Using json files as bundles
Now you can choose between `.properties` and `.json` files. You can specify which one to use by using the `format` parameter in bundle configuration:


        Ext.application({
            name: 'AppTest',
            requires: ['Ext.i18n.Bundle'],

            bundle: {
                bundle: 'Application',
                lang: 'en-US',
                path: 'resources',
                noCache: true,
                format: 'json' //json format!
            },

            launch: function(){
                Ext.create('Ext.panel.Panel',{
                    renderTo: Ext.getBody(),
                    tbar: Ext.create('Ext.toolbar.Toolbar',{
                        items: [{text: 'text'}]
                    }),
                    items:[{
                        height: 300,
                        html: AppTest.getApplication().bundle.getMsg('panel.html')
                    }]
                });
            }   
        });

As you can imagine the keys must match json keys structure, so for `panel.html` you must have a json response like this:

        {
            "panel":{
                "html" : "Hello from JSON file!"
            }
        }


##Lazy Definition
We can use the lazy definition so the bundle keys are defined into the views. Just use a plain object with the **type:** `bundle` and a **key**.



        Ext.application({
            name: 'AppTest',
            requires: ['Ext.i18n.Bundle'],

            bundle: {
                bundle: 'Application',
                lang: 'en-US',
                path: 'resources',
                noCache: true,
                format: 'json' //json format!
            },

            launch: function(){
                Ext.create('Ext.panel.Panel',{
                    renderTo: Ext.getBody(),
                    tbar: Ext.create('Ext.toolbar.Toolbar',{
                        items: [{text: 'text'}]
                    }),
                    items:[{
                        height: 300,
                        html: { type: 'bundle', key: 'panel.html' }
                    }]
                });
            }   
        });



##Changelog

###version: 1.0.0 (master)
- Sencha Cmd Package
- Working version for Ext5

###version: 0.3.3
- Working version for ExtJS 4.2.0
- Fixed issue with Model ids.

###version: 0.3.2 
- New Json Reader implemented
- Added tests for Bundle, reader.Property and reader.Json
- Draft for 4.1.1/2 
- Removed onReady method from Ext.i18n.Bundle
- Added bundle to application

###version: 0.3.1
- First draft for ExtJS 4.1.0-r3
