
// Thrown when the query itself cannot be answered: unknown OS, distro or
// arch, invalid version, or an R version that has no build for the
// requested platform. These errors are final, retrying the query will
// not help. Other errors, e.g. from network failures, are not.
//
// Check `error.code == 'ERVERSIONS_NOT_FOUND'` instead of `instanceof`,
// that also works if there are multiple copies of this package.

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.code = 'ERVERSIONS_NOT_FOUND';
    }
}

module.exports = {
    NotFoundError: NotFoundError
};
