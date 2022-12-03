import functions from './functions'

export function ioMessage (req, res, next) {
  functions.ioMessage(req.swagger.params, res, next);
};

export function postSocket (req, res, next) {
  functions.postSocket(req.swagger.params, res, next);
};

