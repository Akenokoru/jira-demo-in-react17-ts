import React from 'react';
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import * as qs from 'qs'
import { cleanObject } from '../../utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  // get projects api
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param])

  // get users api
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [param])

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List list={list} users={users}/>
  </div>
}
