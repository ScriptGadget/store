# Store

A simple API server for use [with Gather](https://github.com/ScriptGadget/gather) data gathering.

The project is generated by [LoopBack](http://loopback.io).

## To Install

Setup a [node.js development](https://nodejs.org/en/) environment.

Clone this repository.

Assuming the repository is in a directory named 'Store

```
cd Store
npm install
```

Run store with

```
export store_user='admin' && export store_email='admin@example.com' && export store_password='example' && node .
```

In a separate shell, run a script to create test data.

```
./create-sample-data
```

Note the Technician session ID in the output. You will need this to try API calls in the explorer interface.

Visit the explorer interface at http://localhost:3000/explorer/

You can view the API documentation and try live examples.
