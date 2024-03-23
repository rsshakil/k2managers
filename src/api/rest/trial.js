// --------------------------------------------------------------------------------
// TODO: This is the trial code file.
// --------------------------------------------------------------------------------

import makeRequest from '../../lib/fetch'

export const csvOperation = async (info) => {
    return await makeRequest(
        '/trial/csv',
        'POST',
        info
    )
}
