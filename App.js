import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import Todos from './Todo';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      text: '',
    };

    this.todos = new Todos();
    this.syncTodos();
  }

  syncTodos = () => {
    this.todos.all(items => {
      this.setState({
        tasks: items,
        text: '',
      });
    });
  };

  updateTaskText = text => {
    this.setState({ text: text });
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      let { tasks, text } = this.state;

      this.todos.save({ text });
      this.syncTodos();
    }
  };

  deleteTask = i => {
    this.todos.delete(i);
    this.setState({
      tasks: this.state.tasks.filter((task, index) => {
        return index !== i;
      }),
    });
  };

  render() {
    return (
      <View style={[styles.container, { paddingBottom: 10 }]}>
        <FlatList
          style={{ width: '100%' }}
          data={this.state.tasks}
          keyExtractor={(item, index) => item.text}
          renderItem={({ item, index }) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    fontSize: 18,
                  }}
                >
                  {item.text}
                </Text>
                <Button title="X" onPress={() => this.deleteTask(index)} />
              </View>
            </View>
          )}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.updateTaskText}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add a new Task"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 20,
  },
  input: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
  },
});
