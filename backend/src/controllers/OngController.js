const generationUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const list = await connection('ongs').select('*');

        return response.json(list);
    },
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
    
        const id = generationUniqueId();
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        return response.json({id});
    }
}