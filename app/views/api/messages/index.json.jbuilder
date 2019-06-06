json.array! @messages do |message|
  json.id         message.id
  json.content    message.content
  json.image      message.image
  json.date       message.created_at.strftime("%Y/%m/%d %H:%M %Z")
  json.user_name  message.user.name
end
