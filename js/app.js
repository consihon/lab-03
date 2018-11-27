'use strict';

function Picture(obj){
    this.img_url = obj.image_url;
    this.title = obj.title;
    this.description = obj.description;
    this.keyword = obj.keyword;
    this.horns = obj.horns;
    
    if (!allKeys.includes(obj.keyword)) allKeys.push(obj.keyword);
    allPics.push(this);
}
$(function () {
    // Grab the template script
    var theTemplateScript = $("#expressions-template").html();
  
    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);
  
    // Define our data object
    var context={
      "description": {
        "escaped": "Using {{}} brackets will result in escaped HTML:",
        "unescaped": "Using {{{}}} will leave the context as it is:"
      },
      "example": "<button> Hello </button>"
    };
  
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
  
    // Add the compiled html to the page
    $('.content-placeholder').html(theCompiledHtml);
  });
  
Picture.prototype.render = function(key) {
    if (!key||this.keyword===key){
        $('main').append('<div class="clone"></div>');
        let $clone = $('div[class="clone"]');
        let picTemplate =$('#photo-template').html();
        $clone.html(picTemplate);
        $clone.find('h2').text(this.title);
        $clone.find('img').attr('src', this.img_url);
        $clone.find('p').text(this.description);
        $clone.removeClass('clone');
        $clone.attr('class', this.title);
        $clone.attr('class', this.keyword);
    }
}

const allKeys = [];
const allPics = [];

function readJson () {
    $.get('./data/page-1.json', 'json').then(data =>{
        data.forEach(picObj=>{
            new Picture(picObj);
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

$("select").on("change", function(){
    let selection = $(this).val();
    console.log(selection);
    if(selection==='default'){
        $('main div').show();
    }else{
        $('main div').hide();
        $('.'+selection).show();
    }
});


readJson();



function init (){
    
}