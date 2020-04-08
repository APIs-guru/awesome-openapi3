---
layout: default
theme: jekyll-theme-cayman
title: APIs.guru awesome-openapi3
site:
  show_downloads: false
---

{% assign tmp = site.data.tools | where:"v3",true | sort: 'name' %}

<ul>
{% for tool in tmp %}
<li class="card is-3">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="{{ tool.logo }}" alt="">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{ tool.name }}</p>
        <p class="subtitle is-6">{{ tool.github }}</p>
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
