type ConstructorType<T> = new (...args: any[]) => T;
type Err = { message: string };
const customMatchers: jasmine.CustomAsyncMatcherFactories = {
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
    // toThrowErrorOfType: <T>() => {
    //     return async function (
    //         actual: Promise<unknown>,
    //         expected: ConstructorType<T>
    //     ) {
    //         try {
    //             await actual;
    //         } catch (e) {
    //             return {
    //                 pass: e instanceof expected,
    //                 message: `${typeof e} is not instance of ${expected}`,
    //             };
    //         }
    //     };
    // },
};

export default customMatchers;
