const transporter = require('../configs/email');
const { createUser, findUserByEmail, findUserByName } = require('../models/userModel');
const db = require('../configs/db');
const bcrypt = require('bcrypt');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    findUserByEmail(email, async (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (user.length) return res.status(400).json({ message: 'Email already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);

        createUser(name, email, hashedPassword, (err, result) => {
            if (err) return res.status(500).json({ message: 'Error creating user.' });

            const userId = result.insertId;
            const otp = generateOTP();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

            const query = 'INSERT INTO user_otps (user_id, otp_code, expires_at) VALUES (?, ?, ?)';
            db.query(query, [userId, otp, expiresAt], (err) => {
                if (err) return res.status(500).json({ message: 'Error saving OTP.' });

                const mailOptions = {
                    from: 'minhhh270805@gmail.com',
                    to: email,
                    subject: 'Your OTP Code',
                    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
                };

                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        console.error('Error while sending email:', error);
                        return res.status(500).json({ message: 'Failed to send OTP email.' });
                    }

                    res.status(201).json({
                        message: 'User registered successfully. OTP sent to email.',
                        otpSent: true,
                    });
                });
            });
        });
    });
};
const verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    // Tìm người dùng theo email
    findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (!user.length) return res.status(404).json({ message: 'User not found.' });

        const query = 'SELECT * FROM user_otps WHERE user_id = ? AND otp_code = ?';
        db.query(query, [user[0].id, otp], (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error.' });
            if (!results.length) return res.status(400).json({ message: 'Invalid or expired OTP.' });

            const otpRecord = results[0];

            // Kiểm tra xem OTP đã hết hạn chưa
            if (new Date() > otpRecord.expires_at) {
                return res.status(400).json({ message: 'OTP has expired.' });
            }

            // Cập nhật trạng thái xác minh người dùng
            const verifyUserQuery = 'UPDATE users SET is_verified = TRUE WHERE id = ?';
            db.query(verifyUserQuery, [user[0].id], (err) => {
                if (err) return res.status(500).json({ message: 'Error verifying user.' });

                // Xóa OTP đã xác minh
                const deleteOTPQuery = 'DELETE FROM user_otps WHERE user_id = ?';
                db.query(deleteOTPQuery, [user[0].id]);

                res.status(200).json({ message: 'User verified successfully.' });
            });
        });
    });
};

const loginUser = (req, res) => {
    const { name, password } = req.body;

    findUserByName(name, (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (!user.length) return res.status(404).json({ message: 'User not found.' });

        const verifiedUser = user[0];
        if (!verifiedUser.is_verified) {
            return res.status(400).json({ message: 'User email is not verified.' });
        }

        bcrypt.compare(password, verifiedUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error comparing passwords.' });
            if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });

            res.status(200).json({ message: 'Login successful.', userId: verifiedUser.id });
        });
    });
};

module.exports = { registerUser, verifyOTP, loginUser };