import * as restify from "restify";
import {ModelRouter} from "../common/model-router";
import {Restaurant} from "./restaurants.model";
import {NotFoundError} from "restify-errors";

class RestaurantRouter extends ModelRouter<Restaurant> {
    constructor() {
        super(Restaurant);
    }

    envelope(document: any): any {
        let resource = super.envelope(document);
        resource._links.menu = `${this.basePath}/${resource._id}/menu`;
        return resource;
    }

    findByMenu = (req, res, next) => {
        Restaurant.findById(req.params.id, "+menu")
            .then(response => {
                if (!response) {
                    throw new NotFoundError('Restaurant not found')
                } else {
                    res.json(response.menu);
                    return next();
                }
            })
            .catch(next);
    }

    replaceMenu = (req, res, next) => {
        Restaurant.findById(req.params.id)
            .then(response => {
                if (!response) {
                    throw new NotFoundError('Restaurant not found')
                } else {
                    response.menu = req.body;
                    return response.save();
                }
            })
            .then(response => {
                res.json(response.menu);
                return next();
            })
            .catch(next);
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);

        application.get(`${this.basePath}/:id/menu`, [this.validateId, this.findByMenu]);
        application.put(`${this.basePath}/:id/menu`, [this.validateId, this.replaceMenu]);
    }
}

export const restaurantRouter = new RestaurantRouter();