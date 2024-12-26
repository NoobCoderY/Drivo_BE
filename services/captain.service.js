const captainModel = require('../models/captain.model');
const Ride = require('../models/ride.model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}

module.exports.getTodayFare = async (captainId) => {
    try {

     
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); 

        console.log(startOfDay, endOfDay);
        

        const rides = await Ride.find({
            captain: captainId,
            status: 'completed',
            updatedAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        console.log(rides,"completed rides");
        
       
        const totalFare = rides.reduce((sum, ride) => sum + ride.fare, 0);

        return totalFare;
        
    } catch (error) {
         throw new Error('Unable to fetch today fare');
    }
}
   
    