import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '../modal/modal'
import * as actions from '../../store/actions';


const AddTodoSchema = Yup.object().shape({
    todo: Yup.string()
        .required('The content is required')
        .min(4, 'Too short...')
})

const AddTodo = ({loading, error, addTodo}) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div>
            <button onClick={() => setIsOpened(true)}>Add todo</button>
            <Modal opened={isOpened} close={() => setIsOpened(false)}>
                <h1>Add your new ToDo</h1>
                <h3>Type your ToDo and press ADD</h3>
                <div>
                    <Formik 
                        initialValues={{
                            todo: ''
                        }} 
                        validationSchema={AddTodoSchema} 
                        
                        onSubmit= {async (values, {setSubmitting, resetForm}) =>{
                            const res = await addTodo(values) 
                            if(res) {
                                setIsOpened(false);
                            }
                            setSubmitting(false)
                            resetForm();
                        }}>
                        {({isSubmitting, isValid}) => (
                            <Form>
                                <div style={{display: 'flex', flexDirection: 'column', height: '40px', color: 'red'}}>
                                    <Field type='text' name='todo' placeholder='Type your todo'/>
                                    <ErrorMessage  name='todo'/>
                                </div>
                                <div style={{display: 'flex', width: '100%', justifyContent: 'space-evenly'}}>
                                    <button disabled={!isValid || isSubmitting} type='submit'>{loading ? 'Adding...' :'ADD'}</button>
                                    <button type='button' onClick={() => setIsOpened(false)}>Cancel</button>
                                </div>
                                {error && <p style={{ backgroundColor: 'red', color: 'white'}}>{error}</p>}
                            </Form>
                        )}
                    </Formik>
                </div>
                {/* {errorDeleteUser && <p style={{color: 'red', fontWeight: '800'}}>{errorDeleteUser}</p>} */}
            </Modal>
        </div>
    )
};

const mapStateToProps = ({ todos }) => ({
    loading: todos.loading, 
    error: todos.error
})

const mapDispatchToProps = {
    addTodo: actions.addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);