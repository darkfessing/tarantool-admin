# FORK
Extended timeouts (5m) and more understandable debug-errors.

# Tarantool admin
This application can be used to manage schema and data in tarantool database using web gui.  
Feel free to contribute any way.

## Running existing build [![Docker Repository on Quay](https://quay.io/repository/basis-company/tarantool-admin/status "Docker Repository on Quay")](https://quay.io/repository/basis-company/tarantool-admin)
Run `docker run -p 8000:80 quay.io/basis-company/tarantool-admin`
Open [http://localhost:8000](http://localhost:8000) in your browser.

## Configure using env
Application can be configured via environment:
* TARANTOOL_CHECK_VERSION - default is `true`. set to `false` if you want to disable version check
* TARANTOOL_CONNECT_TIMEOUT - connect timeout
* TARANTOOL_CONNECTIONS - comma-separated connection strings
* TARANTOOL_CONNECTIONS_READONLY - disable connections editor
* TARANTOOL_DATABASE_QUERY - enable Query database tab
* TARANTOOL_ENABLE_VINYL_PAGE_COUNT - if your vinyl spaces are not to large, you can enable index:count requests
* TARANTOOL_READONLY - disable any database changes
* TARANTOOL_SOCKET_TIMEOUT - connection read/write timeout
* TARANTOOL_TCP_NODELAY - disable Nagle TCP algorithm

## You can build image yourself.
* Clone repository: `git clone https://github.com/basis-company/tarantool-admin.git`
* Change current directory: `cd tarantool-admin`
* Run `docker build .`

## Youtube demo
Short demo of ui is available on youtube:

<a href="https://www.youtube.com/watch?v=ApPbFvcozPE" target="_blank"><img src="http://img.youtube.com/vi/ApPbFvcozPE/0.jpg" alt="Short demo" width="240" height="180" border="10" /></a>

## Development

* Install git and docker
* Clone repository: `git clone https://github.com/basis-company/tarantool-admin.git`
* Change current directory: `cd tarantool-admin`
* Run developer environment using `docker-compose up -d`
* Access environment using http://0.0.0.0:8888
* Use "tarantool" hostname configuration with form default values:
  * port 3301
  * username guest
  * password (should be empty)
* Use your favorite ide to edit php/js, all code will be updated on the fly
* Follow https://phptherightway.com/ recommendations
* Don't repeat yourself
