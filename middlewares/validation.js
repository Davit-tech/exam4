import _ from "lodash";

export default (schemas, target) => {
    return (req, res, next) => {
        const {error, value} = schemas.validate(req[target], {
            // convert: false,
            abortEarly: false,
        });


        if (_.isEmpty(error)) {
            next();
            return;
        }

        console.log(JSON.stringify(error, null, 2));

        const fields = {};
        error.details.forEach((detail) => {
            fields[detail.path[0]] = detail.message;
        });

        if (!_.isEmpty(fields)) {
            console.log(1)
            res.status(422).json({message: "validation error", fields});
            return;
        }

        next();
    };
};
