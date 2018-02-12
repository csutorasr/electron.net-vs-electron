# Electron.net vs electron

This example is an angular application that runs with electron.net and electron.

## Deployment

### 1. Build angular

Run `cd angular && npm install && npm run build`.

### 2. Build electron

#### 2.1 Electron with nodejs

Run `cd electron && npm start`.

#### 2.2 Electron.NET

Run `cp -R dist/. electron.net/wwwroot && cd electron.net && dotnet restore && dotnet electronize start`.
