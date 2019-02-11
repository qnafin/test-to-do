class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '', date: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
   //TODO
   //разбить написание по шагам
   //1) Задачник с формой
   //2) Подключить task.json
   //3) Добавиь в форму поле для установки даты
   //4) Вывести список с task.json
   //5) Изменить вывод списка на таблицу с датами
    render() {
      return (
        <div>
          <h3>Задачник</h3>
          <TodoList items={this.state.items} />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo">
              Что необходимо сделать?
            </label>
            <br/>
            <div class="row">
                <input
                  id="new-todo"
                  class="form-control col-9"
                  name="text"
                  onChange={this.handleChange}
                  value={this.state.text}
                />
                 <button class="btn btn-primary col-3">
                  Добавить 
                </button>
            </div>
            <br/>
          </form>
        </div>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (!this.state.text.length) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }
  }
  
  class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: []};
    }
    async fetchData () {
        return await fetch('tasks.json')
                    .then(function(response) {
                        return response.json();
                    }).then(function(tasks) {
                        return tasks;
                    })          
    }
    async componentDidMount() {
        let tasks = await this.fetchData()
        let result = []
        Object.keys(tasks).map(function(objectKey, index) {
            var value = tasks[objectKey];
            result.push(value)
        });
        
        this.setState({items: result})
        
    }
    render() {
      let tasks = [...this.state.items, ...this.props.items]
      return (
        <ul>
          {tasks.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      );
    }
  }
  const domContainer = document.querySelector('#todo_list');
  ReactDOM.render(<TodoApp/>, domContainer);