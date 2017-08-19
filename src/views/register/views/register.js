/* 3rd party modules */
import { Col, Row, Layout, Steps, message } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/* App modules */
import AccountForm from '../../../shared/components/accountForm';
import ServiceForm from '../components/serviceForm';
import TrainerForm from '../components/trainerForm';
import { getStorageItem, removeStorageItem } from '../../../shared/services/localStorage';
import { userIdQuery } from '../../../shared/queries/user';
import HeaderText from '../../../shared/components/headerText';
import { getFormData, saveFormData, removeFormData } from '../services/storage';


const { Header, Content } = Layout;
const Step = Steps.Step;

class RegisterView extends Component {
  static formKeys = {
    personalInfo: 'registrationPersonalInfo',
    service: 'registrationService',
    trainer: 'registrationTrainer',
  }

  constructor (props) {
    super(props);
    this.state = {
      current: 0,
      refetchCounter: 0,
    };

    removeFormData(Object.values(RegisterView.formKeys));
  }

  // For unknown reason active user query is fired before saving auth0IdToken so it returns null.
  // That way even though user is logged in just after few seconds it does not redirect to app section.
  // Using few refetches to prevent that.
  componentWillReceiveProps () {
    const { user, refetch } = this.props.data;
    if (!user && this.state.refetchCounter < 5) {
      this.setState(state => (
        {
          refetchCounter: state.refetchCounter += 1,
        }
      ));
      refetch();
    }
  }

  componentWillUnmount () {
    removeFormData(Object.values(RegisterView.formKeys));
  }

  getSteps = () => (
    [
      {
        title: 'Business info',
        content: (
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <AccountForm
                onSubmit={this.savePersonalInfoForm}
                formState={getFormData(RegisterView.formKeys.personalInfo)}
                buttonText="Next"
              />
            </Col>
          </Row>
        ),
      },
      {
        title: 'Lessons',
        content: (
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <ServiceForm
                onSubmit={this.saveServiceForm}
                formState={getFormData(RegisterView.formKeys.service)}
                onPreviousClick={values => this.prev(RegisterView.formKeys.service, values)}
              />
            </Col>
          </Row>
        ),
      },
      {
        title: 'Trainers',
        content: (
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <TrainerForm
                onSubmit={this.saveTrainerForm}
                formState={getFormData(RegisterView.formKeys.trainer)}
                onPreviousClick={values => this.prev(RegisterView.formKeys.trainer, values)}
              />
            </Col>
          </Row>
        ),
      },
    ]
  );

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = (formKey, values) => {
    const current = this.state.current - 1;
    this.setState({ current });
    saveFormData(formKey, values);
  };

  savePersonalInfoForm = (values) => {
    saveFormData(RegisterView.formKeys.personalInfo, values);
    this.next();
  };

  saveServiceForm = (values) => {
    saveFormData(RegisterView.formKeys.service, values);
    this.next();
  };

  saveTrainerForm = (values) => {
    saveFormData(RegisterView.formKeys.trainer, values);
    this.createUser(values);
  };

  createUser = ({ firstName, lastName, phoneNumber, email, startsAt, endsAt, workingDays }) => {
    const { createUserMutation, history } = this.props;
    const personalInfoForm = getFormData(RegisterView.formKeys.personalInfo);
    const serviceForm = getFormData(RegisterView.formKeys.service);

    const scheduleVariables = {
      startsAt: (startsAt.hour() * 60) + startsAt.minute(),
      endsAt: (endsAt.hour() * 60) + endsAt.minute(),
      workingDays,
    };

    const trainerVariables = {
      firstName,
      lastName,
      phoneNumber,
      email,
      schedules: [scheduleVariables],
    };

    const variables = {
      idToken: getStorageItem('auth0IdToken'),
      email: personalInfoForm.email,
      name: personalInfoForm.name,
      daysInAdvance: personalInfoForm.daysInAdvance,
      timeZoneName: personalInfoForm.timeZoneName,
      services: [serviceForm],
      trainers: [trainerVariables],
    };

    createUserMutation({ variables }, {
      options: {
        refetchQueries: [
          {
            query: userIdQuery,
          },
        ],
      },
    })
      .then((response) => {
        console.log(response); // eslint-disable-line no-console
        removeStorageItem('auth0Email');
        history.push('/register/success');
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
        message.error('Registraion process failed!', 5);
      });
  };

  render () {
    const { loading, error, user } = this.props.data;
    const { current } = this.state;
    const steps = this.getSteps();

    if (loading) {
      return (
        <span>Loading!</span>
      );
    }

    if (error) {
      return (
        <span>Error!</span>
      );
    }

    if (user) {
      return (
        <Redirect to={'/app/schedule'} />
      );
    }

    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
        <div>
          <Header>
            <HeaderText>REGISTER</HeaderText>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Steps current={current} style={{ marginBottom: '24px' }}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className="steps-content">
              {steps[this.state.current].content}
            </div>
          </Content>
        </div>
      </Layout>
    );
  }
}

RegisterView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
  }).isRequired,
  createUserMutation: PropTypes.func.isRequired,
};

export default RegisterView;
