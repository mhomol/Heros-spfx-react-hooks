## Heros

This web part interacts with a Heros list and a Hero Teams list to display information about fictitious game characters and the lineups you've placed them in. The goal of this part is as a coding exercise on properly constructing SPFx web parts that need to make multiple api calls throughout its existence while leveraging the new React Hook methodology.

### Setting up the lists

PnP provisioning xml templates have been provided in the Provisioning folder that you can incorporate into your Sharepoint site.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

- lib/\* - intermediate-stage commonjs build artifacts
- dist/\* - the bundled script, along with other resources
- deploy/\* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
