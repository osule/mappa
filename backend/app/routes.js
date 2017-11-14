function registerVehiclePostHandler({ Vehicle }, pub) {
    return (req, res) => {
        console.log('register post handler');
        Vehicle.create({ id: req.body.id, locations: []}, (err, created) => {
            if (err || !created) return res.status(500).json(err);
            console.log('created vehicle: ', req.body.id);
            pub.publish('vehicles/register', JSON.stringify(req.body));
            return res.status(204).send();
        });
    }
}

function updateLocationPostHandler({ Vehicle }, pub) {
    return (req, res) => {
        Vehicle.update({id: req.params.id}, {$push: {locations: req.body}}, (err, updated) => {
            if(err || !updated) return res.status(500).json(err);
            const message = Object.assign({}, { id: req.params.id}, req.body);
            pub.publish('vehicles/update_location', JSON.stringify(message));
            return res.status(204).send();
        });
    }
}

function deregisterVehicleDeleteHandler({ Vehicle }, pub) {
    return (req, res) => {
        //delete from postgres db.
        Vehicle.remove({id: req.params.id}, (err, deleted) => {
            if(err || !deleted) return res.status(500).json(err);
            const message = { id: req.params.id };
            pub.publish('vehicles/deregister', JSON.stringify(message));
            return res.status(204).send();
        });
    }
}

function listVehiclesWithLastest2LocationsGetHandler({ Vehicle }, pub) {
    return (req, res) => {
        Vehicle.find({ locations: { $ne: [] } }, (err, vehicles) => {
            if(err) return res.status(500).json(err);
            return res.json(vehicles);
        });
    }
}

function configureRoutes(router, db, { pub, }) {
    router.get('/vehicles', listVehiclesWithLastest2LocationsGetHandler(db, pub));
    
    router.post('/vehicles', registerVehiclePostHandler(db, pub));
    router.post('/vehicles/:id/locations', updateLocationPostHandler(db, pub));

    router.delete('/vehicles/:id', deregisterVehicleDeleteHandler(db, pub));
}

module.exports = configureRoutes;