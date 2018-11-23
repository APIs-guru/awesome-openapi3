```graphql
query {
	search(type: REPOSITORY, query: "topic:openapi3", first: 100) {
    edges{
      node {
        ... on Repository {
          url
        }
      }
    }
  }
}
```

```graphql
query { 
  topic(name:"typescript"){
    relatedTopics {
      name
    }
  }
}
```
