const { Op } = require('sequelize');
const user = require('../models/User');

module.exports = {
  async show(req, res) {
    // Encontrar todos os usuários que tem email que termina com @outlook.com
    // Desses usuários eu quero buscar todos que moram na rua "Rua Antônio Botelho"
    // Desses usuários eu quero buscar as tecnologias que começam com React

    const users = await user.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@outlook.com%',
        },
      },
      include: [
        { association: 'addresses', where: { street: 'Rua Antônio Botelho' } }, // endereço

        // tecnologias
        {
          association: 'techs',
          required: false,
          where: {
            name: {
              [Op.iLike]: 'Node%',
            },
          },
        },
      ],
    });

    return res.json(users);
  },
};
