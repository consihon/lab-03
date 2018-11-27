'use strict';

function Picture(obj,page){
  this.img_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  this.page = page;

  if (!allKeys.includes(obj.keyword)) allKeys.push(obj.keyword);
  allPics.push(this);
  console.log(this);
}


Picture.prototype.render = function() {
  $('body').append(`<div class="clone"></div>`);
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
  $clone.attr('class', this.page);
  $clone.removeClass('clone');

};

const allKeys = [];
const allPics = [];

function readJson (json, page) {
  $.get(json, 'json').then(data =>{
    data.forEach(picObj=>{
      new Picture(picObj,page);
    })
  }).then(() =>{
    allKeys.forEach((key)=>{
      $('select').append('<option class="opt"></option>');
      let $opt = $('option[class="opt"]');
      $opt.text(key);
      $opt.removeClass('opt');
      $opt.attr('id',key);
    })
  }).then(() => {
    allPics.forEach(picture => {
      picture.render();
    })
  })
}

$('select').on('change', function(){
  let selection = $(this).val();
  console.log(selection);
  if(selection==='default'){
    $('main div').show();
  }else{
    $('main div').hide();
    $('.'+selection).show();
  }
});


readJson('./data/page-1.json',1);
readJson('./data/page-2.json',2);



function init (){

}
