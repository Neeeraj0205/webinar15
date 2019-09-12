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
    let img1 = $('#msgimg1')
    let img = $('#msgimg')
    let imgdiv = $('#imgdiv')
  
   let user=' '
   loginbtn.click(function(){
       imgdiv.hide()
       user=loginbox.val()
       chatDiv.show()
       loginDiv.hide()
       socket.emit('login',{
           user:user
       })
   })
    

    sendbtn.click(function () {
        
        socket.emit('send_msg', {
            user:user,
            message: msgbox.val()
             
        })
       $( msgbox.val(''))
    })

   

    socket.on('recv_msg', function (data) {
        cloud.show()
        msglist.append($('<li id="msg">' +data.user+ ':' + data.message + '</li>'))
    })
    
})