$(document).on('turbolinks:load', function(){

  function buildHTML(message){
    var content = message.content ? `${message.content} ` : ''
    var image = message.image.url ? `<image src='${message.image.url}', class: 'lower-message__image'>` : ''

    var html = `<div class = "message">
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class = "upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      $('.form__submit').removeAttr("disabled");
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })

});