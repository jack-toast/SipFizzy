import React, { useEffect, useMemo } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import MyPropTypes from '../../MyPropTypes';
import styles from './styles.module.scss';

const DrinkStats = ({ drink }) => {
  const data = useMemo(() => {
    const foo = [
      'flavorAccuracy',
      'flavorIntensity',
      'bubbles',
      'body',
      'smell',
      'sweetness',
      'sour',
      'bitter',
    ].map((quality) => ({
      quality,
      [drink.id]: drink.qualities[quality],
    }));
    return [...foo];
  }, []);
  useEffect(() => {
    console.log('data', data);
    return () => {};
  }, [data]);
  if (!drink) return null;
  return (
    <div className={styles.Root}>
      <ResponsiveRadar
        data={data}
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        keys={[drink.id]}
        indexBy="quality"
        curve="catmullRomClosed"
        // i like dick my name is jack
      />
    </div>
  );
};

DrinkStats.propTypes = {
  drink: MyPropTypes.drink.isRequired,
};

export default DrinkStats;
