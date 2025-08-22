export function postSubmission(req, res, next) {
    return sendSubmission()
    .then((attempt) => {
        res.status(201)
        .send({attempt})
    })
    .catch(err => {
        next(err)
    })
}