# Admin

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ VSD Admin workspace ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/concepts/module-federation/faster-builds-with-module-federation) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Create workspace and generate remote with host apps
```sh
npx create-nx-workspace@latest vsd-admin  --preset=angular-monorepo
cd vsd-admin
nx g @nx/angular:host apps/main --standalone=false  --prefix=main
```

## Run tasks

To run tasks with Nx use:
```sh
npx nx serve main --open --devRemotes=event,news,temple,mandal,family,matrimonial,event,lov,job,facility
```

## Add new remote
```sh
nx g @nx/angular:remote apps/facility --host=main --standalone=false  --prefix=facility
nx g @nx/angular:remote apps/event --host=main --standalone=false  --prefix=event
nx g @nx/angular:remote apps/family --host=main --standalone=false  --prefix=family
nx g @nx/angular:remote apps/job --host=main --standalone=false  --prefix=job
nx g @nx/angular:remote apps/lov --host=main --standalone=false  --prefix=lov
nx g @nx/angular:remote apps/mandal --host=main --standalone=false  --prefix=mandal
nx g @nx/angular:remote apps/matrimonial --host=main --standalone=false  --prefix=matrimonial
nx g @nx/angular:remote apps/news --host=main --standalone=false  --prefix=news
nx g @nx/angular:remote apps/temple --host=main --standalone=false  --prefix=temple
```

## Add New Lib Project
```sh
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
nx g @nx/angular:lib libs/banner-lib --standalone=false  --prefix=banner-lib
nx g @nx/angular:lib libs/faq-lib --standalone=false  --prefix=faq-lib
nx g @nx/angular:lib libs/page-lib --standalone=false  --prefix=page-lib
nx g @nx/angular:lib libs/admin-lib --standalone=false  --prefix=admin-lib
```

## Generate component
```sh
nx g @nx/angular:component apps/main/src/app/home/home --standalone=false

nx g @nx/angular:component apps/main/src/app/temple/list/temple-list --standalone=false
nx g @nx/angular:component apps/main/src/app/temple/manage/mange-temple --standalone=false

nx g @nx/angular:component apps/main/src/app/mandal/list/mandal-list --standalone=false
nx g @nx/angular:component apps/main/src/app/mandal/manage/mange-mandal --standalone=false

nx g @nx/angular:component apps/main/src/app/event/list/event-list --standalone=false
nx g @nx/angular:component apps/main/src/app/event/manage/mange-event --standalone=false

nx g @nx/angular:component apps/main/src/app/news/list/news-list --standalone=false
nx g @nx/angular:component apps/main/src/app/news/manage/mange-news --standalone=false

nx g @nx/angular:component apps/main/src/app/family/family --standalone=false
nx g @nx/angular:component apps/main/src/app/family/list/family-list --standalone=false
nx g @nx/angular:component apps/main/src/app/family/manage/mange-family --standalone=false
nx g @nx/angular:component apps/main/src/app/family/details/family-details --standalone=false

nx g @nx/angular:component apps/main/src/app/facility/list/facility-list --standalone=false
nx g @nx/angular:component apps/main/src/app/facility/manage/mange-facility --standalone=false

nx g @nx/angular:component apps/main/src/app/banner/list/banner-list --standalone=false
nx g @nx/angular:component apps/main/src/app/banner/manage/mange-banner --standalone=false

nx g @nx/angular:component apps/main/src/app/job/list/job-list --standalone=false
nx g @nx/angular:component apps/main/src/app/job/manage/mange-job --standalone=false

nx g @nx/angular:component apps/main/src/app/matrimonial/list/matrimonial-list --standalone=false
nx g @nx/angular:component apps/main/src/app/matrimonial/manage/mange-matrimonial --standalone=false

nx g @nx/angular:component apps/main/src/app/pages/list/pages-list --standalone=false
nx g @nx/angular:component apps/main/src/app/pages/manage/mange-pages --standalone=false

nx g @nx/angular:component apps/main/src/app/faq/list/faq-list --standalone=false
nx g @nx/angular:component apps/main/src/app/faq/manage/mange-faq --standalone=false

nx g @nx/angular:component apps/main/src/app/lov/list/lov-list --standalone=false
nx g @nx/angular:component apps/main/src/app/lov/manage/mange-lov --standalone=false

nx g @nx/angular:component apps/main/src/app/inquiry/list/inquiry-list --standalone=false

nx g @nx/angular:component libs/shared-ui-lib/src/lib/ui/header/header --standalone=false

nx g @nx/angular:component libs/admin-lib/src/lib/list/admin-list --standalone=false
nx g @nx/angular:component libs/admin-lib/src/lib/manage/manage-admin --standalone=false
nx g @nx/angular:component libs/admin-lib/src/lib/change-password/change-password --standalone=false
```

## Generate service file
```sh
nx g @nx/angular:service user --project=data-access-user
```

## Generate auth guard file
```sh
nx g @nx/angular:guard auth --project=core-lib
```
