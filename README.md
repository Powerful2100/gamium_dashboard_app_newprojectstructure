# GAMIUM Dashboard APP

The Dashboard is a view summary of your assets that can be found under your profile on the [Gamium App Website](https://app.gitbook.com/o/WPl5e5O5Yzu4pYrWYbAD/s/nnyXRL4X7M8kL1EHBGzC/), and in the Wallet section of the [Gamium App](https://app.gitbook.com/o/WPl5e5O5Yzu4pYrWYbAD/s/XOddwbN0z5kLLHW5TaAH/). It helps you to keep track of the value of your portfolio almost in real time, get analytics of your performance, and see your past history. When you search for a Universal Username or address, you can see their dashboard.

## Pending tasks

## Done tasks

## Local developemnt

### Local HTTPs certificates

In Gamium, we usually work with HTTPs also in local mode, this way we can deal with secure connection and cookies in development stage. Therefore, you sholuld crete your own SSL certificates and self.sign them. You can do it following the next steps:

1. Install **[mkcert](https://github.com/FiloSottile/mkcert)** tool, a simple tool for making locally trusted development certificates.

    In MacOS, you can install it with the following command:

    ```sh
    brew install mkcert
    ```

2. Now you can use the tool for creting you own local cerificates:

    ```sh
    mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1
    ```

3. Make soure you have the self-signed certificates in the base path of the project:
    - [cert.pem](./cert.pem)
    - [key.pem](./key.pem)

    This files shopuld be never commited to the remote repository. For this reason they are included in the [.gitignore](./.gitignore) file.

### Run the application locally

1. First, you should install all DEV dependencies:

    ```sh
    npm install
    ```

2. Then, you should add the environment configuration. The applications looks for a config file located at [./src/app/config/config.json](./src/app/config/config.json).

    We will start using the staging settings. For that purpose, copy the staging config file located at [./src/app/config/config.staging.json](./src/app/config/config.staging.json) to [./src/app/config/config.json](./src/app/config/config.json).

3. You are ready to start! You can run a local developemnt server with the next command:

    ```sh
    npm run start
    ````

4. Now you can check that the application is running in [https://localhost:3000/](https://localhost:3001/).

    Your browser will ask you for access to the web through a non-secure communication. You must grant access, as the certificates are not completely secure, as they have been signed by yourself and not by an official entity.

## Go to production ready

### Bundle the applicacion with webpack

1. To deploy the application we should the application budle (a package with all static files). You can perform this action with the next command:

    ```sh
    npm run prod
    ```

    This creates a new [build](./build) directory with all required files for production deployment.

2. You can check that the final version of the applications still works in production mode by serving the [build](./build) directory with:

    ```sh
    npm run serve
    ```

Complete production process:

```sh
npm run production && npm run serve
```
