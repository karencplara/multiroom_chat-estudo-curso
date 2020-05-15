/* importar configs  do servidor */
var app  = require('./config/server');


/* parametrizar a porta para protocolo http */
var server = app.listen(80, function() {
  console.log('servidor subiu');
});

var io = require('socket.io').listen(server);

app.set('io', io);

/* parametrizar para o web socket, escuta o lado client e vice-versa */
io.on('connection',function(socket){
  console.log('Usuário conectou');

  socket.on('disconnect', function(){
    console.log('Usuário desconectou');
  });

  socket.on('msgParaServidor', function(data){
     
    /* dialogos */
    socket.emit(  //só para o próprio usuário a msg 
       'msgParaCliente', 
       {apelido:data.apelido, mensagem: data.mensagem}
      );
      socket.broadcast.emit( // para todos os outros da conversa
        'msgParaCliente', 
        {apelido:data.apelido, mensagem: data.mensagem}
       );


    /* participantes relação */
    if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit(  //só para o próprio usuário a msg 
        'participantesParaCliente', 
        {apelido:data.apelido}
       );
       socket.broadcast.emit( // para todos os outros da conversa
         'participantesParaCliente', 
         {apelido:data.apelido}
        );
    }
   
  });
});