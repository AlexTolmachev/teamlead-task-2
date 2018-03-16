import React, { Component } from 'react'
import { Table, Button, Divider, Popconfirm } from 'antd'
import { TableCell } from './components'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.columns = [{
      title: 'Имя',
      dataIndex: 'name',
      render: (text, record) => (
        <TableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      ),
    }, {
      title: 'Фамилия',
      dataIndex: 'surname',
      render: (text, record) => (
        <TableCell
          value={text}
          onChange={this.onCellChange(record.key, 'surname')}
        />
      )
    }, {
      title: 'Полное имя',
      dataIndex: 'fullname',
      render: fullname => `${fullname.name} ${fullname.surname}`
    }, {
      title: 'operation',
      dataIndex: 'Операции',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1 ?
          (
            <Popconfirm title='Вы точно хотите удалить?' onConfirm={() => this.onDelete(record.key)}>
              <a href='#'>Удалить</a>
            </Popconfirm>
          ) : null
        )
      },
    }]

    this.state = {
      dataSource: localStorage.dataSource ?
      JSON.parse(localStorage.dataSource) :
      [{
        key: '0',
        name: 'Александр',
        surname: 'Толмачёв',
        get fullname() {
          return {
            name: this.name,
            surname: this.surname
          }
        }
      }, {
        key: '1',
        name: 'Андрей',
        surname: 'Петров',
        get fullname() {
          return {
            name: this.name,
            surname: this.surname
          }
        }
      }],
      count: localStorage.count || 2
    }
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource]
      const target = dataSource.find(item => item.key === key)

      if (target) {
        target[dataIndex] = value

        this.setState({ dataSource })

        localStorage.dataSource = JSON.stringify(dataSource)
        localStorage.count = JSON.stringify(dataSource.length)
      }
    }
  }

  onDelete = (key) => {
    const dataSource = [...this.state.dataSource].filter(item => item.key !== key)

    this.setState({ dataSource: dataSource })

    localStorage.dataSource = JSON.stringify(dataSource)
    localStorage.count = JSON.stringify(dataSource.length)
  }

  handleAdd = () => {
    const { count, dataSource } = this.state

    const newData = {
      key: count + 1,
      name: 'Имя',
      surname: 'Фамилия',
      get fullname() {
        return {
          name: this.name,
          surname: this.surname
        }
      }
    }

    const newDataSource = [...dataSource, newData]
    const newCount = count + 1

    this.setState({
      dataSource: newDataSource,
      count: newCount,
    })

    localStorage.dataSource = JSON.stringify(dataSource)
    localStorage.count = JSON.stringify(newCount)
  }

  render() {
    const { dataSource } = this.state
    const columns = this.columns

    return (
      <div className='App'>
        <Divider>Редактируемая таблица</Divider>

        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />

        <Button
          type='primary'
          style={{
            float: 'right',
            marginTop: '15px'
          }}
          icon='plus'
          onClick={this.handleAdd}
        >
          Добавить
        </Button>
      </div>
    )
  }
}
