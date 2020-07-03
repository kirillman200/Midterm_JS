// You need to define the schema for a reservation
// The fields you require are:
// associated user
// numOfOccupants (number of occupants)
// roomType (options are 'single bed', 'double bed', 'queen', 'king')
// checkIn (just date, not time)
// checkOut (just date, not time)

const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      roomType: {
        type: String,
        enum: ['Single Bed', 'Double Bed', 'Queen', 'King'],
        default: 'Singe Bed',
        required: true
    },
      numOfOccupants: {
        type: Number,
        required: true
      },
        
    checkIn: {
        type: Date,
        required: true,
        set: checkIn => {
            return new Date(checkIn);
          },
          get: checkIn => {
            return `${checkIn.getFullYear()}-${checkIn.getMonth() + 1}-${checkIn.getDate()}`;
          }
    },

    checkOut: {
        type: Date,
        required: true,
        set: checkOut => {
            return new Date(checkOut);
          },
          get: checkOut => {
            return `${checkOut.getFullYear()}-${checkOut.getMonth() + 1}-${checkOut.getDate()}`;
          }
    }
});


module.exports = mongoose.model('Reservation', ReservationSchema);