const Joi = require('joi');

class TransactionSchema {
  constructor() {
    this.schema = Joi.object({
      id: Joi.number(),
      amount: Joi.string().required(),
      category: Joi.string().required(),
      date: Joi.string().required(),
      description: Joi.string(),
    });
    this.options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
  }

  validate(req, next) {
    const {error, value} = this.schema.validate(req.body, this.options);

    if (error) {
      next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
      return value;
    }
  }
}

module.exports = TransactionSchema;