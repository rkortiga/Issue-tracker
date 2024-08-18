### NOTE: 
> To run the IssuesApp.Server you can specify and configure the startup project in Visual Studio to target the IssuesApp.Server. To run the IssuesApp.Client, you can use the Angular CLI command:
```
ng serve --port 4200 or specify your own port
```
> Make sure to also run the build in IssuesDB to generate the DACPAC file and deploy it to your local SQL Server instance.
> Alternatively, you can use the SQL Server Management Studio to import the BACPAC file to your local SQL Server instance. This will also include the data along with the schema.


# A. IssuesApp.Server

## 1. Clone the Repository
- Clone the repository in your local machine.

## 2. Install SQL Server and SQL Server Management Studio (SSMS)
- Download and install SQL Server from [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
- Download and install SQL Server Management Studio (SSMS) from [here](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16).

## 3. Configure appsettings.json
- Create an appsettings.json file in the root directory. See the image and template below:
  ![image](https://github.com/rkortiga/Todo-API/assets/125756155/b9f369bd-8bdc-4bb4-9356-92f59dbf088c)

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "<Your Database Connection String>"
  }
}
```
- Replace <Your Database Connection String> with your actual connection string for your database (Azure SQL or local SQL Server).

## 4. Build
- Open the solution in your preferred IDE (Visual Studio, Visual Studio Code, etc.) and then Run Build. <br>
  ### Note (If you are using Visual Studio Code)
  > You have to install Entity Framework Core Tools if you haven't done so already. Navigate to the root directory, and then install the tools by running `dotnet tool install --global dotnet-ef` in your terminal.
  >
  > Next, open the Program.cs file, and specify the Swagger JSON endpoint by adding the code in the `app.UseSwaggerUI()` method.
  >
    ```
        c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo_API v1");
            c.RoutePrefix = string.Empty;
        }
    ```
  > It should look like this: <br>
  > ![image](https://github.com/rkortiga/Todo-API/assets/125756155/85197f14-b85a-44a3-99a5-4da75ddb3a4b)


## Relevant Links:
- [Getting Started with Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app?tabs=netcore-cli)
- [Azure SQL](https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview?view=azuresql)
- [ASP.NET Core Web API](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio)
- [SQL Server technical documentation](https://learn.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver15)
- [ASP.NET Core web API documentation with Swagger / OpenAPI](https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger?view=aspnetcore-8.0)


# B. IssuesApp.Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Configuring API Base URL
To target the correct API base URL for your backend:
- Open the src/environments/environment.ts file for the development environment or src/environments/environment.prod.ts for production.
- Set the apiBaseUrl property to match the URL of the API running in your backend. For example:

```
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api' // Adjust this to match your backend API URL - this is found on launchsettings should you wish to do more configuration
};
```

## Updating Dependencies
Ensure you have the latest versions of Node.js, Angular CLI, and npm:

Node.js: Install the latest stable version from Node.js official website.

Angular CLI: Update Angular CLI globally by running:
```
npm install -g @angular/cli
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# C. IssuesDB

## T-SQL Database Project

This repository contains SQL Server database projects and related artifacts, including DACPAC and BACPAC files.

## Overview

- **DACPAC**: Data-tier Application Component Package. It is used to deploy and manage SQL Server databases and contains the schema and database objects.
- **BACPAC**: Backup Package. It is used for exporting and importing SQL Server databases and contains both schema and data.


## Getting Started

### Prerequisites

- **SQL Server Management Studio (SSMS)**: Required for importing and exporting BACPAC files.
- **SQL Server Data Tools (SSDT)**: Required for working with DACPAC files.
- **SQL Server Instance**: Make sure you have a SQL Server instance where you can deploy the DACPAC or restore the BACPAC.

### Using DACPAC Files

A DACPAC file is used to deploy a SQL Server database. It includes the database schema and allows you to apply updates and changes to the database.

#### Deploying a DACPAC File

1. **Open SQL Server Management Studio (SSMS)**.
2. **Connect to your SQL Server instance**.
3. **Right-click on the `Databases` node** in Object Explorer.
4. Select **`Deploy Data-tier Application`**.
5. Click **`Next`** on the welcome screen.
6. Click **`Browse`** to locate your DACPAC file and select it.
7. Click **`Next`** to proceed through the wizard.
8. Specify the database name and review the deployment options.
9. Click **`Deploy`** to start the deployment process.

### Using BACPAC Files

A BACPAC file is used to export and import a SQL Server database, including both schema and data.

#### Importing a BACPAC File

1. **Open SQL Server Management Studio (SSMS)**.
2. **Connect to your SQL Server instance**.
3. **Right-click on the `Databases` node** in Object Explorer.
4. Select **`Import Data-tier Application`**.
5. Click **`Next`** on the welcome screen.
6. Click **`Browse`** to locate your BACPAC file and select it.
7. Click **`Next`** to proceed through the wizard.
8. Specify the database name and review the import options.
9. Click **`Finish`** to start the import process.

#### Exporting a BACPAC File

1. **Open SQL Server Management Studio (SSMS)**.
2. **Connect to your SQL Server instance**.
3. **Right-click on the database you want to export** in Object Explorer.
4. Select **`Tasks` > `Export Data-tier Application`**.
5. Click **`Next`** on the welcome screen.
6. Choose the export destination (e.g., local disk or Azure).
7. Specify the file name and location for the BACPAC file.
8. Click **`Next`** to review the export settings.
9. Click **`Finish`** to start the export process.

## Troubleshooting

- **Deployment or Import Errors**: Ensure that the SQL Server instance is running and accessible. Verify that you have the necessary permissions to deploy or import databases.
- **Version Mismatches**: Ensure that the version of SQL Server you are using is compatible with the DACPAC or BACPAC file.

## Further Help

For more detailed information on DACPAC and BACPAC files, refer to the [Microsoft Documentation on DACPAC](https://docs.microsoft.com/en-us/sql/ssdt/how-to-deploy-a-database?view=sql-server-ver15) and [BACPAC](https://docs.microsoft.com/en-us/sql/ssms/backup-restore/export-a-database-to-a-bacpac-file?view=sql-server-ver15) files.
