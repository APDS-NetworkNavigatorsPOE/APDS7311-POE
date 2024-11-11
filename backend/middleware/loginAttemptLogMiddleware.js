import LoginAttempt from '../models/LoginAttempt.js';

const loginAttemptLogger = async (req, res, next) => {
    // Store the original res.json function
    const originalJson = res.json.bind(res); // bind res to maintain the correct context

    // Override the res.json function
    res.json = function(data) {
        const username = req.body.username;
        const ipAddress = req.id || req.connection.remoteAddress;
        const successfulLogin = !data.message || data.message !== 'Invalid credentials';

        //Log the login attempt
        LoginAttempt.create({ username, ipAddress, successfulLogin })
            .catch(err => console.error('Error logging login attempt:', err));

        // Call the original res.json with the data
        return originalJson(data); // use originalJson to maintain the original function's behavior
    };

    // Move to the next middleware
    next();
};

export default loginAttemptLogger;
