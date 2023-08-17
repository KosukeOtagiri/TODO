import { defineStore } from "pinia";

type FilterType = "all" | "new" | "progress" | "finish";
type TODO = {
  id: number;
  title: string;
  time: string;
  state: string;
};

export const useTodoStore = defineStore("todo", {
  state: () => {
    return {
      filter: "all" as FilterType,
      todos: [] as TODO[],
      nextId: 0,
    };
  },

  getters: {
    findTodo(state) {
      return (id: number): TODO => {
        const todo = state.todos.find((todo) => todo.id === id);
        if (todo === undefined) throw new Error("todo not found");

        return todo;
      };
    },
    filterTodo(state): TODO[] {
      switch (state.filter) {
        case "new":
          return state.todos.filter((todo) => todo.state === "未着手");
        case "progress":
          return state.todos.filter((todo) => todo.state === "進行中");
        case "finish":
          return state.todos.filter((todo) => todo.state === "完了");
        default:
          return this.todos;
      }
    },
  },

  actions: {
    //追加処理
    addTodo (title: string, state: string) {
      var d = new Date();
      var time = d.getFullYear()
            + '-' + ('00' + (d.getMonth() + 1)).slice(-2)
            + '-' + ('00' + d.getDate()).slice(-2)
            + ' ' + ('00' + d.getHours()).slice(-2)
            + ':' + ('00' + d.getMinutes()).slice(-2);
      this.todos.push({ id: this.nextId++, title, time, state });
    },

    //変更処理
    changeTodo (title: string, time: string, state: string){
      for (let i = 0; i < this.todos.length; i++)
      {
        const todo = this.todos[i];
        if (todo.title == title && todo.time == time)
        {
          switch (state)
          {
            case "未着手":
              todo.state = "進行中";
              return;
            case "進行中":
              todo.state = "完了";
              return;
            case "完了":
              todo.state = "未着手";
              return;
          }
        }
      }
    },

    //削除処理
    deleteTodo (title: string, time: string){
      for (let i = 0; i < this.todos.length; i++)
      {
        const todo = this.todos[i];
        if (todo.title == title && todo.time == time)
        {
          if (confirm('"' + title + '"を削除しますか？')){
            this.todos.splice(i, 1);
            return;
          }
        }
      }
    }
  },
});