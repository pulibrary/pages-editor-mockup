var AUTO_SUBMIT_PAGE_CHANGES = false;

var IMAGE_SERVER = "http://libimages1.princeton.edu/loris/";
var THUMBNAIL_PARAMS = "/full/!150,150/0/default.png";

$(function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
});

function liForThumbnail(index, data) {
  liAttrs = { class: "image-box container", "data-objid": data.objectId }
  var $li = $('<li/>', liAttrs);
  $li.append(thumbnailRow(data));
  $li.append(pageEditForm(data));
  return $li
};

function thumbnailRow(data) {
  var $imgRowDiv = $('<div/>', { class: "row thumb-div" });
  var imgSrc = IMAGE_SERVER + data.imageId + THUMBNAIL_PARAMS;
  var $img = $('<img/>', { class: "thumb", src: imgSrc, alt: data.label });
  $imgRowDiv.append($img);
  return $imgRowDiv
};

function pageEditForm(data) {
  $pageFormTag = pageFormTag(data.objectId);
  var labelInputId = "page_label-"+data.objectId;
  $pageFormTag.append(labelTextBox("page[label]", data.label, labelInputId) );
  $pageFormTag.append(pageOptionCheckBoxes(data.objectId));
  return $pageFormTag
};

function pageFormTag(objectId) {
  var formAttrs = {
    "class" : "form-horizonal page-form",
    "id" : objectId+"-metadata",
    "action" : "/pages/"+objectId,
    "accept-charset" : "UTF-8",
    "method" : "post"
  };
  return $('<form/>', formAttrs);
};

function labelTextBox(name, value, id) {
  return $('<div class="form-group">'+
    '<div class="col-sm-12">'+
      '<input type="text" class="form-control" value="'+value+'" name="'+name+'" id="'+id+'"/>'+
    '</div>'+
  '</div>');
};

function pageOptionCheckBoxes(objectId) {
  $fg = $('<div class="col-sm-12"/>');
  $cbDiv = $('<div class="checkbox">');
  $fg.append($cbDiv);
  $nonPagedCB = bsCheckbox("page[non_paged]", "page_non_paged-"+objectId, "Non-paged");
  $cbDiv.append($nonPagedCB);
  $fPCB = bsCheckbox("page[facing_pages]", "page_facing_pages-"+objectId, "Facing pages");
  $cbDiv.append($fPCB);
  return $fg
};

function bsCheckbox(name, id, label) {
  return $('<label class="col-sm-6 page-option">'+
    '<input type="checkbox" name="'+name+'" id="'+id+'">'+label+
  '</label>')
};

function autoSubmitPageChanges() {
  if (AUTO_SUBMIT_PAGE_CHANGES) {
    pageInputs = 'input[name="page[non_paged]"], '
    pageInputs += 'input[name="page[facing_pages]"], '
    pageInputs += 'input[name="page[label]"]'
    $(pageInputs).change(function() {
      $(this).closest('form').submit();
    });
  };
};

function appendDataToSortable(imageData) {
  $.each(imageData, function( index, data ) {
    $( "#sortable" ).append( liForThumbnail(index, data) );
  });
};

$(document).ready(function() {
  $.getJSON("sample_data/sampleData.json", function(data){

    appendDataToSortable(data)
    autoSubmitPageChanges()

  });
});
