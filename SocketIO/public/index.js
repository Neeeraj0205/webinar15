let socket = io();
socket.on('connected', () => {
    console.log("Connected " + socket.id)
})

$(function () {
    let msglist = $('#msglist')
    let sendbtn = $('#sendmsg')
    let msgbox = $('#msgbox')
    let loginbox = $('#loginbox')
    let loginbtn = $('#loginbtn')
    let loginDiv = $('#login-div')
    let chatDiv = $('#chat-div')
    let cloud = $('#cloud')
  
   let user=' '
   loginbtn.click(function(){
       user=loginbox.val()
       chatDiv.show()
       loginDiv.hide()
       socket.emit('login',{
           user:user
       })
   })
    

    sendbtn.click(function () {
        cloud.show()
        socket.emit('send_msg', {
            user:user,
            message: msgbox.val()
             
        })
       $( msgbox.val(''))
    })

   

    socket.on('recv_msg', function (data) {
        msglist.append($('<li id="msg">' +data.user+ ':' + data.message.split(':')[0].substr(1) + '</li>'))
    })
    
})