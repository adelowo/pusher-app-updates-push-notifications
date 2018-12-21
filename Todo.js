import { AsyncStorage } from 'react-native';

export default class Todos {
  constructor() {
    this.tasks = {
      items: [],
    };

    this.all(() => {});
  }

  all = callback => {
    AsyncStorage.getItem('pushertutorial', (err, allTasks) => {
      if (err !== null) {
        return;
      }

      if (allTasks === null) {
        return;
      }

      this.tasks = JSON.parse(allTasks);
      callback(this.tasks.items);
    });
  };

  save = item => {
    this.tasks.items.push(item);
    return AsyncStorage.setItem('pushertutorial', JSON.stringify(this.tasks));
  };

  delete = index => {
    this.all(items => {
      const tasks = {
        items: items.filter((task, idx) => {
          return idx !== index;
        }),
      };
      AsyncStorage.setItem('pushertutorial', JSON.stringify(tasks));
    });
  };
}
