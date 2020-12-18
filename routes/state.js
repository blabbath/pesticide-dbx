const express = require('express'),
    router = express.Router();
const controller = require('../controller/state')
const middleware = require('../middleware/index');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //Find all states of a user
        router.get('/', middleware.isLoggedIn, controller.state(this.viewPath));
        
        //Get current user to verify client-side if saving a state is permitted
        router.get('/user', controller.currentUser)
        
        //Save state in database
        router.post('/createState', middleware.isLoggedIn, controller.stateCreate)

        //Delete state
        router.post('/:id', middleware.checkOwnership, controller.stateDelete)
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
