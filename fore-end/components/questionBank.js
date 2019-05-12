import React from 'react'
import { message, Table, Button, Row, Col } from 'antd'
import { SessionStorage } from '../lib/utilService'
class QuestionBank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: this.getSelectedRowKeys() || [],
    }
  }

  saveState = () => {
    const { primaryKey } = this.props
    const { selectedRowKeys } = this.state
    console.log(selectedRowKeys);
    SessionStorage.setObject(primaryKey, selectedRowKeys)
  }

  getSelectedRowKeys = () => {
    const { primaryKey } = this.props
    return SessionStorage.getObject(primaryKey)
  }

  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys]
    const { primaryKey } = this.props
    const index = selectedRowKeys.indexOf(record[primaryKey])
    if(index >= 0){
      selectedRowKeys.splice(index, 1)
    } else {
      selectedRowKeys.push(record[primaryKey])
    }
    this.setState({ selectedRowKeys }, () => this.saveState() )
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    this.setState({ selectedRowKeys }, () => this.saveState() )
  }

  render() {
    const { dataSource, columns, primaryKey, isLoading } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange
    }
    return (
        <Table
          loading={isLoading}
          rowKey={primaryKey}
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
          onRow={ record => ({
            onClick: () => this.selectRow(record)
          })}
        />
    )
  }
}

export default QuestionBank
