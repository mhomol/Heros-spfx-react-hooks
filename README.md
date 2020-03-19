## Heros

This web part interacts with a Heros list and a Hero Teams list to display information about fictitious game characters and the lineups you've placed them in. The goal of this part is as a coding exercise on properly constructing SPFx web parts that need to make multiple api calls throughout its existence while leveraging the new React Hook methodology.

### Setting up the lists

PnP provisioning xml templates have been provided in the Provisioning folder that you can incorporate into your Sharepoint site.

### Building the code

To try out the web part, pull the repo.

```bash
git clone https://github.com/mhomol/Heros-spfx-react-hooks.git
```

Navigate down to the WebParts directory

```bash
cd WebParts
```

Update the npm packages and ensure that gulp is installed globally

```bash
npm i
npm i -g gulp
```

Finally serve up the part.  My advice would be to try this out through your own tenant's workbench, since you will need lists to access.

```bash
gulp serve
```

Happy Hacking!

### Here's some boilerplate from MS when we first build our Web Parts :)

This package produces the following:

- lib/\* - intermediate-stage commonjs build artifacts
- dist/\* - the bundled script, along with other resources
- deploy/\* - all resources which should be uploaded to a CDN.

### Build options after your done messing with it

```bash
gulp bundle --ship
gulp package-solution --ship
```
