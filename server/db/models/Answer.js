const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('word',
  {
      word: {
          type: Sequelize.TEXT,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      firstLetter: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    secondLetter: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    thirdLetter: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fourthLetter: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fifthLetter: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
  });
