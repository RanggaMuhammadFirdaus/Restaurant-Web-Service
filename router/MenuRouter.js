const express = require('express');
const Menu = require('../model/menu');

const menuController = require('../controlller/MenuController');


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newMenu = new Menu(req.body);
        await newMenu.save();
        res.status(201).json({ message: 'Menu created successfully', menu: newMenu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating menu' });
    }
});

router.get('/', async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching menus' });
    }
});

router.put('/:id', menuController.updateMenu);

router.delete('/:id', menuController.deleteMenu);

router.post('/order', menuController.orderMenu);

router.get('/orders', menuController.getAllOrders);



// Add more routes for updating, deleting, or specific menu actions as needed

module.exports = router;
