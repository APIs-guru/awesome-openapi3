---
layout: default
theme: jekyll-theme-cayman
title: APIs.guru awesome-openapi3
site:
  show_downloads: false
---

### Contents

{% for category in site.data.categories %}* <a href="#{{ category.slug }}">{{ category.name }}</a>
{% endfor %}

#### Tools

{% for category in site.data.categories %}

{% assign tmp = site.data.tools | where:"category",category.slug | where:"v3",true | sort: 'name' %}
{% if tmp.size >= 1 %}

<h2><a id="{{category.slug}}">{{category.name}}</a></h2>

| Project | Language | License | Description | Link |
|---|---|---|---|
{% for tool in tmp %}| <a href="{% if tool.link %}{{ tool.link }}{% else %}{{ tool.github }}{% endif %}" data-json="{{ tool | jsonify | url_encode }}"> {{ tool.name }} </a> {% if tool.unsure %}🤔{% endif %}| {{ tool.language }} | {% if tool.license %}<a href="https://spdx.org/licenses/{{tool.license}}.html">{{ tool.license }}</a>{% endif %} | {{ tool.description }} | {% if tool.demo %} <a href="{{ tool.demo }}">{% if tool.demoText %}{{ tool.demoText }}{% else %}Demo{% endif %}</a>{% endif %} |
{% endfor %}

  <a href="#">Back to top</a>

{% endif %}
{% endfor %}

<script src="https://unpkg.com/tippy.js@3/dist/tippy.all.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"></script>

<script type="text/javascript">
  function plural(value,word){
    if (!value) value = 0;
    return value+' '+word+(value === 1 ? '' : 's');
  }
  $(document).ready(function(){
    $('a').each(function(i,e){
        if ($(e).data('json')) {
            var d = JSON.parse(decodeURIComponent($(e).data('json')));
            tippy(e,{ content: plural(d.stars,'star')+', '+plural(d.watch,'watcher')+' and '+plural(d.forks,'fork')+'. '+plural(d.issues,'issue')+'.' });
        }
    });
  });
</script>
