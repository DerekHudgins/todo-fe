import request from 'superagent';

const URL = 'https://agile-dusk-47801.herokuapp.com';

export async function signup(email, password) {
    const data = await request
    .post(`${URL}/auth/signup`)
    .send({
        email: email,
        password: password,
    })

    return data.body.token;
}

export async function login(email, password) {
    const data = await request
    .post(`${URL}/auth/signup`)
    .send({
        email: email,
        password: password,
    })

    return data.body.token;
}

export async function getTodos(token) {
    const data = await request
        .get(`${URL}/api/todo`)
        .set('Authorization', token)
    
        return data.body;
}

export async function addTodo(name, token) {
    const data = await request
        .post(`${URL}/api/todo`)
        .send({
            todo: name,
            completed: false
            

            
        })
        .set('Authorization', token)
    return data.body;
}

export async function completeTodo(id, token) {
    const data = await request
        .put(`${URL}/api/todo/${id}`)
        .set ('Authorization', token)
    
    return data.body;
}