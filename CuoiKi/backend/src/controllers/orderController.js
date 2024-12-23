const axios = require('axios');
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');

const createOrder = async (req, res) => {
    try {
        const { receiverName, phoneNumber, location, items } = req.body;

        // Kiểm tra số điện thoại trong cơ sở dữ liệu
        Order.findOrderByPhoneNumber(phoneNumber, async (err, existingOrder) => {
            if (err) {
                console.error('Error finding order by phone number:', err);
                return res.status(500).json({ message: 'Error checking phone number', error: err });
            }

            // Nếu số điện thoại đã tồn tại, tăng purchase_count
            if (existingOrder) {
                try {
                    await new Promise((resolve, reject) => {
                        Order.incrementPurchaseCount(phoneNumber, (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                } catch (error) {
                    console.error('Error updating purchase count:', error);
                    return res.status(500).json({ message: 'Failed to update purchase count', error });
                }
            }

            // Hàm lấy giá và liên kết ảnh của từng sản phẩm
            const getPriceAndImage = async (itemName) => {
                const [drinksResponse, foodsResponse, noodlessResponse, breadsResponse, dessertsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/drinks'),
                    axios.get('http://localhost:5000/api/foods'),
                    axios.get('http://localhost:5000/api/noodless'),
                    axios.get('http://localhost:5000/api/breads'),
                    axios.get('http://localhost:5000/api/dessert'),
                ]);

                const allProducts = [
                    ...drinksResponse.data.map((p) => ({ ...p, category: 'drinks' })),
                    ...foodsResponse.data.map((p) => ({ ...p, category: 'foods' })),
                    ...noodlessResponse.data.map((p) => ({ ...p, category: 'noodless' })),
                    ...breadsResponse.data.map((p) => ({ ...p, category: 'breads' })),
                    ...dessertsResponse.data.map((p) => ({ ...p, category: 'dessert' })),
                ];

                const product = allProducts.find((p) => p.name === itemName);

                if (!product) {
                    throw new Error(`Item ${itemName} not found`);
                }

                return { price: product.price,
                         image_url: product.image_url,
                         quantity:product.quantity,
                         id: product.id,
                         category: product.category,
                         name: product.name ,
                         supplier: product.supplier,
                         description :product.description,
                         entry_date:product.entry_date,
                         expiry_date:product.expiry_date,
                        };
            };
            const formatDate = (isoDate) => {
                const date = new Date(isoDate);
                return date.toISOString().split('T')[0]; // Chỉ lấy phần YYYY-MM-DD
            };

            // Tính tổng tiền và chuẩn bị chi tiết sản phẩm
            let total = 0;
            const itemsWithDetails = [];

            for (const item of items) {
                const { price, image_url,quantity,category,id,name,supplier, entry_date,expiry_date,description } = await getPriceAndImage(item.name);
                total += price * item.soluong;
                
                if (item.soluong > quantity) {
                    return res.status(400).json({
                        message: `Not enough stock for item ${item.name}`,
                        available: quantity,
                        requested: item.soluong,
                    });
                } 
                try {
                    const updatedData = {
                        quantity: quantity - item.soluong,
                        name,
                        price,
                        image_url,
                        entry_date: formatDate(entry_date), // Chuyển đổi
                        expiry_date: formatDate(expiry_date),
                        description ,
                        supplier,
                        category, // Có thể cần thêm nếu backend yêu cầu
                        id,       // Có thể cần thêm nếu backend yêu cầu
                    };
                
                    console.log(`Updating stock for ${item.name}:`, updatedData);
                
                    await axios.put(`http://localhost:5000/api/${category}/${id}`, updatedData);
                } catch (error) {
                    console.error(`Error updating stock for ${item.name}:`, error.response?.data || error.message);
                
                    return res.status(500).json({
                        message: `Failed to update stock for ${item.name}`,
                        error: error.response?.data || error.message,
                    });
                }
                
                itemsWithDetails.push({
                    name: item.name,
                    soluong: item.soluong,
                    price,
                    image_url,
                });
            }

            const orderData = {
                receiverName,
                phoneNumber,
                location,
                total,
            };

            // Tạo đơn hàng mới
            Order.createOrder(orderData, async (err, orderId) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to create order', error: err });
                }

                try {
                    // Lưu thông tin sản phẩm vào bảng order_items
                    await Promise.all(
                        itemsWithDetails.map((item) => {
                            return new Promise((resolve, reject) => {
                                OrderItem.createOrderItem(
                                    {
                                        orderId,
                                        productName: item.name,
                                        soluong: item.soluong,
                                        price: item.price,
                                        image_url: item.image_url,
                                    },
                                    (err) => {
                                        if (err) reject(err);
                                        else resolve();
                                    }
                                );
                            });
                        })
                    );

                    // Phản hồi thông tin đơn hàng và sản phẩm chi tiết
                    res.status(201).json({
                        message: 'Order created successfully',
                        order: {
                            id: orderId,
                            receiverName,
                            phoneNumber,
                            location,
                            total,
                            items: itemsWithDetails,
                        },
                    });
                } catch (error) {
                    console.error('Error saving order items:', error);
                    res.status(500).json({ message: 'Failed to save order items', error });
                }
            });
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error });
    }
};

const getAllOrders = (req, res) => {
    Order.getAllOrders((err, orders) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ message: 'Failed to fetch orders', error: err });
        }
        res.status(200).json({ orders });
    });
};

module.exports = { createOrder, getAllOrders };