# ⛔️DEPRECATED⛔️
# Middleman example website

This repository contains a Middleman website integrated with a DatoCMS site. The site is deployed on Netlify, and can be seen at this URL: https://datocms-middleman-example.netlify.com/

To read more about the `middleman-dato` gem, please refer to [its documentation](https://github.com/datocms/middleman-dato).

## Set up your own

By clicking the following button you'll set up a project on DatoCMS with the schema and data that you need to run this Middleman example.

[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/middleman-example)

Then add a `.env` file with your read-only API token, so that Middleman can access the information on your project:

`echo 'DATO_API_TOKEN=abc123' >> .env`

## Usage

```
# install dependencies
bundle install
# build Middleman site
bundle exec middleman build
```

## Website preview

![Website screenshot](https://raw.githubusercontent.com/datocms/jekyll-example/master/screenshot.png)
