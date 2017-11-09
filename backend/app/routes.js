function registerVehiclePostHandler() {
    return (req, res) => {
        res.send('registered vehicle.');
    }
}

function updateLocationPostHandler() {
    return (req, res) => {
        res.send('updated vehicle location.');
    }
}

function deregisterVehicleDeleteHandler() {
    return (req, res) => {
        res.send('deregistered vehicle location.');
    }
}

function listVehiclesWithLastest2LocationsGetHandler() {
    return (req, res) => {
        res.send('listing vehicles with lastest 2 locations.');
    }
}

function configureRoutes(router) {
    router.get('/vehicles', listVehiclesWithLastest2LocationsGetHandler());
    
    router.post('/vehicles', registerVehiclePostHandler());
    router.post('/vehicle/:id/locations', updateLocationPostHandler());
    
    router.delete('/vehicle/:id', deregisterVehicleDeleteHandler());
}

module.exports = configureRoutes;