const registerSchema = require('../schemas/registerSchema');
const loginSchema = require('../schemas/loginSchema');
const courseSchema = require('../schemas/courseSchema');

describe('Joi Validation Schemas', () => {
  describe('Register Schema', () => {
    it('should validate a valid user registration', () => {
      const validUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        role: 'student',
        terms: true
      };
      const { error } = registerSchema.validate(validUser);
      expect(error).toBeUndefined();
    });

    it('should fail with invalid email', () => {
      const invalidUser = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'Password123!',
        role: 'student'
      };
      const { error } = registerSchema.validate(invalidUser);
      expect(error).toBeDefined();
    });
  });

  describe('Login Schema', () => {
    it('should validate a valid login', () => {
      const validLogin = {
        email: 'test@example.com',
        password: 'Password123!'
      };
      const { error } = loginSchema.validate(validLogin);
      expect(error).toBeUndefined();
    });

    it('should fail if password is missing', () => {
      const invalidLogin = {
        email: 'test@example.com'
      };
      const { error } = loginSchema.validate(invalidLogin);
      expect(error).toBeDefined();
    });
  });

  describe('Course Schema', () => {
    it('should validate a valid course', () => {
      const validCourse = {
        title: 'React Fundamentals',
        description: 'Learn React from scratch.',
        price: 50,
        image: 'http://example.com/image.jpg'
      };
      // Note: Adjust input specific to your schema definition
      const { error } = courseSchema.validate(validCourse);
      expect(error).toBeUndefined();
    });
  });
});
