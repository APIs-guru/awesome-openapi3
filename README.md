# awesome-openapi3 [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)
A list of awesome projects related to OpenApi 3.0.x

<div align="center">
  <img src="https://github.com/Mermade/awesome-openapi3/blob/master/openapi_awesome1.png?raw=true"/>
</div>

Why not make your project discoverable by using the topic [openapi3](https://github.com/search?utf8=%E2%9C%93&q=topic%3Aopenapi3&type=Repositories&ref=advsearch&l=&l=) on GitHub and using the hashtags **#openapi3** and **#OASv3** on social media?

## Contributing

Please raise a Pull-Request or issue with any projects we've missed!

## Contents
* [Converters](#converters)
* [Documentation Viewers/Consoles](#documentation-viewersconsoles)
* [Editors](#editors)
* [Generators](#generators)
* [Server implementations](#server-implementations)
* [Parsers/Models/Validators](#parsersmodelsvalidators)
* [Transition Guidelines/Documentation](#transition-guidelinesdocumentation)

## Converters

Tool|Language|Description|Website
---|---|---|---|
[swagger2openapi](https://github.com/mermade/swagger2openapi)|Node.js|An OpenAPI / Swagger 2.0 to OpenAPI 3.0.x converter and validator|https://openapi-converter.herokuapp.com
[odata-openapi](https://github.com/oasis-tcs/odata-openapi) | XSLT | OData 4.0 to OpenAPI 3.0.0 converter |
[openapi-filter](https://github.com/Mermade/openapi-filter) | Node.js | Filter internal components from OpenAPI 2.0 / 3.0.x definitions
[phpsx](https://github.com/apioo/psx) | PHP | PHP REST API Framework | https://phpsx.org/tools/openapi
[OData.OpenAPI](https://github.com/xuzhg/OData.OpenAPI) | dotnet | Convert an Edm (Entity Data Model) to OpenApi 3.0. | 
[pyswagger](https://github.com/mission-liao/pyswagger)|Python|support coming soon|

##  Documentation Viewers/Consoles

Tool|Language|Description|Website
---|---|---|---|
[openapi-viewer](https://github.com/koumoul-dev/openapi-viewer)|Vue.js|uses [vue-openapi component](https://github.com/koumoul-dev/vue-openapi)<br/>Docker image `docker run -p 8080:8080 koumoul/openapi-viewer`|https://koumoul.com/openapi-viewer/<br/>https://koumoul.com/s/geocoder/api-doc
[openapi-ui](https://github.com/contentjet/openapi-ui)|React.js|React based OpenAPI 3.0+ documentation generator 
[io-docs](https://github.com/mikeralphson/iodocs)|Node.js|fork of Mashery IO-docs with OpenAPI 2/3 support|http://io-docs.herokuapp.com/ 
[lincoln](https://github.com/temando/open-api-renderer)|React.js|A React renderer for Open API v3|https://temando.github.io/open-api-renderer/demo/?url=https://temando.github.io/open-api-renderer/petstore-open-api-v3.0.0-RC2.json
[widdershins](https://github.com/mermade/widdershins)|Node.js|Generate Slate/Shins markdown from OpenAPI 3.0.x|https://mermade.github.io/shins

## Editors

Tool|Language|Description|Website
---|---|---|---|
[KaiZen OpenAPI Editor](https://github.com/RepreZen/KaiZen-OpenAPI-Editor)|Java|Eclipse Editor for the Swagger-OpenAPI Description Language|https://github.com/RepreZen/KaiZen-OpenAPI-Editor
[openapi-gui](https://github.com/Mermade/openapi-gui/tree/buefy)|Vue.js|Visual creator/editor for OpenAPI definitions|https://openapi-gui.herokuapp.com/
[RepreZen API Studio](https://www.reprezen.com/swagger-tools)|Java|API Design Just Got Real.|https://www.reprezen.com/
[Apicurio-Studio](https://github.com/Apicurio/apicurio-studio)|TypeScript|Open Source API Design|http://www.apicur.io
[Rápido](https://github.com/apiacademy/rapido-web)|Javascript|Discover your best API design faster.|https://rapidodesigner.com/

## Generators

Tool|Language|Description|Website
---|---|---|---|
[baucis-openapi3](https://github.com/metadevpro/baucis-openapi3)|Node.js|plugin for [baucis.js](https://github.com/wprl/baucis)|
[Google Gnostic](https://github.com/googleapis/gnostic)|Go|Compile OpenAPI descriptions into equivalent Protocol Buffer representations
[serverless-openapi-documentation](https://github.com/temando/serverless-openapi-documentation)|Typescript|Serverless 1.0 plugin to generate OpenAPI V3 documentation from serverless configuration|
[zero-rails_openapi](https://github.com/zhandao/zero-rails_openapi)|Ruby|Provide concise DSL for generating the OpenAPI Specification 3 (OAS3) documentation JSON file for Rails application, then you can use Swagger UI 3.2.0+ to show the documentation.
[slush-vertx](https://www.npmjs.com/package/slush-vertx) | Java, Kotlin & Groovy | Generate server skeleton for [Vert.x Web API Contract](http://vertx.io/docs/#web) and API Client based on [Vert.x 3 Web Client](http://vertx.io/docs/#web) | [NPM Package](https://www.npmjs.com/package/slush-vertx) [Github Repo](https://github.com/pmlopes/slush-vertx)
[openapi-codegen](https://github.com/mermade/openapi-codegen)|Node.js|Port of swagger-codegen templates, with OpenAPI 3.0 support|https://mermade.github.io/openapi-codegen
[light-codegen](https://github.com/networknt/light-codegen) | Java | Generate both Swagger 2.0 and OpenAPI 3.0 projects | https://doc.networknt.com/tutorial/generator/openapi/

## Server Implementations
Tool|Language|Description|Website
---|---|---|---|
[Vert.x Web API Contract](http://vertx.io/docs/#web) | Java, Kotlin, JavaScript, Groovy, Ruby, Ceylon & Scala | Create an API endpoint with Vert.x 3 and OpenAPI 3 with automatic requests validation | [Vert.x Web API Contract documentation](http://vertx.io/docs/#web) 
[light-rest-4j](https://github.com/networknt/light-rest-4j) | Java | Generate project based on OpenAPI 3.0
project and use the specification during runtime for OAuth 2.0 scope verification and validation | https://doc.networknt.com/tutorial/rest/openapi/petstore/

## Parsers/Models/Validators

Tool|Language|Description|Website
---|---|---|---|
| [swagger-parser](https://github.com/swagger-api/swagger-parser/tree/feature/3.0.0-rc0) | Java | Swagger 1.0, 1.1, 1.2, 2.0 to Open API Specification converter |
| [swagger-models](https://github.com/swagger-api/swagger-core/tree/feature/3.0.0-rc0/modules/swagger-models) | Java | Open API 3.0 Java Pojos |
| [KaiZen OpenAPI Parser](https://github.com/RepreZen/KaiZen-OpenApi-Parser) | Java | High-performance Parser, Validator, and Java Object Model for OpenAPI 3.x |
[openapi3-ts](https://github.com/metadevpro/openapi3-ts)|typescript|TS Model & utils for OpenAPI 3.0.x contracts|
[oai-ts-core](https://github.com/Apicurio/oai-ts-core)|typescript|Core typescript library to read and manipulate OpenAPI specification definitions|
[Tavis.OpenApi](https://github.com/tavis-software/Tavis.OpenApi/)|dotnet|C# based parser with definition validation and migration support from V2 | http://openapiconverter.azurewebsites.net/
[openapi4j](https://github.com/gskorupa/openapi4j)|Java|
[kin-openapi](https://github.com/jban332/kin-openapi)|Go|A Go library for handling OpenAPI 3.0 specifications|
[openapi3-rust](https://github.com/adwhit/openapi3-rust)|Rust|Rust serialization library for OpenAPIv3|
[psx-api](https://github.com/apioo/psx-api) | PHP | Parse and generate API specification formats | http://phpsx.org
[openapi-spec-validator](https://github.com/p1c2u/openapi-spec-validator) | Python | OpenAPI Spec validator | [Docker image](https://hub.docker.com/r/usabillabv/openapi3-validator/)
[openapi-parser](https://github.com/networknt/openapi-parser) | Java | Based on KaiZen generated code but removed Javaparser-core, guava, commons-cli, commons-io, javax.mail and guice for microservices | https://doc.networknt.com/getting-started/light-rest-4j/

## Transition Guidelines/Documentation

* [swaggerplusplus](https://github.com/mermade/swaggerplusplus)
* [OpenAPI Visual Documentation](http://apihandyman.io/openapi-visual-documentation-updated-with-3.0.0-rc0/)
* [Comparing OpenAPI 2.0 and 3.0.x definitions (blog posting)](https://dev.to/mikeralphson/comparing-openapiswagger-20-and-300-rc1)
* [Converting OpenAPI 2.0 to 3.0.0 (blog posting)](https://blog.runscope.com/posts/tutorial-upgrading-swagger-2-api-definition-to-openapi-3)
