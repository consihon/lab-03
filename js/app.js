'use strict';


const allKeys = [];
const allPics = [];
var page =1;

function Picture(obj,page){
  this.img_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  this.page = page;

  if (!allKeys.includes(obj.keyword)) allKeys.push(obj.keyword);
  allPics.push(this);
  this.render();
}


Picture.prototype.render = function() {
  $('main').append(`<div class="clone"></div>`);
  let $clone = $('div[class="clone"]');
  // Grab the template script
  let pictureTemplate = $('#picture-template').html();

  // Compile the template
  var picTemplate = Handlebars.compile(pictureTemplate);

  // Define our data object
  let context={
    'title':`${this.title}`,
    'img':`<img src="${this.img_url}">` ,
    'description': `${this.description}`
  };
  // Pass our data to the template
  var theCompiledHtml = picTemplate(context);
  // Add the compiled html to the page
  $clone.html(theCompiledHtml);
  $clone.attr('class', this.keyword);
  $clone.addClass(`${this.page}`);
  $clone.removeClass('clone');

};

function readJson (json, page) {
  $.get(json, 'json').then(data =>{
    data.forEach(picObj=>{
      new Picture(picObj,page);
    })
    console.log(allPics);
  }).then(() =>{
    allKeys.forEach((key)=>{
      $('select').append('<option class="opt"></option>');
      let $opt = $('option[class="opt"]');
      $opt.text(key);
      $opt.removeClass('opt');
      $opt.attr('id',key);
    })
  })
}

$('select').on('change', function(){
  let selection = $(this).val();
  if(selection==='default'){
    $('main div').show();
  }else{
    $('main div').hide();
    $('.'+selection).show();
  }
});

$(function () {
  $('#1').on('click', function(){
    $('main div').hide();
    $('.1').show();
  })
})

$(function () {
  $('#2').on('click', function(){
    $('main div').hide();
    $('.2').show();
  })
})



function init (){
  readJson('./data/page-1.json',1);
  readJson('./data/page-2.json',2);
}

init();