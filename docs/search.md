---
layout: bulma
theme: jekyll-theme-cayman
title: APIs.guru awesome-openapi3
site:
  show_downloads: false
---

{% assign tmp = site.data.tools | where:"v3",true | sort: 'name' %}

<div class="tile is-ancestor is-12">
{% for tool in tmp %}
<div class="tile is-parent is-12">
<div class="tile is-child card is-5">
  <div class="card-image">
    <img src="{{ tool.logo }}" height="150" width="150" alt="">
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
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
</div>      
</div>
{% endfor %}
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"></script>
