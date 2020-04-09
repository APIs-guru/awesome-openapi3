---
layout: bulma
theme: jekyll-theme-cayman
title: APIs.guru awesome-openapi3
site:
  show_downloads: false
---

{% assign tmp = site.data.tools | where:"v3",true | sort: 'name' %}

<div class="level">
<div class="level-right">
<div class="field has-addons">
  <div class="control">
    <input class="input" type="text" placeholder="Find a project">
  </div>
  <div class="control">
    <a class="button is-info">
      Search
    </a>
  </div>
</div>
</div>
</div>

<br>

<ul style="columns: 2;">
{% for tool in tmp %}
<li class="card is-6">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="{{ tool.logo }}" alt="">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{ tool.name }}</p>
        <p class="subtitle is-6"><a href="{{ tool.github || tool.link }}">{{ tool.github || tool.link }}</a></p>
      </div>
    </div>

    <div class="content">
      {{ tool.description }}
    </div>
  </div>
</li>      
{% endfor %}
</ul>

<script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"></script>
