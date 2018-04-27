import fetch from 'node-fetch';

const jsonApi = 'http://localhost:3001';

const resolveFunctions = {
    Query: {
        items(root) {
            return fetch(`${jsonApi}/items`)
                .then(response => response.json())
                .catch(err => console.log(err));
        },
        users(root) {
            return fetch(`${jsonApi}/users`)
                .then(response => response.json())
                .catch(err => console.log(err));
        },
        item(root, { id }) {
            return fetch(`${jsonApi}/items/${id}`)
                .then(response => response.json())
                .catch(err => console.log(err));
        },
        user(root, { id }) {
            return fetch(`${jsonApi}/users/${id}`)
                .then(response => response.json())
                .catch(err => console.log(err));
        }
    },
    Item: {
        async borrower({ borrower }) {
            const user = await fetch(`${jsonApi}/users/${borrower}`);
            const json = await user.json();
            if (!json.id) return null;
            return json;
        },
        itemowner({ itemowner }) {
            return fetch(`${jsonApi}/users/${itemowner}`)
                .then(response => response.json())
                .catch(err => console.log(err));
        }
    },
    User: {
        borroweditems({ id }) {
            return fetch(`${jsonApi}/items/?borrower=${id}`)
                .then(response => response.json())
                .catch(err => console.log(err));
        },
        owneditems({ id }) {
            return fetch(`${jsonApi}/items/?itemowner=${id}`)
                .then(response => response.json())
                .catch(err => console.log(err));
        }
    }
};

export default resolveFunctions;