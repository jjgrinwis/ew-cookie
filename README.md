# EW-remove-cookie

An example Akamai Edgeworker script which shows how to get the value from a cookie, put that value in a separate request header but also remove that cookie going forward to origin.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation


```
$ git clone https://github.com/jjgrinwis/ew-cookie.git
$ cd ew-cookie
$ npm init
$ npm install --save-dev typescript
$ npm install @types/akamai-edgeworkers
$ npm list
$ mkdir dist
$ mkdir built
```

Get the group-id you want to create this EdgeWorker in.

*Make sure to use an entry from .edgerc with the correct credentials*


```bash
$ npm run list-groups
```

Update your package.json with the correct group-id and create a new edgeworker-id.
```bash
$ npm run create-ew-id
```
## Usage
Just update the cookieToRemove and headerName vars with your values in main.ts.
```bash
$ npm run build
```

Now update your Akamai Property when to run this EW script
![image](https://github.com/jjgrinwis/ew-cookie/assets/3455889/a26281a8-2a1b-42ce-aa9c-2811d6bd8541)

Activate your property and off you go.

