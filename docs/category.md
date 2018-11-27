---
layout: default
theme: jekyll-theme-cayman
show_downloads: false
title: APIs.guru awesome-openapi3
---

### Contents

{% for category in site.data.categories %}* <a href="#{{ category.slug }}">{{ category.name }}</a>
{% endfor %}

#### Tools

{% for category in site.data.categories %}

<h2><a id="{{category.slug}}">{{category.name}}</a></h2>

{% assign tmp = site.data.tools | where:"category",category.slug | where:"v3",true | sort: 'name' %}

| Project | Language | License | Description | Link |
|---|---|---|---|
{% for tool in tmp %}| <a href="{% if tool.link %}{{ tool.link }}{% else %}{{ tool.github }}{% endif %}" data-json="{{ tool | jsonify | url_encode }}"> {{ tool.name }} </a> | {{ tool.language }} | {% if tool.license %}<a href="https://spdx.org/licenses/{{tool.license}}.html">{{ tool.license }}</a>{% endif %} | {{ tool.description }} | {% if tool.demo %} <a href="{{ tool.demo }}">{% if tool.demoText %}{{ tool.demoText }}{% else %}Demo{% endif %}</a>{% endif %} |
{% endfor %}

  <a href="#">Back to top</a>

{% endfor %}

<script src="https://unpkg.com/tippy.js@3/dist/tippy.all.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"></script>

<script type="text/javascript">
  $(document).ready(function(){
    $('a').each(function(i,e){
        if ($(e).data('json')) {
            var d = JSON.parse(decodeURIComponent($(e).data('json')));
            tippy(e,{ content: d.stars+' stars, '+d.watch+' watchers and '+d.forks+' forks. '+d.issues+' issues.' });
        }
    });
  });
</script>
