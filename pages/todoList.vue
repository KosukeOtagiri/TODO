<template>
    <section class="container">
        <h1>TODO管理</h1>
        <input id="all" class="radioButton" type="radio" v-model="filter" value="all" />
        <label for="all">すべて</label>
        <input id="new" class="radioButton" type="radio" v-model="filter" value="new" />
        <label for="new">未着手</label>
        <input id="progress" class="radioButton" type="radio" v-model="filter" value="progress" />
        <label for="progress">進行中</label>
        <input id="finish" class="radioButton" type="radio" v-model="filter" value="finish" />
        <label for="finish">完了</label>

        <table class="List">
            <thead>
                <tr>
                    <th class="tittle">タイトル</th>
                    <th class="time">登録日時</th>
                    <th class="state">状態</th>
                    <th class="btnDelete"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in filterTodo">
                    <td>{{ todo.title }}</td>
                    <td>{{ todo.time }}</td>
                    <td><button class="button" v-bind:class="{'buttonNew':todo.state == '未着手',
                                                              'buttonProgress':todo.state == '進行中',
                                                              'buttonFinish':todo.state == '完了'}"
                                                              @click="changeTodo(todo.title, todo.time, todo.state)">{{ todo.state }}</button></td>
                    <td><button class="button buttonDelete" @click="deleteTodo(todo.title, todo.time)">削除</button></td>
                  </tr>
            </tbody>
        </table>
        <button @click="$router.push('/todoMeisai')">追加</button>
    </section>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useTodoStore } from "../src/stores/todo/todo";
  
  const store = useTodoStore();
  const { filterTodo, filter } = storeToRefs(store);

  //変更処理
  const changeTodo = (title: string, time: string, state: string) => {
    store.changeTodo(title, time, state);
  };

  //削除処理
  const deleteTodo = (title: string, time: string) => {
    store.deleteTodo(title, time);
  };
  </script>
