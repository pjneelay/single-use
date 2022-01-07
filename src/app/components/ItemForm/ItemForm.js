import React, { useState, useEffect } from "react";
import { Row, Col, Form, Select, Input} from 'antd';
import "./ItemForm.css";
import { CaretDownOutlined } from '@ant-design/icons';
import { UpdateSelections } from "../../redux/userSelections/action";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";


const { Option } = Select;


const ItemForm = (props) => {
  const { data, elemClicked, image } = props;
  const [storageInputData, setStorageInputData] = useState('');
  const [currentMetric, setCurrentMetric] = useState(data.length > 0 ? data[0].metricOne : "");
  const [itemType, setItemType] = useState('');
  const [currentLabelSelected, setCurrentLabelSelected] = useState('');
  const [classToSetActive, setClassToSetActive] = useState();
  const [currentMetricBox, setCurrentMetricBox] = useState(0);
  const userSelections = useSelector(state => state.UserSelections.selectionsFromUser);
  const actions = useActions({
    UpdateSelections
  });
  const onChangeInput = value => {
    let deleteMetricFromStorage
    if(storageInputData.includes("OZ")){; deleteMetricFromStorage = storageInputData.split(" " + "OZ")[0]}
    else if(storageInputData.includes("LITERS")){deleteMetricFromStorage = storageInputData.split(" " + "LITERS")[0]}
    else if(storageInputData.includes("INCH")){deleteMetricFromStorage = storageInputData.split(" " + "INCH")[0]}
    else if(storageInputData.includes("MM")){deleteMetricFromStorage = storageInputData.split(" " + "MM")[0]}
    else{
      deleteMetricFromStorage = storageInputData
    }
    const concatenatedValue = deleteMetricFromStorage + value.nativeEvent.data + " " + currentMetric;
    setStorageInputData(concatenatedValue);
  }

  const onChange = (value) => {
    if(!value.includes("custom") && classToSetActive){
      classToSetActive.style.display = "none";
    }
    setStorageInputData("")
    let attributeLabel = "";
    setItemType(value);
    attributeLabel = data.length !== 0 ? attributeLabel = data.label : '';
  }

  const clicked = (e) =>{
    let parentElement = e.target.parentElement.parentElement.parentElement.parentElement.children[1];
    setCurrentLabelSelected(e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[0].innerText.split('Select ')[1])
    if(e.target.innerText.includes("custom")){
      classToSetActive.style.display = "flex";
    }
    if(parentElement !== undefined && parentElement.className === "su-measurement-box"){
      setClassToSetActive(parentElement)
    }
  }

  const changeMetric = (metric, active) => {
    setCurrentMetric(metric);
    setCurrentMetricBox(active);
  }
  sessionStorage.setItem('currentMetric', currentMetric)
  let metricToAdd
  return (
      <Row>
          <Col span={24}>
            <Form
              name="basic"
              className="preset-modal-form"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
            >

          <div className="preset-modal-image">
              <img src={image}></img>
          </div>
              <div className="preset-modal-scroll single-use-items-modal">
                <div>
                  <h4>Single Use Manifold</h4>

                  {data && data.map((option, i) => {
                    return(
                      <>
                      {option.UIType !== "switch" ?
                        <Form.Item label={`Select ${option.label}`}>
                          <Select
                            suffixIcon={<CaretDownOutlined />}
                            key={i}
                            id={data != undefined?data["category"]: ""}
                            style={{ width: "100%" }}
                            placeholder={`Please input here..`}
                            optionFilterProp="children"
                            onChange={onChange}
                            onClick={clicked}
                          >
                            {option.values.map((elem, a) => {
                              metricToAdd = elem.value.includes(" In") ? elem.value.replace(/ In/g, "") : elem.value.includes(" Mm") ? elem.value.replace(/  Mm/g, "") : elem.value.includes("  Oz") ?  elem.value.replace(/  Oz/g, "") : elem.value.includes("  Lt") ?  elem.value.replace(/  Lt/g, "") : elem.value;
                              
                              return(
                                <Option key={a} value={elem.value}>{`${metricToAdd} ${option.kind === 'custom' && elemClicked !== "bag"? currentMetric : ''}`}</Option>
                            )})}
                        </Select>
                          <div className='su-measurement-box'>
                            <div className='su-measurement-headline'>
                              <div className='su-measurement-titles'>
                                <div className='su-measurement-title'></div>
                                {/* <div className='su-measurement-subtitle'>Capacity</div>*/}
                              </div>
                              <div className='su-metrics-box'>
                                <div onClick={() => changeMetric(option.metricOne, 0)} className={`su-metric-0 su-metrics${currentMetricBox === 0 ? ' active-metric' : ''}`}><div>{option.metricOne}</div></div>
                                <div onClick={() => changeMetric(option.metricTwo, 1)} className={`su-metric-1 su-metrics${currentMetricBox === 1 ? ' active-metric' : ''}`}><div>{option.metricTwo}</div></div>
                              </div>
                            </div>
                            <Input
                              placeholder='Please enter here...'
                              onChange={onChangeInput}
                            />
                          </div>
                        </Form.Item>
                      :
                      <div className='su-metrics-box-alone'>
                        <div>
                          <div className="su-metrics-box-title">Please select the metric scale : </div>
                        </div>
                        <div className="su-swatches">
                          <div onClick={() => changeMetric(option.metricOne, 0)} className={`su-metric-0 su-metrics${currentMetricBox === 0 ? ' active-metric' : ''}`}><div>{option.metricOne}</div></div>
                          <div onClick={() => changeMetric(option.metricTwo, 1)} className={`su-metric-1 su-metrics${currentMetricBox === 1 ? ' active-metric' : ''}`}><div>{option.metricTwo}</div></div>
                        </div>
                      </div>
                    }
                    </>
                    )
                  })} 
                </div>
              </div>
            </Form>
          </Col>
        </Row>
    )
};

export default ItemForm;

