//@flow
import React from 'react';
import {List, ListItem} from 'material-ui/List';

class FirstStep extends React.Component {
  render()  {
    return (
      <div>
        <p>Choose country:</p>
        <List>
          <ListItem primaryText="Amerika" />
          <ListItem primaryText="Brazil" />
          <ListItem primaryText="Norge" />
          <ListItem primaryText="India" />
          <ListItem primaryText="Somewhere" />
        </List>
      </div>
    );
  }
}

module.exports = FirstStep;
