const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    // callbacks
    /*
    index: (req, res, next) => {

        User.find({}, (err, users) => {
            if (err) {
                next(err);
            }

            res.status(200).json(users);
        })
    }, 
    */

    /*
    /// Promises
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                next(err);
            })
    },
    */

    // Async / Await
    index: async (req, res, next) => {
        try{
            const users = await User.find({});
            res.status(200).json(users);
        } catch(err) {
            next(err);
        }
    },

    /*
    newUser: (req, res, next) => {
        const newUser = new User(req.body);

        newUser.save((err, user) => {
            res.status(201).json(user);
        });
    },
    */

    /*
    // Promesas
    newUser: (req, res, next) => {
        const newUser = new User(req.body);
        newUser.save()
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            next(err);
        })
    },
    */
    newUser: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            const user = await newUser.save();
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
        //console.log('req.params', req.params);
    },

    replaceUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;

        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },

    updateUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;

        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },

    getUsersCars: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
    },

    newUserCar: async (req, res, next) => {
        const { userId } = req.params;
        /// creamos un nuevo carro
        const newCar = new Car(req.body);
        /// obtenemos el usuario
        const user = await User.findById(userId);
        ///  asignamos el carro al usuario con seller
        newCar.seller = user;
        ///  guardamos el carro
        await newCar.save();
        ///   Agregamos el carro por medio de un array al usuario
        user.cars.push(newCar);
        /// guardamos el usuario
        await user.save();
        res.status(200).json(newCar);        
    },

};

/*
mongoose puede interactuar de 3 maneras diferentes:
    - Callbacks
    - Promises
    - Asyn/Await (Promises)
*/