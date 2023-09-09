### Stubs

A replacement for an existing function or method, used in testing.
Used for evaluating the performance of a program with some functions.
Does replace the original function with a dummy function that does nothing but return a value that you can specify.

### Spies

A spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls. A spy only exists in the describe or it block in which it is defined, and will be removed after each spec. There are special matchers for interacting with spies.

### Mocks

Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations. A mock will fail your spec if it is not used as expected.
