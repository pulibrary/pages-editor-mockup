
var THUMBNAIL_SIZE = 150
var IMAGE_SERVER = "http://libimages1.princeton.edu/loris/"
var THUMBNAIL_PARAMS = "/full/!"+THUMBNAIL_SIZE+","+THUMBNAIL_SIZE+"/0/default.png"



$(function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
});

function htmlForThumbnail(index, data) {
  var liAttrs = {
    class: "ui-state-default image-box",
    "data-objid": data.objectId
  }
  var aAttrs = {
    class: "make-me-zoomable"
  }
  var imgAttrs = {
    class: "thumb",
    src: IMAGE_SERVER + data.imageId + THUMBNAIL_PARAMS,
    alt: data.label
  }
  var labelPAttrs = {
    class: "caption",
    text: data.label
  }
  var $img = $('<img/>', imgAttrs);
  var $a = $('<a/>', aAttrs);
  var $li = $('<li/>', liAttrs);
  var $labelP = $('<p/>', labelPAttrs);

  $a.append($img);
  $a.append($labelP);
  $li.append($a);

  $li.css('width', THUMBNAIL_SIZE+30);
  $li.css('height', THUMBNAIL_SIZE+60);
  return $li
}

function appendDataToSortable(imageData) {
  $.each(imageData, function( index, data ) {
    $( "#sortable" ).append( htmlForThumbnail(index, data) );
  });
}

$(document).ready(function() {
  $.getJSON("js/sampleData.json", function(data){
    appendDataToSortable(data)
  });
});
