# Electron.net vs electron

This example is an [angular](https://angular.io/) application that runs with [electron.net][2] and [electron][1].

## Deployment

### 1. Build angular

Run `cd angular && npm install && npm run build`.

### 2. Build electron

#### 2.1 Electron with nodejs

Run `cd electron && npm start`.

#### 2.2 Electron.NET

Run `cp -R dist/. electron.net/wwwroot && cd electron.net && dotnet restore && dotnet electronize start`.

## Conclusion

### TL;DR

|               | [Electron with NodeJS][1] | [Electron.NET][2] |
| ------------- | :------: | :----------: |
| First Build time | &#x2713; | &#x2713; |
| Build time | &#x2713; | |
| Documentation | &#x2713; | |

### Detailed

I used electron version 1.8.2 and electron.net version 0.0.7. As it shows electron.net is in beta probably that is the cause of the slowness and bad documentation.

Firstly I created the angular app, changed the output directory. I used [sortablejs](https://github.com/SortableJS/angular-sortablejs) to sort the todos, and `FormsModule` to handle information about the todos. I would like to make my app to be able to run in development so I must have an ability to check if the app runs in an electron environment. In angular it is not the best practice to import from packages without a service as it can be imported more than once. I knew I needed an angular service that can connect electron services to the angular app. I used [ngx-electron](https://github.com/ThorstenHans/ngx-electron/). It has a module that provides the needed service. The only problem with the package is that it is not using ngZone to call the callbacks as it imports services from electron, so ngZone is needed to be added to see the data changing in the application.

The installation was really easy with electron. I followed the instructions of the [docs](https://electronjs.org/docs/tutorial/quick-start). There was no problem, the app could run easily and very fast. The startup time is really low.

The installation for electron.net was not that easy. I created a webapi, then removed everything, that was connected to the mvc. (This was not part of the documentation). I added the packages needed to run and the snippets from the [docs][2]. The electron started. I wanted to show the `../dist` folder with a static file server, but I was not able to configure it, as I did not know where the application is running, so I copied everything to the `wwwroot`. The app showed in the electron, after I added the code that rewrited everything to the `index.html`.

The first-time run is about the same if you look that nodejs install runs on the first `dotnet electronize start`. The installation of electron is the same long for both of the apps.

The next builds are faster in the electron app as dotnet needs to be built.

Next to implement on backend was the persistence. In the dotnet app it took about 10 times longer than in the electron app.

The docs of the dotnet is found in an electronized application. The problem with this was I could not run the app, so I had to use the source code of the `cshtml`s. The example is for only MVC apps, but I added the code to the `app.Use` part. Firstly I tried to serialize the data, but later I realized it is useless, so I decided to not to serialize in the electron app too. (It would be many times harder to implement in dotnet)

The [docs](https://electronjs.org/docs/api/ipc-main) of the electron app is really nice. I just copied the snippet and added the save to file code.

The path of the file was the same directory as the app was started if I used nodejs. With dotnet it was found in `obj/Host/node_modules/.bin`.

As a result I think the development without dotnet is easier if I choose ipc way of communication. But if you use dotnet as an API, it is easier to develop with [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/). The nodejs gives you more freedom to configure the build that cannot be achieved with dotnet. As an example hotreload can be activated with angular.

If you are building an mvc app dotnet has a better structure, but this is not available for angular being a single page app.

[1]: https://github.com/electron/electron
[2]: https://github.com/ElectronNET/Electron.NET
