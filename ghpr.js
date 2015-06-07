function update_content(data, i) {
  $('#line-length').remove();
  if ($('#files_bucket.is-visible').length) {
    patch_line_length();
  }
}

function patch_link() {
  var headline = $('.gh-header-title');
  var title = $('.js-issue-title', headline).text();
  var matches = title.match(/\#\d+/);
  if (matches) {
    var number = matches[0].substr(1);
    var url = 'https://code.djangoproject.com/ticket/' + number
    headline.parent().append(
      $('<h3><a href="' + url + '">' + url + '</a></h3>')
    );
  }
}

function patch_line_length() {
  $('body').append(
    $('<div style="position: fixed; width: 60px" id="line-length" class="btn btn-danger text-center">&nbsp;</div>')
  );
  var box = $('#line-length');
  var files = $('#files')
  box.css('left', files.offset().left + files.width());
  box.css('top', files.offset().top);
  $('.blob-code.blob-code-addition').on(
    'mouseover', function(event) {
      var line = $(event.target).parents('td');
      var length = line.text().trim().length - 1;
      if (length >= 0) {
        box.text(length);
      } else {
        box.html("&nbsp;");
      }
    }
  );
}

$('#discussion_bucket, #files_bucket').watch({
  properties: "attr_class",
  callback: update_content,
});

update_content();

patch_link();
