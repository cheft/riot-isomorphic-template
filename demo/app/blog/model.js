module.exports = {
    identity: 'blog',
    connection: 'myLocalDisk',
    attributes: {
        title: 'string',
        content: {
        	type: 'string',
        	size: 2000
        },
        timeDiff: 'string',
        image: 'string'
    }
}
