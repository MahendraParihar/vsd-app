# Admin

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ VSD Admin workspace ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/concepts/module-federation/faster-builds-with-module-federation) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Create workspace and generate remote with host apps
```sh
npx create-nx-workspace admin --preset=apps
cd admin
nx g @nx/angular:host apps/main --remotes=event,facility,family,job,lov,mandal,matrimonial,news,temple  --standalone=false  --prefix=vsd-admin
```

## Run tasks

To run tasks with Nx use:
```sh
npx nx serve main --open --devRemotes=event,news,temple,mandal,family,matrimonial,event,lov,job,facility
```

## Add new remote
```sh
nx g @nx/angular:remote apps/facility --host=main --standalone=false  --prefix=vsd-admin
```

## Add New Lib Project
```
nx g @nx/angular:lib libs/core-lib --standalone=false  --prefix=core-lib
nx g @nx/angular:lib libs/event-lib --standalone=false  --prefix=event-lib
nx g @nx/angular:lib libs/family-lib --standalone=false  --prefix=family-lib
nx g @nx/angular:lib libs/facility-lib --standalone=false  --prefix=facility-lib
nx g @nx/angular:lib libs/job-lib --standalone=false  --prefix=job-lib
nx g @nx/angular:lib libs/lovs-lib --standalone=false  --prefix=lovs-lib
nx g @nx/angular:lib libs/mandal-lib --standalone=false  --prefix=mandal-lib
nx g @nx/angular:lib libs/matrimonial-lib --standalone=false  --prefix=matrimonial-lib
nx g @nx/angular:lib libs/news-lib --standalone=false  --prefix=news-lib
nx g @nx/angular:lib libs/shared-ui-lib --standalone=false  --prefix=shared-ui-lib
nx g @nx/angular:lib libs/temple-lib --standalone=false  --prefix=temple-lib
```
Generate component
```
nx g @nx/angular:component apps/main/src/app/base-layout/base-layout --standalone=false
```
Generate service file
```
nx g @nx/angular:service user --project=data-access-user
```
Generate auth guard file
```
nx g @nx/angular:guard auth --project=core-lib
```
