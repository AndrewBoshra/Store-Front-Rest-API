import { AuthenticationError, RequiredFieldError } from "../../errors/error";
import { User } from "../../models";
import { AuthenticationService, PasswordHashingService } from "../../services";
import customMatchers from "../helpers/matcher";

describe("authServices tests", () => {
    beforeEach(() => {
        jasmine.addAsyncMatchers(customMatchers);
    });
    describe("PasswordHashingService", () => {
        const passwordHash = new PasswordHashingService();

        describe("hash function", () => {
            it("should hash passwords", async () => {
                const pwd = "password";
                const pwdHash = await passwordHash.hash(pwd);
                expect(pwdHash.length).toBeGreaterThan(pwd.length);
                expect(pwdHash).not.toEqual(pwd);
                expect(pwdHash.trim()).not.toEqual(pwd);
            });
        });
        describe("verify password", () => {
            it("should return true in case of match", async () => {
                const pwd = "password";
                const pwdHash = await passwordHash.hash(pwd);
                const isValid = await passwordHash.verify(pwdHash, pwd);
                expect(isValid).toBeTrue();
            });
            it("should return false in case of mismatch", async () => {
                const pwd = "password";
                const pwdHash = await passwordHash.hash(pwd);
                const isValid = await passwordHash.verify(
                    pwdHash,
                    "another password"
                );
                expect(isValid).toBeFalse();
            });
        });
    });
    describe("AuthenticationService", () => {
        const userRepoSpy = jasmine.createSpyObj("UsersRepository", [
            "add",
            "get",
            "getUserByEmail",
        ]);
        const passwordHashingSpy = jasmine.createSpyObj(
            "PasswordHashingService",
            ["hash", "verify"]
        );

        const authService = new AuthenticationService(
            userRepoSpy,
            passwordHashingSpy
        );
        describe("login test", () => {
            it("should throw an error in case of missing email", async () => {
                await expectAsync(
                    authService.login({ password: "andrew@gmail.com" })
                ).toThrowErrorOfType(RequiredFieldError, /email/);
            });
            it("should throw an error in case of missing password", async () => {
                await expectAsync(
                    authService.login({ email: "andrew@gmail.com" })
                ).toThrowErrorOfType(RequiredFieldError, /password/);
            });

            it("should throw user doesn't exist", async () => {
                userRepoSpy.getUserByEmail.and.returnValue(undefined);
                await expectAsync(
                    authService.login({
                        email: "test@gmail.com",
                        password: "gmail!@4",
                    })
                ).toThrowErrorOfType(AuthenticationError);
            });

            it("should throw when password is incorrect", async () => {
                userRepoSpy.getUserByEmail.and.returnValue(
                    new User({
                        first_name: "test",
                        last_name: "test",
                        email: "test@gmil.com",
                    })
                );
                passwordHashingSpy.verify.and.returnValue(
                    Promise.resolve(false)
                );

                await expectAsync(
                    authService.login({
                        email: "test@gmail.com",
                        password: "gmail!@4",
                    })
                ).toBeRejected();
            });

            it("should not throw when password is correct and all data was given", async () => {
                userRepoSpy.getUserByEmail.and.returnValue(
                    new User({
                        first_name: "test",
                        last_name: "test",
                        email: "test@gmil.com",
                    })
                );
                passwordHashingSpy.verify.and.returnValue(true);

                await expectAsync(
                    authService.login({
                        email: "test@gmail.com",
                        password: "gmail!@4",
                    })
                ).toBeResolved();
            });

            it("should return the user", async () => {
                const user = new User({
                    id: 5,
                    first_name: "test",
                    last_name: "test",
                    email: "test@gmail.com",
                });
                userRepoSpy.getUserByEmail.and.returnValue(user);
                passwordHashingSpy.verify.and.returnValue(true);

                await expectAsync(
                    authService.login({
                        email: "test@gmail.com",
                        password: "gmail!@4",
                    })
                ).toBeResolvedTo(user);
            });
        });
        describe("signup tests", () => {
            it("should throw an error in case of missing data", async () => {
                await expectAsync(
                    authService.signup({
                        email: "test@gmail.com",
                        first_name: "test",
                        password: "password",
                    })
                ).toThrowErrorOfType(RequiredFieldError, /last_name/);

                await expectAsync(
                    authService.signup({
                        email: "test@gmail.com",
                        last_name: "test",
                        password: "password",
                    })
                ).toThrowErrorOfType(RequiredFieldError, /first_name/);

                await expectAsync(
                    authService.signup({
                        last_name: "test",
                        first_name: "test",
                        password: "password",
                    })
                ).toThrowErrorOfType(RequiredFieldError, /email/);
            });

            it("should throw when user exists", async () => {
                const user = new User({
                    id: 5,
                    first_name: "test",
                    last_name: "test",
                    email: "test@gmail.com",
                });
                userRepoSpy.getUserByEmail.and.returnValue(user);
                await expectAsync(
                    authService.signup({ ...user, password: "password" })
                ).toThrowErrorOfType(AuthenticationError, /exists/);
            });

            it("should call the hashing function and assign the passwordHash value", async () => {
                const userData = {
                    first_name: "test",
                    last_name: "test",
                    email: "test@gmail.com",
                };
                userRepoSpy.getUserByEmail.and.returnValue(undefined);
                const pwdHash = "hashed password";
                passwordHashingSpy.hash.and.returnValue(pwdHash);
                userRepoSpy.add.and.callFake((u: User) => u);
                await expectAsync(
                    authService.signup({ ...userData, password: "password" })
                ).toBeResolved();

                const user = await authService.signup({
                    ...userData,
                    password: "password",
                });
                expect(user.password_hash).toEqual(pwdHash);
            });
        });
    });
});
