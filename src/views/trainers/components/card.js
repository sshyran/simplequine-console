import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Popconfirm } from 'antd';

const TrainerCard = props => (
  <Card
    title={props.title}
    bordered={false}
    extra={
      <div>
        <Popconfirm
          onConfirm={() => props.actionHandler}
          title="Are you sure?"
          okText="Yes"
          cancelText="No"
        >
          <span style={{ marginRight: '15px', color: '#f04134', cursor: 'pointer' }}>Delete</span>
        </Popconfirm>
        <Link to={props.linkAddress}>
          Edit
        </Link>
      </div>
    }
  >
    {props.children}
  </Card>
);

TrainerCard.propTypes = {
  actionHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  linkAddress: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default TrainerCard;
