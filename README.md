# Namma BESCOM Twitter Bot

A bot that tracks tweets from Namma BESCOM about power outages in Bangalore and sends a direct message to me if my area is affected with information about the restoration time.

## Dependencies

1. Node >= v10.21.0
2. npm >= 6.14.4

## Setup

### Twitter Setup
1. Create a twitter developer account. https://developer.twitter.com/en/apply-for-access
2. Create an app on the twitter developer console. https://developer.twitter.com/en/apps
3. Copy the consumer keys and the access keys for the created app.

### Project Setup
1. Either fork or download the app and open the folder in the cli
2. Install all dependencies using the `npm i` command
3. Update the `config.js` file with the twitter credentials

## Run

To start the app, run:
```bash
$ node app.js
```

## Output

A message received from the app when there is a power outage in my area.
![Image of bot DM to me](https://github.com/1nF0rmed/bescomTwitterBot/blob/master/images/output.jpeg)