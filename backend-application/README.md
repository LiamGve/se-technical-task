# Getting Started

## Requirements:
* [Java version >= 17](https://www.oracle.com/uk/java/technologies/downloads/)
* [Gradle plugin >= 3.1.0](https://docs.spring.io/spring-boot/docs/3.1.0/gradle-plugin/reference/html/)
* I recommend using IntelliJ IDEA if you are able as it's the easiest way to get setup.

## To Run
1. start the application with the 'local' profile set
   1. To run in command line run with `-Dspring.profiles.active=local` flag set or set in configuration if using IntelliJ
   2. Note: it will start on port `8080` by default and you should leave it this way to avoid having to change any of the cURL commands below
2. Once running you can open a browser on http://localhost:8080/h2-console to view the DB and run queries on it to check the data. You should replace the field "JDBC URL" with the following:
   1. `jdbc:h2:mem:testdb`
   2. Note: password field can be left blank
   3. click 'connect'
3. Execute the following cURL commands for testing as you see fit (I have also attached a postman collection if you prefer to use an http client in this directory `favourites.postman_collection.json`)

#### cURL for creating favourite mappings:
```
curl -X POST \
  http://localhost:8080/api/v1/favourites \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"userId": "1234",
	"saleId": "asrtb"
}'
```
#### cURL for getting favourite mappings for a user:

```
curl -X GET \
  http://localhost:8080/api/v1/favourites/1234 \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json'
```

#### cURL for deleting favourite mappings for a user:

```
curl -X DELETE \
  'http://localhost:8080/api/v1/favourites/1234?saleId=asrtb' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json'
```

## DB Choice

I have chosen H2 in-memory database to run this application. This means we can get a real-like SQL integration and the exact code may be used in higher 
environments for any SQL based infrastructure (PostgreSQL, Oracle, MySQL, SQLServer etc.). For PROD deployment
to persistent SQL infrastructure we need only set up the `spring.datasource` properties in the UAT and PROD yaml files
`application-uat.yml` and `application-prod.yml`.