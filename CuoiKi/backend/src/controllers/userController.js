const transporter = require('../configs/email');
const { createUser, findUserByEmail } = require('../models/userModel');
const db = require('../configs/db');
const bcrypt = require('bcrypt');
const initializeManagerAccount = () => {
    const defaultManager = {
        name: 'Admin',
        email: 'minhhh270805@gmail.com',
        password: '27082005', // Thay thế bằng mật khẩu mạnh hơn trong thực tế
    };

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [defaultManager.email], async (err, results) => {
        if (err) {
            console.error('Error checking for manager account:', err);
            return;
        }

        if (!results.length) {
            const hashedPassword = await bcrypt.hash(defaultManager.password, 10);
            const insertQuery = `
                INSERT INTO users (name, email, password, role, is_verified) 
                VALUES (?, ?, ?, 'manager', 1)
            `;
            db.query(insertQuery, [defaultManager.name, defaultManager.email, hashedPassword], (err) => {
                if (err) {
                    console.error('Error creating manager account:', err);
                } else {
                    console.log('Default manager account created successfully.');
                }
            });
        }
    });
};
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Step 1: Register User - Store OTP but delay user creation
const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    // Check if the email already exists
    findUserByEmail(email, async (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (user.length) return res.status(400).json({ message: 'Email already exists.' });

        // Hash password and generate OTP
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        // Temporarily save OTP, name, email, and hashed password
        const query = `
            INSERT INTO user_otps (name, email, hashed_password, otp_code, expires_at)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(query, [name, email, hashedPassword, otp, expiresAt], (err) => {
            if (err) return res.status(500).json({ message: 'Error saving OTP.' });

            // Send OTP via email
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

                res.status(200).json({
                    message: 'OTP sent to email. Please verify to complete registration.',
                    otpSent: true,
                });
            });
        });
    });
};

// Step 2: Verify OTP and Create User
const verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    // Retrieve the pending user info from user_otps table
    const query = 'SELECT * FROM user_otps WHERE email = ? AND otp_code = ?';
    db.query(query, [email, otp], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (!results.length) return res.status(400).json({ message: 'Invalid or expired OTP.' });

        const otpRecord = results[0];

        // Check if the OTP has expired
        if (new Date() > otpRecord.expires_at) {
            return res.status(400).json({ message: 'OTP has expired.' });
        }

        // Create user in users table
        const { name, email, hashed_password } = otpRecord;
        createUser(name, email, hashed_password, (err) => {
            if (err) return res.status(500).json({ message: 'Error creating user.' });

            // Set is_verified to 1 in the users table
            const updateVerifiedQuery = `
                UPDATE users SET is_verified = 1 WHERE email = ?
            `;
            db.query(updateVerifiedQuery, [email], (err) => {
                if (err) return res.status(500).json({ message: 'Error updating verification status.' });

                // Delete the OTP record after successful verification
                const deleteOTPQuery = 'DELETE FROM user_otps WHERE email = ?';
                db.query(deleteOTPQuery, [email]);

                res.status(201).json({ message: 'User registered and verified successfully.' });
            });
        });
    });
};



// Step 3: Login User
const loginUser = (req, res) => {
    const { email, password } = req.body;
  
    // Find the user by email
    findUserByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ message: 'Database error.' });
      if (!user.length) return res.status(404).json({ message: 'User not found.' });
  
      const verifiedUser = user[0];
  
      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, verifiedUser.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Error comparing passwords.' });
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });
  
        // Successful login
        res.status(200).json({
          message: 'Login successful.',
          userId: verifiedUser.id,
          userName: verifiedUser.name, // Send the name for the greeting
        });
      });
    });
  };
  
// Assuming this is within the same file
const findUserByName = (name, callback) => {
    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [name], callback);
};


module.exports = { initializeManagerAccount,registerUser, verifyOTP, loginUser};