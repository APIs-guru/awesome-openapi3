---
layout: bulma
theme: jekyll-theme-cayman
title: APIs.guru awesome-openapi3
site:
  show_downloads: false
permalink: /
---

{% include header.md }

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
    <div class="card-footer">
      <span class="card-footer-item">{% if tool.stars %}Stars:&nbsp;<strong>{{tool.stars}}</strong>{% endif %}</span>
      <span class="card-footer-item">{% if tool.license %}License:&nbsp;<a href="https://spdx.org/licenses/{{tool.license}}">{{tool.license}}</a>{% endif %}</span>
    </div>
  </div>
</li>      
{% endfor %}
<li class="is-hidden card is-6" id="liDummy">
  <div class="card-content"></div>
</li>
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
    $('#liDummy').addClass('is-hidden');
  });
  $('#txtSearch').keypress(function(e) {
    if (e.keyCode == 13) {  // enter
      $('#btnSearch').click();
    }
  });
  $('#btnSearch').click(function(){
    var results = idx.search($('#txtSearch').val());
    if (results.length) {
      $('.card').addClass('is-hidden');
      for (var i=0;i<results.length;i++) {
        var uuid = results[i].ref;
        $('#'+uuid).removeClass('is-hidden');
      }
      if (results.length % 2 === 1) {
        $('#liDummy').removeClass('is-hidden');
      }
    }
  });
});
</script>
