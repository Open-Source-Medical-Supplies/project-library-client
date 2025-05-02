import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  /**
   * Diameter of the spinner in pixels (default: 40)
   */
  size?: number;
  /**
   * Color of the spinner (default: '#3498db')
   */
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, color = '#3498db' }) => {
  const customStyle: React.CSSProperties = {
    width: size,
    height: size,
    color,
  };

  return <div className={styles.spinner} style={customStyle} />;
};

export default Spinner;