import React, { useMemo } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Paper } from '@material-ui/core';
import { capitalize, get } from 'lodash';
import styles from './styles.module.scss';

const qualityLabelMap = {
  flavorAccuracy: 'Flavor Accuracy',
  flavorIntensity: 'Flavor Intensity',
  bubbles: 'Bubbles',
  body: 'Body',
  smell: 'Smell',
  sweetness: 'Sweetness',
  sour: 'Sour',
  bitter: 'Bitterness',
};

interface Props {
  drink: {
    name: string;
    qualities: {
      [key: string]: number;
    };
  };
}

const DrinkStats: React.FC<Props> = ({ drink }: Props) => {
  const data = useMemo(() => {
    console.log('crunching numbers');
    return [
      'flavorAccuracy',
      'flavorIntensity',
      'bubbles',
      'body',
      'smell',
      'sweetness',
      'sour',
      'bitter',
    ].map((quality) => ({
      quality: capitalize(get(qualityLabelMap, quality, quality)),
      [drink.name]: drink.qualities[quality],
    }));
  }, [JSON.stringify(drink?.qualities)]);

  if (!drink) return null;
  return (
    <Paper className={styles.Root} elevation={2}>
      <div className={styles.ChartContainer}>
        <ResponsiveRadar
          data={data}
          legends={[]}
          margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
          keys={[drink.name]}
          indexBy="quality"
          maxValue={10}
          curve="catmullRomClosed"
          tooltipFormat={(val) => {
            return `${val.toFixed(1)}`;
          }}
        />
      </div>
    </Paper>
  );
};

export default DrinkStats;
