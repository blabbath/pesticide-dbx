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
        
        //Get current user
        router.get('/user', controller.currentUser)
        
        //Save state in database
        router.post('/createState', middleware.isLoggedIn, controller.stateCreate)

        //Delete state
        router.post('/:id', middleware.checkOwnership, controller.stateDelete)

        //Create state
        /* router.post(
            ['/synops', '/sales', '/pli', '/pri', '/tli', '/hri'],
            middleware.isLoggedIn,
            (req, res) => {
                let date = new Date();
                let stateName = req.body.state.stateName;
                let grp = req.body.state.grp;
                let act_grp = req.body.state.act_grp;
                let sub_grp = req.body.state.sub_grp;
                let base = req.query.base;
                let user = {
                    id: req.user._id,
                    username: req.user.username,
                };
                let state = {
                    date: date,
                    stateName: stateName,
                    grp: grp,
                    act_grp: act_grp,
                    sub_grp: sub_grp,
                    base: base,
                    user: user,
                };

                State.create(state, (err, state) => {
                    if (err) {
                        console.log(err.message);
                        req.flash(
                            'error',
                            'Name bereits vergeben. Zustand konnte nicht gespeichert werden.'
                        );
                        res.redirect('back');
                    } else {
                        req.flash('success', 'Zustand der Grafik gespeichert!');
                        res.redirect('state');
                    }
                });
            }
        ); */
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
