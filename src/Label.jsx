import React from 'react';
import styles from './Label.css';

let Label = React.createClass({
  render: function () {
    return <div className="{styles.div}">
      Wallaby.js{' ' + (this.props ? this.props.children : 'unexpected')}
    </div>;
  }
});

export default Label;
