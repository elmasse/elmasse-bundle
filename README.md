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

