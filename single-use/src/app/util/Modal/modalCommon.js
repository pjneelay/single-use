import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import "./modalCommon.css";

const ModalCommon = (props) => {
  const { isModalVisible, handleCancel, modalTitle, classProp, modalWidth,closable } = props;
  return (
    <>
      <Modal title={modalTitle} visible={isModalVisible} footer={null} onCancel={handleCancel} className={classProp} width={modalWidth} closable={closable}>  
        {props.children}
      </Modal>
    </>
  );
};

export default ModalCommon;