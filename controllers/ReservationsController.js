// You need to complete this controller with the required 7 actions


const viewPath = 'reservations';
const Reservation = require('../models/reservation');
const User = require('../models/user');


exports.index = async (req, res) => {

    try{
        const reservations = await Reservation
        .find()
        .populate('user');

    res.render(`${viewPath}/index`,{
        pageTitle: 'Reservations',
        reservations: reservations
    });
    } catch(error){
        req.flash('alert', `There was an error displaying the reservations: ${error}`);
        res.redirect('/');
    }
};



exports.show = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
        .populate('user');
        
        res.render(`${viewPath}/show`, {
            pageTitle: 'Reservation',
            reservation: reservation
        });
        
    } catch (error) {
        req.flash('alert', `There was an error displaying this reservation: ${error}`);
        res.redirect('/');
    }
};

exports.new = (req, res) => {
         res.render(`${viewPath}/new`,{
        pageTitle: 'New Reservation'
    });
};


exports.create = async (req, res) => {

    try {
        
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    const reservation = await Reservation.create({user: user._id, ...req.body});

    req.flash('succes', 'Reservation Was successfully created');
    res.redirect(`/reservations/${reservation.id}`);

} catch (error) {
    req.flash('alert', `There was an error creating this reservation: ${error}`);
    req.session.formData = req.body;
    res.redirect('/reservations/new');    
    }
};


exports.edit = async (req, res) => {
try {

    const reservation = await Reservation.findById(req.params.id)
    res.render(`${viewPath}/edit`,{
        pageTitle: 'Reservation',
        formData: reservation
    });
    
} catch (error) {
    req.flash('alert', `There was an error accessing this reservation: ${error}`);
    res.redirect('/');
}

};


exports.update = async (req, res) => {
    try {
        const { user: email } = req.session.passport;
        const user = await User.findOne({email: email});

    const reservation = await Reservation.findById(req.body.id);
    const validation = {user: user._id, ...req.body};    
    await Reservation.validate(validation);
    await Reservation.findByIdAndUpdate(validation.id, validation);

    req.flash('success', 'Reservation was updated');
    res.redirect(`/reservations/${req.body.id}`);
    
    } catch (error) {
        req.flash('alert', `There was an error updating this reservation: ${error}`);
        res.redirect('/');
    }
};


exports.delete = async (req, res) => {
    try {
        await Reservation.deleteOne({_id: req.body.id});
        req.flash('success', 'Reservation was updated');
        res.redirect('/reservations');
    } catch (error) {
        req.flash('alert', `There was an error deleting this reservation: ${error}`);
        res.redirect('/reservations');
    }

};