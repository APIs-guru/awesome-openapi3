---
layout: bulma
theme: jekyll-theme-cayman
title: APIs.guru awesome-openapi3
site:
  show_downloads: false
permalink: /
---

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://apis-guru/awesome-openapi3">
      <img src="https://avatars0.githubusercontent.com/u/10975548?v=4" width="28" height="28">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true">
      </span>
      <span aria-hidden="true">
      </span>
      <span aria-hidden="true">
      </span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu is-active">
    <div class="navbar-start">
      <a class="navbar-item" href="/awesome-openapi3/about.html">
        About
      </a>

      <a class="navbar-item" href="/awesome-openapi3/language.html">
        By Language
      </a>

      <a class="navbar-item" href="/awesome-openapi3/category.html">
        By Category
      </a>

      <a class="navbar-item" href="/awesome-openapi3/top100.html">
        Top 100
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          API
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item" href="/awesome-openapi3/api/tools.json">
            Tools
          </a>
          <a class="navbar-item" href="/awesome-openapi3/api/categories.json">
            Categories
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" href="/awesome-openapi3/rss/feed.xml">
            RSS Feed
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" id="txtSearch" placeholder="Find a project">
          </div>
          <div class="control">
            <a class="button is-info" id="btnSearch">
              Search
            </a>
          </div>
        </div>
      </div>
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-info" id="btnClear">
            Clear
          </a>
          <a class="button is-primary" href="https://github.com/apis-guru/awesome-openapi3">
            <strong>GitHub</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>

<br>

{% assign tmp = site.data.tools | where:"v3",true | sort: 'name' %}

<ul style="columns: 2;">
{% for tool in tmp %}
<li class="card is-6" id="{{tool.uuid}}">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="{{ tool.logo }}" alt="">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{ tool.name }}</p>
        <p class="subtitle is-6"><a href="{% if tool.link %}{{ tool.link }}{% else %}{{ tool.github }}{% endif %}">{% if tool.link %}{{ tool.link }}{% else %}{{ tool.github }}{% endif %}</a></p>
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
<script src="https://unpkg.com/lunr/lunr.js"></script>
<script>
$(document).ready(function(){
  var documents = [
  {% for tool in tmp %}
  { uuid: "{{tool.uuid}}", name: "{{tool.name}}", description: "{{tool.description}}" },
  {% endfor %}
  ];
  var idx = lunr(function () {
    this.ref('uuid')
    this.field('name')
    this.field('description')

    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  });
  $('#btnClear').click(function(){
    $('#txtSearch').val('');
    $('.card').removeClass('is-hidden');
  });
  $('#btnSearch').click(function(){
    var results = idx.search($('#txtSearch').val());
    if (results.length) {
      $('.card').addClass('is-hidden');
      for (var i=0;i<results.length;i++) {
        var uuid = results[i].ref;
        $('#'+uuid).removeClass('is-hidden');
      }
    }
  });
});
</script>
