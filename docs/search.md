---
layout: bulma
theme: jekyll-theme-cayman
title: APIs.guru awesome-openapi3
site:
  show_downloads: false
---

<div class="tile is-ancestor">
{% for tool in site.data.tools %}
<div class="tile is-parent">
<div class="tile is-4">
<div class="card">
  <div class="card-image">
    <img src="{{ tool.avatar }}" alt="Tool Avatar">
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
</div>
{% endfor %}
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"></script>
