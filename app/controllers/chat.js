module.exports.iniciarChat = function(application,req,res) {
    
    var dadosForm = req.body;  //através do nome do input

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 carateres').len(3,15);
    
    var errors = req.validationErrors();

    if(errors) {
        res.render("index", {validacao: errors})
        return;
    }

    application.get('io').emit(
        'msgParaCliente', 
        {apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat'}
    ); // é possível recuperar pq lá no app o io tá definido como global
    
    res.render('chat', {dadosForm: dadosForm});
}