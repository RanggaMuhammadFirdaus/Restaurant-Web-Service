const Menu = require('../model/menu');
const User = require('../model/user');
const Order = require('../model/order');

exports.updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMenu = req.body;

        const menu = await Menu.findByIdAndUpdate(id, updatedMenu, {
            new: true,
        });

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.status(200).json({ message: 'Menu updated successfully', menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating menu' });
    }
};

exports.deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const menu = await Menu.findByIdAndDelete(id);

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.status(200).json({ message: 'Menu deleted successfully', menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting menu' });
    }
};

exports.orderMenu = async (req, res) => {
    try {
        const { username, menus } = req.body; // Expecting "menus" array

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let totalPrice = 0;
        const orders = [];

        // Loop through each menu in the array
        for (const menu of menus) {
            const menuName = menu.name; // Extract ID from object
            const item = await Menu.findOne({ name: menuName });
            if (!item) {
                return res.status(404).json({ message: 'Menu not found' });
            }

            // Check available quantity
            if (menu.quantity > item.quantity) {
                return res.status(400).json({ message: 'Not enough quantity available' });
            }

            // Calculate subtotal and update total price
            const subtotal = menu.quantity * item.price;
            totalPrice += subtotal;

            // Create order object and push to array
            orders.push(new Order({ user, menu: item._id, quantity: menu.quantity, totalPrice: subtotal }));

            // Update menu quantity
            await Menu.findByIdAndUpdate(item._id, { $inc: { quantity: -menu.quantity } }, { new: true });
        }

        // Save all orders
        await Order.insertMany(orders);

        // Send response with orders and total price
        res.status(200).json({ message: 'Order placed successfully', orders, totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};