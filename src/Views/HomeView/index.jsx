import React from 'react';
import { Card } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

const HomeView = () => {
  return (
    <div className={styles.Root}>
      <Card>
        <NavLink to="/review">Reviews</NavLink>
      </Card>
    </div>
  );
};

HomeView.propTypes = {};

export default HomeView;
