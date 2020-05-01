# prefix-cli

## What?

Mechanism for prefixing output from multiplexed cli applications

## Why?
If you have, for example, a repository hosting a client and api applications,
perhaps you'd like to use `npm-run-all`, particularly `run-p` to start up
all parts of the system, running in parallel. In this case, it gets a little
difficult to discern which output is coming from where. To solve this ambiguity,
it would be nice if lines from each process' output were prefixed with something
easily recognisable. Enter `pre`

## Usage

`some-process | pre {label} {color}`

where 
- `label` is any text you'd like to prefix lines with
- `color` is any color understood by [chalk](https://npmjs.com/package/chalk)
    - `color` is optional and will default to white

## Example please?
`prefix-cli` installs a cli application, called `pre`, which will echo any input
it receives on stdin with the provided prefix, optionally colored with the provided
color. For example, we may have started with a scripts section like this in our
package.json:

```json
{
    "scripts": {
        "start-server": "cd server && npm start",
        "start-client": "cd client && npm start"
    }
}
```

so we install `npm-run-all` so that we can launch both commands with one script:

```json
{
    "scripts": {
        "start-server": "cd server && npm start",
        "start-client": "cd client && npm start",
        "start": "run-p start-server start-client"
    },
    "devDependencies": {
        "npm-run-all": "^4.1.5"
    }
}
```

and now our two commands are started simultaneously, with their outputs multiplexed
on the terminal. To disambiguate their outputs, we could install and use `prefix-cli`:

```json
    "scripts": {
        "start-server": "cd server && npm start | pre server yellow",
        "start-client": "cd client && npm start | pre client green",
        "start": "run-p start-server start-client"
    },
    "devDependencies": {
        "npm-run-all": "^4.1.5",
        "prefix-cli": "^1.0.0"
    }
```

and then we would see lines like:
<pre>
<span style="color: yellow">server</span> &gt; setting up routes
<span style="color: green">client</span> &gt; packing stuff...
<span style="color: yellow">server</span> &gt; listening on port 5000
<span style="color: green">client</span> &gt; listening on port 3000
</pre>

This works on the big three platforms (and most likely on others too)
