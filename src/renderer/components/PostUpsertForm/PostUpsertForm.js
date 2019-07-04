import React from 'react';
import PT from 'prop-types';
import {Modal, ModalBody, ModalHeader, Input, FormText, FormFeedback, FormGroup, Label, Button} from "reactstrap";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(150, 'Too Long!').required('Required'),
  body: Yup.string().min(2, 'Too Short!').required('Required'),
  userId: Yup.number().required('Required'),
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

const PostUpsertForm = ({ mode, post, handleSuccess, handleClose }) => {
  const title = mode === 'create' ? 'Create post' : 'Edit post';
  const initialValues = mode === 'create' ? { id: null, title: '', body: '', userId: '' } : post;

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
                <Label for="title">Title</Label>
                <Field name="title" type={'text'} component={BootstrapInput}/>
              </FormGroup>
              <FormGroup>
                <Label for="body">Body</Label>
                <Field name="body" type={'textarea'} component={BootstrapInput}/>
              </FormGroup>
              <FormGroup>
                <Label for="userId">UserId</Label>
                <Field name="userId" type={'number'} component={BootstrapInput}/>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  )
};

PostUpsertForm.propTypes = {
  mode: PT.string,
  post: PT.object,

  handleSuccess: PT.func,
  handleClose: PT.func,
};

export default PostUpsertForm;