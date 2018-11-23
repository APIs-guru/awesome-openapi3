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

<h2><a id="{{category.slug}}">{{category.name}}</a></h2>

{% assign tmp = site.data.tools | where:"category",category.slug | where:"v3",true | sort: 'name' %}

| Project | Language | License | Description | Link |
|---|---|---|---|
{% for tool in tmp %}| <a href="{% if tool.link %}{{ tool.link }}{% else %}{{ tool.github }}{% endif %}" data-json="{{ tool | jsonify | url_encode }}"> {{ tool.name }} </a> | {{ tool.language }} | {{ tool.license }} | {{ tool.description }} | {% if tool.demo %} <a href="{{ tool.demo }}">{% if tool.demoText %}{{ tool.demoText }}{% else %}Demo{% endif %}</a>{% endif %} |
{% endfor %}

  <a href="#">Back to top</a>

{% endfor %}

<script src="https://unpkg.com/tippy.js@3/dist/tippy.all.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"></script>

<script type="text/javascript">
  $(document).ready(function(){
    $('a').each(function(i,e){
        try {
            tippy(e,{ content: $(e).data('json') ? JSON.parse(decodeURIComponent($(e).data('json'))).stars+' stars' : 'No stars!' });
        }
        catch (ex) {
            console.log(ex.message);
            console.log($(e).data('json'));
        }
    });
  });
</script>
