const transporter = require('../configs/email');
const { createUser, findUserByEmail } = require('../models/userModel');
const db = require('../configs/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = '12345';
const initializeManagerAccount = () => {
    const defaultManager = {
        name: 'Admin',
        email: 'minhhh270805@gmail.com',
        password: '27082005', 
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
const registerUser = (req, res) => {
    const { name, email, password } = req.body;


    findUserByEmail(email, async (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (user.length) return res.status(400).json({ message: 'Email already exists.' });

   
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const query = `
            INSERT INTO user_otps (name, email, hashed_password, otp_code, expires_at)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
    otp_code = VALUES(otp_code),
    expires_at = VALUES(expires_at)
        `;
        db.query(query, [name, email, hashedPassword, otp, expiresAt], (err) => {
            console.error('Error while saving OTP:', err);
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

                res.status(200).json({
                    message: 'OTP sent to email. Please verify to complete registration.',
                    otpSent: true,
                });
            });
        });
    });
};


const verifyOTP = (req, res) => {
    const { email, otp } = req.body;

 
    const query = 'SELECT * FROM user_otps WHERE email = ? AND otp_code = ?';
    db.query(query, [email, otp], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (!results.length) return res.status(400).json({ message: 'Invalid or expired OTP.' });

        const otpRecord = results[0];

     
        if (new Date() > otpRecord.expires_at) {
            return res.status(400).json({ message: 'OTP has expired.' });
        }

    
        const { name, email, hashed_password }  = otpRecord;
        createUser(name, email, hashed_password, (err) => {
            console.error('Error while creating user:', err);
            if (err) return res.status(500).json({ message: 'Error creating user.' });

            const updateVerifiedQuery = `
                UPDATE users SET is_verified = 1 WHERE email = ?
            `;
            db.query(updateVerifiedQuery, [email], (err) => {
                if (err) return res.status(500).json({ message: 'Error updating verification status.' });

             
                const deleteOTPQuery = 'DELETE FROM user_otps WHERE email = ?';
                db.query(deleteOTPQuery, [email]);

                res.status(201).json({ message: 'User registered and verified successfully.' });
            });
        });
    });
};






const loginUser = (req, res) => {
    const { email, password } = req.body;
  

    findUserByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ message: 'Database error.' });
      if (!user.length) return res.status(404).json({ message: 'User not found.' });
  
      const verifiedUser = user[0];
  
      bcrypt.compare(password, verifiedUser.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Error comparing passwords.' });
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });
        console.log('Verified users:', verifiedUser);
     
        const token = jwt.sign(
            
          { user_id: verifiedUser.user_id, name: verifiedUser.name, role: verifiedUser.role,email:verifiedUser.email },
          secretKey,
          { expiresIn: '30m' } 
        );
  
        
        res.status(200).json({
          message: 'Login successful.',
          token, // Send the token to the client
          user_id: verifiedUser.user_id,
          userName: verifiedUser.name,
          role: verifiedUser.role,
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