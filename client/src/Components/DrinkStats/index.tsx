import React, { useMemo } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Paper, useTheme } from '@material-ui/core';
import { get } from 'lodash';
import styles from './styles.module.scss';
import { useTypedSelector } from '../../Redux/store';

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

type LabelProps = {
  id: string;
  anchor: string;
};
const CustomLabel: any = ({ id, anchor }: LabelProps) => {
  const theme = useTheme();
  return (
    <text
      dominantBaseline="central"
      textAnchor={anchor}
      style={{
        fontSize: '12px',
        fontWeight: 'bold',
        fill: `${theme.palette.text.secondary || 'gray'}`,
      }}
    >
      {id}
    </text>
  );
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
  const useDark = useTypedSelector((state) => state.theme.useDark);
  const data = useMemo(() => {
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
      quality: get(qualityLabelMap, quality, quality),
      [drink.name]: drink.qualities[quality],
    }));
  }, [JSON.stringify(drink?.qualities)]);

  if (!drink) return null;
  return (
    <Paper className={styles.Root} elevation={2}>
      <div
        className={styles.ChartContainer}
        style={{
          ...(useDark && { color: 'rgba(0,0,0,0.87)' }),
        }}
      >
        <ResponsiveRadar
          data={data}
          legends={[]}
          colors={{ scheme: 'set2' }}
          margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
          keys={[drink.name]}
          indexBy="quality"
          maxValue={10}
          curve="catmullRomClosed"
          gridLabel={CustomLabel}
          tooltipFormat={(val) => {
            return `${val.toFixed(1)}`;
          }}
        />
      </div>
    </Paper>
  );
};

export default DrinkStats;
