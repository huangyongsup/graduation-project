import React from 'react'
import { Modal } from "antd";

class TestPaperModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { visible, onCancel } = this.props
    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
      >试卷</Modal>
    )
  }
}

export default TestPaperModal
