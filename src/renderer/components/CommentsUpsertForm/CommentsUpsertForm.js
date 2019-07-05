import React from 'react';
import PT from 'prop-types';
import { Modal, ModalBody, ModalHeader, Input, FormFeedback, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(150, 'Too Long!').required('Required'),
  email: Yup.string().email().required('Required'),
  body: Yup.string().min(2, 'Too Short!').required('Required'),
});

const BootstrapInput = ({field, form: {touched, errors}, ...props}) => (
  <div>
    <Input
      invalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props} />
    {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
  </div>
);

const CommentsUpsertForm = ({ mode, comment, currentPostId, handleSuccess, handleClose }) => {
  const title = mode === 'create' ? 'Create comments' : 'Edit comments';
  const initialValues = mode === 'create' ? {id: null,  name: '', body: '', email: '', postId: currentPostId } : comment;

  return (
    <Modal
      isOpen={true}
      toggle={handleClose}
      unmountOnClose={true}
    >
      <ModalHeader toggle={handleClose}>{title}</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={handleSuccess}
        >
          {() => (
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Field name="name" type={'text'} component={BootstrapInput}/>
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Field name="email" type={'text'} component={BootstrapInput}/>
              </FormGroup>
              <FormGroup>
                <Label for="body">Body</Label>
                <Field name="body" type={'textarea'} component={BootstrapInput}/>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  )
};

CommentsUpsertForm.propTypes = {
  mode: PT.string,
  post: PT.object,

  handleSuccess: PT.func,
  handleClose: PT.func,
};

export default CommentsUpsertForm;