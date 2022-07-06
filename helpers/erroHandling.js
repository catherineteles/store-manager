const runSchema = (schema) => async (data) => {
  const { error, value } = await schema.validate(data);
  if (error) {
    if (error.details[0].message.includes('required')) {
      error.code = 400;
      throw error;
    }
    if (error.details[0].message.includes('must')) {
      error.code = 422;
      throw error;
    }
  }
  return value;
};

module.exports = { runSchema };