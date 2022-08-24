type ConstructorType<T> = new (...args: any[]) => T;
type Err = { message: string };
const customAsyncMatchers: jasmine.CustomAsyncMatcherFactories = {
    toThrowErrorOfType: (utils) => {
        return {
            compare: async <T extends Err>(
                actual: PromiseLike<unknown>,
                expected: ConstructorType<T>,
                message?: RegExp
            ) => {
                try {
                    await actual;
                } catch (e) {
                    if (!(e instanceof expected)) {
                        return {
                            pass: false,
                            message: `${typeof e} is not instance of ${expected}`,
                        };
                    }
                    if (message) {
                        return {
                            pass: message.test(e.message),
                            message: utils.pp(
                                `expected message '${message.source}' but got message '${e.message}'`
                            ),
                        };
                    }
                }

                return {
                    pass: true,
                    message: `expected to be rejected with error but was resolved`,
                };
            },
        };
    },
};
export const customMatchers: jasmine.CustomMatcherFactories = {
    toThrowErrorOfType: (utils) => {
        return {
            compare: <T extends Err>(
                actual: () => any,
                expected: ConstructorType<T>,
                message?: RegExp
            ) => {
                try {
                    actual();
                } catch (e) {
                    if (!(e instanceof expected)) {
                        return {
                            pass: false,
                            message: `${typeof e} is not instance of ${expected}`,
                        };
                    }
                    if (message) {
                        return {
                            pass: message.test(e.message),
                            message: utils.pp(
                                `expected message '${message.source}' but got message '${e.message}'`
                            ),
                        };
                    }
                }

                return {
                    pass: true,
                    message: `expected to be rejected with error but was resolved`,
                };
            },
        };
    },
};

export default customAsyncMatchers;
