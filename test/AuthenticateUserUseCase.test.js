const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthenticateUserUseCase = require('../src/application/useCases/AuthenticateUserUseCase');

describe('AuthenticateUserUseCase', () => {
  let userRepository;
  let authenticateUserUseCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn()
    };
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  });

  it('should authenticate a user with valid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: 1, email, password: hashedPassword };

    userRepository.findByEmail.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-jwt-token');

    const result = await authenticateUserUseCase.execute(email, password);

    expect(result).toEqual({ token: 'fake-jwt-token' });
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  it('should throw an error if email is not found', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    userRepository.findByEmail.mockResolvedValue(null);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-jwt-token');

    await expect(authenticateUserUseCase.execute(email, password)).rejects.toThrow('Invalid email or password');

    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalled();
  });

  it('should throw an error if password is incorrect', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const user = { id: 1, email, password: 'hashedpassword' };

    userRepository.findByEmail.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-jwt-token');

    await expect(authenticateUserUseCase.execute(email, password)).rejects.toThrow('Invalid email or password');

    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    expect(jwt.sign).toHaveBeenCalled();
  });
});