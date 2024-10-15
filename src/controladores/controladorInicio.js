exports.inicio = (req, res)=>{
    res.send("Hola mundo del controlador");
};

exports.otra = (req, res) =>{
    var info = {
        nombre: "Mauricio",
        apellido: "Pacheco",
        clase: "Movil II"
    };
    res.json(info);
};

exports.otra2 = (req, res) =>{
    var info = {
        nombre: "Mauricio",
        apellido: "Pacheco",
        clase: "Movil II"
    };  
    res.statusCode = 200;
    res.json({nombreCompleto: info.nombre + ' ' + 
        info.apellido});
};
