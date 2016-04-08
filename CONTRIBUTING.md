# How to contribute

Pull Requests are more than welcome. Please keep in mind that Tests should pass and (for now) you need to run the test suite on your machine.

# Workspace

In order to build the package, run the tests or execute the examples, you have to first create a workspace using Sencha Cmd:

```bash

    sencha -sdk [YOUR_EXT_JS_SDK_FOLDER] generate workspace my-workspace

```

Now you can clone this repository into the `packages` folder.

# Fork and Clone

```bash
    
    cd my-workspace/packages
    git clone https://github.com/elmasse/elmasse-bundle

```

# Build examples

```bash

    cd elmasse-bundle
    sencha ant examples

```

# Build Package

```bash

    cd elmasse-bundle
    sencha package build

```

This will generate the package `.pkg` file into the build folder. The build folder is usually located at the workspace root folder.

# Tests

In order to run the tests you need to get Sencha Studio (Sencha Test) installed.

- Open Sencha Studio
- Open your workspace
- Locate the `elmasse-bundle` under `Packages` node
- Navigate to `Tests/Unit Tests` and open it.
- Select all the browsers you want to test against and click `run`





