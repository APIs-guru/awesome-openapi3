---
layout: default
theme: jekyll-theme-cayman
show_downloads: false
title: APIs.guru awesome-openapi3
---

Why not make your project discoverable by using the topic [openapi3](https://github.com/search?utf8=%E2%9C%93&q=topic%3Aopenapi3&type=Repositories&ref=advsearch&l=&l=) on GitHub and using the hashtags **#openapi3** and **#OASv3** on social media?

## Contributing

Please raise a Pull-Request or issue with any projects we've missed!

### Contents

{% for category in site.data.categories %}* <a href="#{{ category.slug }}">{{ category.name }}</a>
{% endfor %}

#### API access

* [categories.json](/api/categories.json)
* [tools.json](/api/tools.json)

#### Tools

{% for category in site.data.categories %}

## {{ category.name }}

| Project | Language | Description | Link |
|---|---|---|---|
{% for tool in site.data.tools %}{% if tool.category == category.slug && tool.v3 == true %}| <a href="{% if tool.link %}{{ tool.link }}{% else %}{{ tool.github }}{% endif %}"> {{ tool.name }} </a> | {{ tool.language }} | {{ tool.description }} | {% if tool.demo %} <a href="{{ tool.demo }}">Demo</a>{% endif %} | {% endif %}
{% endfor %}

  <a href="#">Back to top</a>

{% endfor %}

