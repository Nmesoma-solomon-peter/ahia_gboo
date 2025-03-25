const { DataTypes } = require("sequelize");
const db = require("../connectDb");

const Artifacts = db.define("Artifacts",  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    hostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", // References the User model
            key: "id",
        },
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},{ timestamps: true });

Artifacts.associate = (models) => {
    // A Property can have many Bookings
    Artifacts.hasMany(models.Booking, {
      foreignKey: 'propertyId', // The foreign key in the Booking table
      as: 'Bookings', // Alias for the association
    });
  };

module.exports = Artifacts


