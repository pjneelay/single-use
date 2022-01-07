import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { Row, Col, Form, Select, Input, Radio, Typography } from 'antd';
import presetTwo from "../../../assets/presets/Manifold2.png";
import { useActions } from "../../hooks/useActions";
import presetThree from "../../../assets/presets/Manifold3.png";
import presetFour from "../../../assets/presets/Manifold4.png";
import presetOne from "../../../assets/presets/Manifold1.jpg";
import presetFive from "../../../assets/presets/Manifold5.jpg";
import presetSix from "../../../assets/presets/Manifold6.png";
import { UpdateSelections } from "../../redux/userSelections/action";
import "./PresetForm.css";
import { CaretDownOutlined } from '@ant-design/icons';

const { Option } = Select;


const PresetForm = (props) => {
  const { itemImage } = props;
  const userSelections = useSelector(state => state.UserSelections.selectionsFromUser);
  const modelsData = useSelector(state => state.ModelsHandling.dataFromPlayer);
  const [currentLabelSelected, setCurrentLabelSelected] = useState('');
  const [currentMetricBox, setCurrentMetricBox] = useState(0);
  let dotSelected = sessionStorage.getItem('dot');
  let data = modelsData;
  let modelName = sessionStorage.getItem('modelName')
  dotSelected = dotSelected ==='Preset_Two_Dot_One' ? 
    modelsData.categoryTypes[8].attributes[0] : dotSelected ==='Preset_Two_Dot_Two' ? 
    modelsData.categoryTypes[8].attributes[1] : dotSelected ==='Preset_Two_Dot_Three' ? 
    modelsData.categoryTypes[8].attributes[2] : dotSelected ==='Preset_Two_Dot_Four' ? 
    modelsData.categoryTypes[8].attributes[3] : dotSelected ==='Preset_Three_Dot_One' ? 
    modelsData.categoryTypes[8].attributes[0] : dotSelected ==='Preset_Four_Dot_One' ? 
    modelsData.categoryTypes[8].attributes[0] : dotSelected ==='Preset_One_Dot_One' ? 
    modelsData.categoryTypes[8].attributes[0] : dotSelected ==='accessories' ? 
    modelsData.categoryTypes[6].attributes : dotSelected ==='bag' ? 
    modelsData.categoryTypes[2].attributes : dotSelected ==='bottle' ? 
    modelsData.categoryTypes[5].attributes : dotSelected ==='connector' ? 
    modelsData.categoryTypes[0].attributes : dotSelected ==='fitting' ? 
    modelsData.categoryTypes[4].attributes : dotSelected ==='filter' ? 
    modelsData.categoryTypes[3].attributes : dotSelected ==='specialItem' ? 
    modelsData.categoryTypes[7].attributes : dotSelected ==='tubing' ? 
    modelsData.categoryTypes[1].attributes : "";
  let numberTouched = dotSelected.label ==="presetTwoGroupOne" ? "attr0" : dotSelected.label === "presetTwoGroupTwo" ? "attr1": dotSelected.label ==="presetTwoGroupThree" ? "attr2": dotSelected.label === "presetTwoGroupFour" ? "attr3"  :dotSelected.label === "presetThreeAddFit" ? "attr0":dotSelected.label === "presetFourInsertMiddleGroup" ? "attr0":dotSelected.label === "presetOneAddFit" ? "attr0":"";
  const [dotSelection, setDotSelection] = useState(dotSelected.label);
  const [customCtrl, setCustomCtrl] = useState(false); 
  const [toggleValue, setToggleValue] = useState('');
  const [itemType, setItemType] = useState('');
  const [valueCtrl, setValueCtrl] = useState('');
  const [elementShow, setElementShow] = useState(false);
  const [dotSelectedFilter, setDotSlectedFilter] = useState(dotSelected); 
  const [classToSetActive, setClassToSetActive] = useState();
  const [currentMetric, setCurrentMetric] = useState(typeof dotSelected == "object" ? dotSelected[0] ?  dotSelected[0].metricOne : dotSelected.metricOne : dotSelected.metricOne);
  const [storageInputData, setStorageInputData] = useState('');

  //const []
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
    //actions.UpdateSelections(userSelections, sessionStorage.getItem('dot'), currentLabelSelected, concatenatedValue);
  }
  const onChange = (value) => {
    setStorageInputData("")
    let attributeLabel = "";
    setItemType(value);
    attributeLabel = modelsData.categoryTypes[8].attributes.length !== 0 ? attributeLabel = modelsData.categoryTypes[8].attributes[0].label : '';
    if(!value.includes("custom") && classToSetActive){
      classToSetActive.style.display = "none";
    }
    if(sessionStorage.getItem('dot') === "Preset_One_Dot_One"){
      window.twoDPlayer.configurator.setConfiguration({"presetOneAddFit": value});
      window.threeDPlayer.configurator.setConfiguration({"presetOneAddFit": value});
     // actions.UpdateSelections("2D", userSelections, sessionStorage.getItem('preset'), "presetOneAddFit", value)
    }
    else if(sessionStorage.getItem('dot') === "Preset_Two_Dot_One"){
      window.twoDPlayer.configurator.setConfiguration({"presetTwoGroupOne": value});
      window.threeDPlayer.configurator.setConfiguration({"presetTwoGroupOne": value});
     // actions.UpdateSelections("2D", userSelections, sessionStorage.getItem('preset'),"presetTwoGroupOne", value);
    }
    else if(sessionStorage.getItem('dot') === "Preset_Two_Dot_Two"){
      window.twoDPlayer.configurator.setConfiguration({"presetTwoGroupTwo": value});
      window.threeDPlayer.configurator.setConfiguration({"presetTwoGroupTwo": value});
     // actions.UpdateSelections("2D", userSelections, sessionStorage.getItem('preset'), "presetTwoGroupTwo", value);
    }
    else if(sessionStorage.getItem('dot') === "Preset_Two_Dot_Three"){
      window.twoDPlayer.configurator.setConfiguration({"presetTwoGroupThree": value});
      window.threeDPlayer.configurator.setConfiguration({"presetTwoGroupThree": value});
     // actions.UpdateSelections("2D", userSelections, sessionStorage.getItem('preset'), "presetTwoGroupThree", value);
    }
    else if(sessionStorage.getItem('dot') === "Preset_Two_Dot_Four"){
      window.twoDPlayer.configurator.setConfiguration({"presetTwoGroupFour": value});
      window.threeDPlayer.configurator.setConfiguration({"presetTwoGroupFour": value});
     // actions.UpdateSelections("2D", userSelections, sessionStorage.getItem('preset'), "presetTwoGroupFour", value);
    }
    else if(sessionStorage.getItem('dot') === "Preset_Three_Dot_One"){
      window.twoDPlayer.configurator.setConfiguration({"presetThreeAddFit": value});
      window.threeDPlayer.configurator.setConfiguration({"presetThreeAddFit": value});
     // actions.UpdateSelections("2D", userSelections, sessionStorage.getItem('preset'), "presetThreeAddFit", value);
    }
    else if(sessionStorage.getItem('dot') === "Preset_Four_Dot_One"){
      window.twoDPlayer.configurator.setConfiguration({"presetFourInsertMiddleGroup": value});
      window.threeDPlayer.configurator.setConfiguration({"presetFourInsertMiddleGroup": value});
     // actions.UpdateSelections("2D", userSelections, sessionStorage.getItem('preset'), "presetFourInsertMiddleGroup", value);
    }
    // else {
    //   actions.UpdateSelections("2D", userSelections, sessionStorage.getItem('dot'), currentLabelSelected, (value));
    // }
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
    setCurrentMetric(metric)
    setCurrentMetricBox(active);
  }
  sessionStorage.setItem('currentMetric', currentMetric)
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
            {data.categoryTypes[8].typeName!=undefined && data.categoryTypes[8].typeName=="presetTwo" ? <img src={presetTwo}></img>:''}
            {data.categoryTypes[8].typeName!=undefined && data.categoryTypes[8].typeName=="presetThree" ? <img src={presetThree}></img>:''}
            {data.categoryTypes[8].typeName!=undefined && data.categoryTypes[8].typeName=="presetOne" ? <img src={presetOne}></img>:''}
            {data.categoryTypes[8].typeName!=undefined && data.categoryTypes[8].typeName=="presetFour" ? <img src={presetFour}></img>:''}
            {data.categoryTypes[8].typeName!=undefined && data.categoryTypes[8].typeName=="presetFive" ? <img src={presetFive}></img>:''}
            {data.categoryTypes[8].typeName!=undefined && data.categoryTypes[8].typeName=="presetSix" ? <img src={presetSix}></img>:''}
        </div>
            <div className="preset-modal-scroll single-use-items-modal">
              <div>
                <h4>Single Use Manifold</h4>

                {sessionStorage.getItem('color') === "red"?
                  dotSelectedFilter.map((option, i) => {
                    return(
                      <>
                    <Form.Item label={`Select ${option.label}`} /*onClick={()=>{onSelectedItem(option, i)}}*/>
                      <Select
                        suffixIcon={<CaretDownOutlined />}
                        key={i}
                        id={data != undefined?data["category"]: ""}
                        style={{ width: "100%" }}
                        placeholder={`Please input here...`}
                        optionFilterProp="children"
                        onChange={onChange}
                        onClick={clicked}
                      >
                        {option.values.map((elem, a) => {

                          return(
                            <Option key={a} value={elem.value}>{`${elem.value} ${option.kind === 'custom' ? currentMetric : ''}`}</Option>
                        )})}
                     </Select>
                        <div className='su-measurement-box'>
                          <div className='su-measurement-headline'>
                            <div className='su-measurement-titles'>
                              <div className='su-measurement-title'>Measurement</div>
                             {/* <div className='su-measurement-subtitle'>Capacity</div>*/}
                            </div>
                            <div className='su-metrics-box'>
                              <div onClick={() => changeMetric(option.metricOne, 0)} className={`su-metric-0 su-metrics${currentMetricBox === 0 ? ' active-metric' : ''}`}><div>{option.metricOne}</div></div>
                              <div onClick={() => changeMetric(option.metricTwo, 1)} className={`su-metric-1 su-metrics${currentMetricBox === 1 ? ' active-metric' : ''}`}><div>{option.metricTwo}</div></div>
                            </div>
                          </div>
                          <Input
                            placeholder='Add Custom'
                            onChange={onChangeInput}
                          />
                        </div>
                    </Form.Item>
                      
                    </>
                  )})
                  :
                  <Form.Item
                    name={data?data["category"]: ""}
                    >
                    <Select
                      id={data != undefined?data["category"]: ""}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      optionFilterProp="children"
                      onChange={onChange}

                    >
                      {dotSelected.values.map((option, i) => {

                        return (
                          <Option key={i} value={option.value} >{option.value}</Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                } 
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    )
};

export default PresetForm;