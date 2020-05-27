import * as actions from './actionTypes';

//add a todo
export const addTodo = data => {
    return async (dispatch, getState, { getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        dispatch({ type: actions.ADD_TODO_START})
        try {
            //const currentTodos = await firestore.collection('todos').doc(userId).get();
            
            // if(!currentTodos.exists){
            //     firestore.collection('todos').doc(userId).set({
            //         todos: firestore.FieldValue.arrayUnion(data.todo)
            //         // todos: []
            //     })
            // }

            const newTodo = {
                id: new Date().valueOf(),
                todo: data.todo
            };
            
            await firestore.collection('todos').doc(userId).set({
                // todos: [...currentTodos.data().todos, newTodo]
                todos: firestore.FieldValue.arrayUnion(newTodo)
            },{ merge: true })
            
            dispatch({ type: actions.ADD_TODO_SUCCESS})

            return true;
            
        } catch(err){
            dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message })
        }
    }
}

//delete ToDo
export const deleteTodo = (id) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        dispatch({ type: actions.DELETE_TODO_START})
        try{
            const todosRef = await firestore.collection('todos').doc(userId).get();
            const newTodos = todosRef.data().todos.filter(todo => todo.id !== id)
            await firestore.collection('todos').doc(userId).update({
                todos: newTodos
            })
            dispatch({ type: actions.DELETE_TODO_SUCCESS})
        }catch(err){
            dispatch({ type: actions.DELETE_TODO_FAIL, payload: err.message})
        }
    }
}