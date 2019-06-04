$(document).on('turbolinks:load', function(){

  function buildHTML(message){
    var content = message.content ? `${message.content} ` : ''
    var image = message.image.url ? `<image src='${message.image.url}', class: 'lower-message__image'>` : ''

    var html = `<div class = "message" data-id=${message.id}>
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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var group_id = location.pathname.split('/')[2]
    var last_message_id = $(".message").last().data('id');
    var url = location.pathname.replace("messages","api/messages.json")
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {group_id,last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      if (messages.length !== 0) {
        messages.forEach(function(message){
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (location.pathname.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 5000);
  }
});