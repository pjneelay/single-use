import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import ModalCommon from '../../util/Modal/modalCommon';
import { Menu, Dropdown, Input, Row, Col, Form, Icon } from 'antd';
//import  {Accordion} from 'react-bootstrap';	
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import singleUseVideo from "../../../assets/3D-konfigurator-sus.mp4";
import { EMAIL_SEND_QUESTIONS,EMAIL_SEND_REPLY } from "../../api/baseUrl";
import { get, post } from "../../api/api";

import {
    QuestionCircleOutlined,
    FundProjectionScreenOutlined,
    MessageOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import "./PlayerPannel.css";

const screenWidth = window.screen.width;
const { TextArea } = Input;

const customStyles = {
    overlay: {
      position: 'fixed',
      zIndex: '1000',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #fff',
      background: '#fff',
      boxShadow: '0 -2rem 6rem rgba(0, 0, 0, 0.3)',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
    }
};

const PlayerPannel = (props) => {
  const { className, iconClassName } = props;
  const [isvisible, setModalIsvisible] = useState(false);	
  const [modal, setModal] = useState('');	
  const [modalName, setModalName] = useState('');	
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [sendMsgInProcess, setMsgStatus] = useState(false);

  const showModal = (modalName, modalTitle) => {
    setModalIsvisible(true);
    setModalName(modalTitle);

    if (modalName == 'video')
      setModal(modalName);
    else if (modalName == 'message')
      setModal(modalName);
    else if (modalName == 'questions')
      setModal(modalName);
    else if (modalName == 'info')
      setModal(modalName);
    else if (modalName == 'success')
      setModal(modalName); 
  }

  const handleCancel = () => {
    setModalIsvisible(false);
  }

  const showVideoModal = () => {

    return (
      <div className="video-player-box">
          <VideoPlayer isPlaying={isvisible} url={singleUseVideo}/>
      </div>
    )
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    const reqObj = {
     name:values.name,
     email:values.email,
     message:values.message
    };

    const emailObj={
      email:values.email
    }
    console.log("reqObj", reqObj);
    //For sending questions and comments over email to mymanifolds@gmail.com
    setMsgStatus(true);
    post(EMAIL_SEND_QUESTIONS, reqObj)
      .then(res => {
        console.log("Mail send response response => ", res);
        setModalIsvisible(false);
        setMsgStatus(false);
      })
      .catch(err => {
        console.log("Error response => ", err);
        setMsgStatus(false);
      });
    //For sending auto reply to user's emailId
    post(EMAIL_SEND_REPLY, emailObj)
      .then(res => {
        console.log("Mail send response response => ", res);
        setModalIsvisible(false);
      })
      .catch(err => {
        console.log("Error response => ", err);
      });
   
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showMessageModal = () => {

    return (
      <div>
        <h3 className="pdf-share-title">We will answer you soon</h3>
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
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'This field is required.',
                    },
                    {
                      pattern: /^[a-zA-Z ]/,
                      message: 'Please enter valid name.',
                    },
                  ]}
                >
                  <Input placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'This field is required.',
                    },
                    {
                      pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'Please enter a valid email address',
                    },
                  ]}
                >

                  <Input placeholder="Enter your email address" onChange={e => setEmail(e.target.value)}/>
                </Form.Item>
                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: 'This field is required.',
                    }
                  ]}
                >
                  <TextArea placeholder="Write a message..." rows={6} onChange={e => setMessage(e.target.value)}/>
                </Form.Item>
                <div className="msgsend-button-box">
                  <Form.Item>
                    <Button type="primary" htmlType="submit" label="SEND" className="send-button" buttonComp="pdfShare"  disabled={sendMsgInProcess}/>
                  </Form.Item>
                </div>
              </Form>
            </Col>
          </Row>
        </div>

      </div>
    )
  };


  const showQuestionsModal = () => {

    return (
      <div style={{fontSize:'15px'}}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header><p className="faq-header">What is a manifold?</p></Accordion.Header>
            <Accordion.Body>
            <p className="faq-body">A manifold is an assembly of single-use components to dispense or aliquote liquids to your desired primary packaging. The mostly very valuable biopharmaceuticals are passed through manifolds on their fluid path.
            </p>
            <p className="faq-body">To protect its sterility during fluid transfer a manifold enables the safe and closed system for dispensing and draining into single-use bags, bottles, vials or any other packaging. It is also possible to filter or add other ingredients to the drug substance thanks to a system for fluid flow.</p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header><p className="faq-header">Why would I need a single-use manifold?</p></Accordion.Header>
            <Accordion.Body>
            <p className="faq-body">To ensure a closed and sterile fluid management of biopharmaceuticals. Any company involved in manufacturing of bulk drug substances, such as biotechs, CMOs, CDMOs, might need a single-use manifold to transfer fluids into different containers. In fact any company with the need to transport highly valuable liquids in cell & gene therapies would need a single-use manifold.
            </p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header><p className="faq-header">Why not purchasing standardized manifolds?</p></Accordion.Header>
            <Accordion.Body>
            <p className="faq-body">Do standardized manifolds fulfil your requirements on-site? If so, you’re among some few lucky and there might not nothing to change in your process. In most cases there is no standardized process for fluid management on-site and there are either small deviations or adaptions desired and needed. With a custom-made manifold you can create fully tailor-made single-use assemblies that fit into your process with ease and improve your production performance.</p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header><p className="faq-header">What are the advantages over molded manifolds?</p></Accordion.Header>
            <Accordion.Body>
            <p className="faq-body">Custom single-use manifolds have the advantages
               <br></br>  -	To place optionally double cable ties to reduce risk of leakages
               <br></br>  -	To withstand higher pressures
            </p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header><p className="faq-header">Can I use silicone tubings for my single-use manifold?</p></Accordion.Header>
            <Accordion.Body>
            <p className="faq-body">You can choose among different single-use components or tubing sets: tubings out of silicone, TPE tubings or other in different length, inner and outer diameter, and different brands.</p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header><p className="faq-header">How will I get my manifold at shortest delivery times?</p></Accordion.Header>
            <Accordion.Body>
            <p className="faq-body">If you are prioritizing lead times - so to get your single-use manifold as soon as possible - then let us know after submitting your configured sketch. MyManifold will then give you information on lead times and how these can possibly be shortened. Just let us know.</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </div>
    )
  };

  const showInfoModal = () => {

    return (
      <div className="info-modal-container">
        <div><InfoCircleOutlined className="centered" /> </div>
        <div>
          <h1>If you don't have the real sizes,</h1>
          <div className="pdf-share-title">you could use approximate sizes. Please stay tuned</div>
        </div>
      </div>
    )
  };

  const showSuccessModal = () => {

    return (
      <div style={{marginLeft:'45%'}}>
        <div><CheckCircleOutlined className="centered" /> </div>
        <div>
          <h1>Successful submission</h1>
          <div>Lorem ipsum dolor sit ame. </div>
        </div>
      </div>
    )
  };

  return (
    <div>
      <div className="buttons-container">
        {/*<PlayerButton icon={<QuestionCircleOutlined className="icon-size" />} onClickHandler={() => {}}/>*/}
       {<Button label={null} className={className} icon={<QuestionCircleOutlined className={iconClassName} />} onClickHandler={() => { showModal('questions', 'Frequently Asked Questions') }} />
       } <Button label={null} className={className} icon={<FundProjectionScreenOutlined className={iconClassName} />} onClickHandler={() => { showModal('video', 'Single Use Support') }} />
        <Button label={null} className={className} icon={<MessageOutlined className={iconClassName} />} onClickHandler={() => { showModal('message', "Share your questions and comments") }} />
        <Button label={null} className={className} icon={<ExclamationCircleOutlined className={iconClassName} />} onClickHandler={() => { showModal('info', '') }} />
      </div>
     {isvisible && 
     (<ModalCommon modalTitle={modalName} isModalVisible={isvisible} handleCancel={handleCancel} modalWidth={screenWidth - 600} classProp="modalPopup">
        {modal === 'video' ? showVideoModal() : null}
        {modal === 'message' ? showMessageModal() : null}
        {modal === 'questions' ? showQuestionsModal() : null}
        {modal === 'info' ? showInfoModal() : null}
        {modal === 'success' ? showSuccessModal() : null}
      </ModalCommon>)}
    </div>
  )
}

export default PlayerPannel;