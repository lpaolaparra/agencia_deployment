const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomePage = async (req,res)=>{
    /* const promises = [];
    promises.push(
        Viaje.findAll({
        limit: 3
        })
    )

    promises.push(
        Testimonial.findAll({
        limit: 3
        })
    ) 
    //pasar el promises y ejecutarlo
    const resultado = Promise.all(promises);

    resultado.then(result => res.render('index',{
            pagina: 'Proximos Viajes',
            viajes:result[0],
            testimoniales: result[1],
            clase: 'home'
        } ))
        .catch(error => console.log(error))
    */
    const viajes = await Viaje.findAll({ limit: 3 });
    const testimoniales = await Testimonial.findAll({ limit: 3 });
    
    res.render('index',{
            pagina: 'Proximos Viajes',
            viajes,
            testimoniales,
            clase: 'home'
        } )
        
}