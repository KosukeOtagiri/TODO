<template>
  <section class="container">
      <h1>TODO追加</h1>
      <div>
        <h2>タイトル</h2>
        <input class="form" v-model="todo.title" id="titleLabel"/>
      </div>
      <div>
        <h2>状況</h2>
        <input id="new" class="radioButton" type="radio" checked name="radioState" v-model="todo.state"  value="未着手" />
        <label for="new">新規</label>
        <input id="progress" class="radioButton" type="radio" name="radioState" v-model="todo.state" value="進行中" />
        <label for="progress">進行中</label>
        <input id="finish" class="radioButton" type="radio" name="radioState" v-model="todo.state" value="完了" />
        <label for="finish">完了</label>
      </div>
      <div>
        <button @click="addTodo">確定</button>
        <button @click="$router.push('/todoList')">戻る</button>
      </div>
    </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useTodoStore } from "../src/stores/todo/todo";

const todo = reactive({ title: "", state: "未着手"});
const store = useTodoStore();
const router = useRouter()

//追加処理
const addTodo = () => {
  if (todo.title !== "") {
    store.addTodo(todo.title, todo.state);
    todo.title = "";
    todo.state = "未着手";

    router.back()
  }
};
</script>