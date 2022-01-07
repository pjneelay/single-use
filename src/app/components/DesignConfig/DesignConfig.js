import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import Button from "../Button/Button";
import { Menu, Dropdown, Input, Row, Col, Form } from 'antd';
import connector from "../../../assets/items/connector.png";
import tubings from "../../../assets/items/tubings.png";
import bags from "../../../assets/items/bag.png";
import filter from "../../../assets/items/filter.png";
import fittings from "../../../assets/items/fittings.png";
import bottles from "../../../assets/items/bottle.png";
import accessories from "../../../assets/items/accessories.png";
import specialItem from "../../../assets/items/special-item.png";
import ModalCommon from "../../util/Modal/modalCommon";
import PresetForm from "../ItemForm/ItemForm";
import {
  SettingOutlined, 
  MoreOutlined, 
  ArrowUpOutlined, 
  ArrowRightOutlined, 
  ArrowDownOutlined, 
  ArrowLeftOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import Threekit_Player from '../Threekit/Player';
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
//import { UpdateModels } from '../../redux/modelsHandling/action';
import dataTubings from "../../data/tubings.json";
import dataSpecialItem from "../../data/specialItems.json";
import dataFittings from "../../data/fittings.json";
import dataFilters from "../../data/filters.json";
import dataConnectors from "../../data/connectors.json";
import dataBottles from "../../data/bottles.json";
import dataBags from "../../data/bags.json";
import dataAccessories from "../../data/accessories.json";
import "../ManifoldConfig/ManifoldConfig.css";

const DesignConfig = (props) => {
  const asset = sessionStorage.getItem("currentIdPresetOnFocusTwoD") ? sessionStorage.getItem("currentIdPresetOnFocusTwoD") : 'b1024215-eb9a-4c47-9b4b-7a50799f7ab9'
  const modelsData = useSelector(state => state.ModelsHandling);
  const [isvisible, setModalIsvisible] = useState(false);
  const [isPDFvisible, setIsPDFvisible] = useState(false);
  const [pdfRowData, setPdfRowData] = useState(null);
  const [modal, setModal] = useState({});
  // const actions = useActions({
  //   UpdateModels
  // });
  const zoom = (xByControllers, yByZoom, zByControllers) => {
    const cameraPositions = window.twoDPlayer.camera.getPosition();
    const { x, y, z } = cameraPositions;
    const currentPositionsToMove = {
      x: x + xByControllers, 
      y: y + yByZoom,
      z: z + zByControllers
    }
    window.twoDPlayer.camera.setPosition(currentPositionsToMove)
  }
  const menu = () => {
    return (
      <Menu>
        <Menu.Item key="0">
          <span>Save</span>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => setIsPDFvisible(true)}>
          <span>Share</span>
        </Menu.Item>
      </Menu>
    )
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    window.open("/pdf-page");
    setModalIsvisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = (data) => {
    setModalIsvisible(true);

    if (data == dataTubings)
      setModal(data);
    else if (data == dataSpecialItem)
      setModal(data);
    else if (data == dataFittings)
      setModal(data);
    else if (data == dataFilters)
      setModal(data);
    else if (data == dataConnectors)
      setModal(data); 
    else if (data == dataBottles)
      setModal(data);
    else if (data == dataBags)
      setModal(dataBags);
    else if (data == dataAccessories)
      setModal(data);
  }

  const handleCancel = () => {
    setModalIsvisible(false);
  }

  const showTubingsModal = () => {
    return (
     <PresetForm data={dataTubings} itemImage={tubings} />
    )
  }

  const showSpecialItem = () => {
    return (
      <PresetForm data={dataSpecialItem} itemImage={specialItem} />
     )
  }

  const showFittings = () => {
    return (
      <PresetForm data={dataFittings} itemImage={fittings} />
    )
  }

  const showFilters = () => {
    return (
      <PresetForm data={dataFilters} itemImage={filter} />
    )
  }

  const showConnectors = () => {
    return (
      <PresetForm data={dataConnectors} itemImage={connector} />
    )
  }

  const showBottles = () => {
    return (
      <PresetForm data={dataBottles} itemImage={bottles} />
    )
  }

  const showBags = () => {
    return (
      <PresetForm data={dataBags} itemImage={bags} />
    )
  }

  const showAccessories = () => {
    return (
      <PresetForm data={dataAccessories} itemImage={accessories} />
    )
  }

  return (
    <div className="manifold">
      {isvisible &&
        (<ModalCommon modalTitle="" isModalVisible={isvisible} handleCancel={handleCancel} classProp="preset-modal">
          { modal == dataTubings ? showTubingsModal() : null }
          { modal == dataSpecialItem ? showSpecialItem() : null }
          { modal == dataFittings ? showFittings() : null }
          { modal == dataFilters ? showFilters() : null}
          { modal == dataConnectors ? showConnectors() : null }
          { modal == dataBottles ? showBottles() : null}
          { modal == dataBags ? showBags() : null}
          { modal == dataAccessories ? showAccessories() : null}
        </ModalCommon>)
      })
      {isPDFvisible && 
        (<ModalCommon modalTitle="Share by email" isModalVisible={isPDFvisible} handleCancel={() => setIsPDFvisible(false)} classProp="modalPopup">
          <h3>Lorem ipsum lorem amet</h3>
          <div className="pdfShareForm">
            {/* <Row>
              <Col span={12}><label>Email</label></Col>
            </Row> */}
            <Row>
              <Col span={24}>
                <Form
                  name="basic"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input email address',
                      },
                      {
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'Please input valid email address',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 12,
                      span: 12,
                      align: 'center'
                    }}
                  >
                    <Button type="primary" htmlType="submit" label="SEND" style={{ verticalAlign: 'middle' }} />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </ModalCommon>)
      }
      <div className="manifold-top-wrapper">
        <div className='manifold-content'>
          <h2 className="manifold-title">Configure your manifold</h2>
          <div className="manifold-image configure-manifold">
            { <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              <a className="ant-dropdown-link manifold-btn-right" onClick={e => e.preventDefault()}>
                <MoreOutlined className="icon-manifold-outline" />
              </a>
            </Dropdown> }
            {/*
            <div id='threekit-embed' style={{height: '100%', width: '100%', position: 'relative', bottom: '33%'}}>
              <Threekit_Player className="threekit-preview" idSelector='player-container' model={asset}/>
            </div> */}
              <Button icon={<MoreOutlined className="icon-manifold" />} label={null} className="manifold-btn-right" />
              <Button label={null} className="config-icon-box" icon={<SettingOutlined className="config-icon" />} onClickHandler={() => {}}/> 
          </div>
          <div className='controllers'>
            <button className='controllers-button up' onClick={() => zoom(0, 0, 5)}><ArrowUpOutlined className="controller-button-icon" /></button>
            <button className='controllers-button right'onClick={() => zoom(-5, 0, 0)}><ArrowRightOutlined className="controller-button-icon" /></button>
            <button className='controllers-button down' onClick={() => zoom(0, 0, -5)}><ArrowDownOutlined className="controller-button-icon" /></button>
            <button className='controllers-button left'onClick={() => zoom(5, 0, 0)}><ArrowLeftOutlined className="controller-button-icon" /></button>
            <button className='controllers-button zoom-in' onClick={() => zoom(0, -10, 0)}><PlusOutlined className="controller-button-icon" /></button>
            <button className='controllers-button zoom-out'onClick={() => zoom(0, 10, 0)}><MinusOutlined className="controller-button-icon" /></button>
          </div>
        </div> 
      </div>
      <div className="manifold-bottom-wrapper">
        <div className="manifold-bottom">
          <div className="item-container" onClick={() => showModal(dataConnectors)}>
            <div className="item-img-box">
              <img className="item item-1" src={connector} alt="item" /*onClick = {(() => actions.UpdateModels('connectors'))}*/ />
            </div>
            <span className="item-title">Connector</span>
          </div>
          <div className="item-container" onClick={() => showModal(dataTubings)}>
            <div className="item-img-box">
              <img className="item item-2" src={tubings} alt="item" /*onClick = {(() => actions.UpdateModels('tubings'))}*//>
            </div>
            <span className="item-title">Tubings</span>
          </div>
          <div className="item-container" onClick={() => showModal(dataBags)}>
            <div className="item-img-box">
              <img className="item item-3" src={bags} alt="item" />
            </div>
            <span className="item-title">Bags</span>
          </div>
          <div className="item-container" onClick={() => showModal(dataFilters)}>
            <div className="item-img-box">
              <img className="item item-4" src={filter} alt="item" /*onClick = {(() => actions.UpdateModels('filters'))}*//>
            </div>
            <span className="item-title">Filter</span>
          </div>
          <div className="item-container" onClick={() => showModal(dataFittings)}>
            <div className="item-img-box">
              <img className="item item-5" src={fittings} alt="item" /*onClick = {(() => actions.UpdateModels('fittings'))}*//>
            </div>
            <span className="item-title">Fittings</span>
          </div>
          <div className="item-container" onClick={() => showModal(dataBottles)}>
            <div className="item-img-box">
              <img className="item item-6" src={bottles} alt="item" /*onClick = {(() => actions.UpdateModels('bottles'))}*//>
            </div>
            <span className="item-title">Bottles</span>
          </div>
          <div className="item-container" onClick={() => showModal(dataAccessories)}>
            <div className="item-img-box">
              <img className="item item-7" src={accessories} alt="item" /*onClick = {(() => actions.UpdateModels('accessories'))}*/ />
            </div>
            <span className="item-title">Accessories</span>
          </div>
          <div className="item-container" onClick={() => showModal(dataSpecialItem)}>
            <div className="item-img-box">
              <img className="item item-8" src={specialItem} alt="item" /*onClick = {(() => actions.UpdateModels('specialItem'))}*/ />
              {/*console.log('modelsData', modelsData)*/}
            </div>
            <span className="item-title">Special Item</span>
          </div>
          {/*
          <div className="item-container">
            <div className="item-img-box">
              <img className="item item-9" src={defaultImage} alt="item" />
            </div>
            <span className="item-title">Extra 1</span>
          </div>
          <div className="item-container">
            <div className="item-img-box">
              <img className="item item-10" src={defaultImage} alt="item" />
            </div>
            <span className="item-title">Extra 2</span>
          </div>
          <div className="item-container">
            <div className="item-img-box">
              <img className="item item-11" src={defaultImage} alt="item" />
            </div>
            <span className="item-title">Extra 3</span>
          </div>
          <div className="item-container">
            <div className="item-img-box">
              <img className="item item-12" src={defaultImage} alt="item" />
            </div>
            <span className="item-title">Extra 4</span>
          </div>
          */}
        </div>
        <div className="manifold-footer">
          <ExclamationCircleOutlined className="icon-manifold-footer" />
          <p>if you don't have the real sizes, you could use aproximate sizes. 
            We stay tunned 
            <Link to="/" className="link">
              back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DesignConfig;