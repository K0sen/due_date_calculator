const fastify = require('fastify')();
const RequestValidator = require('./requestValidator');
const AdaptedDate = require('./adaptedDate');
const DueDateCalculator = require('./dueDateCalculator');
const prepareRequest = require('./helpers/prepareRequest');
const formatDate = require('./helpers/formatDate');

const HOST = '0.0.0.0';
const PORT = 3000;

fastify.get('/api/calculate', async (request, reply) => {
  const requestQueries = prepareRequest(request.query);
  const requestValidator = new RequestValidator(requestQueries);
  requestValidator.validate();
  const preparedReply = reply.header('Content-Type', 'application/json; charset=utf-8');
  if (!requestValidator.isValid()) {
    return preparedReply.code(400).send({ message: 'Error. Wrong request body.', errors: requestValidator.getErrors() });
  }

  const { date, turnaround } = requestQueries;
  const dueDateCalculator = new DueDateCalculator(new AdaptedDate(date), turnaround);
  if (!dueDateCalculator.isValidSubmitDate()) {
    return preparedReply.code(400).send({ message: 'Error. Wrong submit date.' });
  }

  const dueDate = dueDateCalculator.calculateDueDate();
  return preparedReply.send({ message: `The due day is: ${formatDate(dueDate)}` });
});

fastify.listen(PORT, HOST, () => console.log(`Server is listening on port: ${PORT}`));
