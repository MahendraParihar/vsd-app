# Client

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This client project is generated based on angular dynamic module federation [Nx, Smart Monorepos · Fast CI.](https://nx.dev/recipes/angular/dynamic-module-federation-with-angular#advanced-angular-micro-frontends-with-dynamic-module-federation)** ✨

## Start the application

Run `npm run dev` to start the development server. Happy coding!

## Build for production

Run `npx nx build client` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Development Commands [Ref Link]()
Add New Host Project with one remote project and dynamic module federation
```
nx g @nx/angular:host apps/employee --remotes=login --dynamic
```

Add New Remote Project
```
nx g @nx/angular:remote apps/todo --host=main --standalone=false  --prefix=vsd
nx g @nx/angular:remote apps/member --prefix=vsd-web-member --host=main --standalone=false
```

Add New Lib Project
```
nx g @nx/angular:lib libs/shared-ui-lib --standalone=false  --prefix=shared-ui-lib
nx g @nx/angular:lib libs/member-lib --standalone=false  --prefix=member-lib
nx g @nx/angular:lib libs/style-lib --standalone=false  --prefix=style-lib
nx g @nx/angular:lib libs/common-lib --standalone=false  --prefix=common-lib
```
Generate component
```
nx g @nx/angular:component ui-input-error --directory libs/shared-ui-lib/src/lib/ui-input-error --standalone=false
```
Generate service file
```
nx g @nx/angular:service user --project=data-access-user
```
Generate auth guard file
```
nx g @nx/angular:guard auth --project=core-lib
```

## Running tasks

To run the client app

```
nx serve main --devRemotes=member
```

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
