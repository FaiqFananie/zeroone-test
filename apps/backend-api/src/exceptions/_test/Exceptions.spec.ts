import ClientError from '../ClientError'
import InvariantError from '../InvariantError'
import NotFoundError from '../NotFoundError'

describe('Error Handler', () => {
  describe('when get ClientError', () => {
    it('should respond with statusCode = 400', async () => {
      // Action
      const clientError = new ClientError('Error from client')

      // Assert
      expect(clientError.name).toEqual('ClientError');
      expect(clientError.statusCode).toEqual(400);
      expect(clientError.message).toEqual('Error from client');
    })
  })

  describe('when get Invariant Error', () => {
    it('should respond with statusCode = 400', async () => {
      // Action
      const invariantError = new InvariantError('Invariant Error')

      // Assert
      expect(invariantError.name).toEqual('InvariantError');
      expect(invariantError.statusCode).toEqual(400);
      expect(invariantError.message).toEqual('Invariant Error');
    })
  })

  describe('when get Not Found Error', () => {
    it('should respond with statusCode = 404', async () => {
      // Action
      const notFoundError = new NotFoundError('Not Found Error')

      // Assert
      expect(notFoundError.name).toEqual('NotFoundError');
      expect(notFoundError.statusCode).toEqual(404);
      expect(notFoundError.message).toEqual('Not Found Error');
    })
  })
})