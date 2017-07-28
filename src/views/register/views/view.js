// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Col, Row, Layout, Steps, message } from 'antd';

// App modules
import RegistrationForm from '../components/registerForm';
import ServiceForm from '../components/serviceForm';
import TrainerForm from '../components/trainerForm';
import { getStorageItem, removeStorageItem } from '../../../shared/services/localStorage';
import { userIdQuery } from '../../../shared/queries/user';


const { Header, Content } = Layout;
const Step = Steps.Step;

class RegisterView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 0,
      personalInfoForm: undefined,
      serviceForm: undefined,
      trainerForm: undefined,
    };
  }

  getSteps = () => (
    [
      {
        title: 'Business info',
        content: (
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <RegistrationForm onSubmit={this.savePersonalInfoForm} formState={this.state.personalInfoForm} />
            </Col>
          </Row>
        ),
      },
      {
        title: 'Lessons',
        content: (
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <ServiceForm onSubmit={this.saveServiceForm} formState={this.state.serviceForm} onPreviousClick={this.prev} />
            </Col>
          </Row>
        ),
      },
      {
        title: 'Trainers',
        content: (
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <TrainerForm onSubmit={this.saveTrainerForm} onPreviousClick={this.prev} />
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

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  savePersonalInfoForm = (values) => {
    this.setState({ personalInfoForm: values });
    this.next();
  };

  saveServiceForm = (values) => {
    this.setState({ serviceForm: values });
    this.next();
  };

  saveTrainerForm = (values) => {
    this.createUser(values);
  };

  createUser = ({ firstName, lastName, phoneNumber, email, startsAt, endsAt, workingDays }) => {
    const { createUserMutation, history } = this.props;
    const { personalInfoForm, serviceForm } = this.state;

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
            <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>REGISTER</h4>
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
